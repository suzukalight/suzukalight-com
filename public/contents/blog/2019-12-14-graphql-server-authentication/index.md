---
title: Apollo-Serverにおける認証と認可 (Authentication/Authorization)
date: '2019-12-14T00:02:00'
category: Technology
tags: ['graphql', 'apollo-server', 'express', 'nodejs', 'typescript', 'jwt', 'bcrypt']
hero: ./apollo-graphql.png
status: 'published'
---

# 目次

Apollo-Server を使った GraphQL サーバのハンズオン実装シリーズ。今回は**認証と認可（Authentication/Authorization）**を扱います。

前半は、メールアドレス・パスワードによる認証と、サインアップ処理を追加する手順です。**JWT(jsonwebtoken)**、**bcrypt** による暗号化、**beforeCreate などの Sequelize Hooks** などを使用しています。

後半は、**JWT + x-token ヘッダ** によるユーザ認証と、**Permission-based, Role-based** の認可処理を追加する手順です。ほかにリゾルバの連結を行う **graphql-resolvers** を紹介しています。

今回も、こちらのチュートリアルをなぞって進めています；
https://www.robinwieruch.de/graphql-apollo-server-tutorial

今回実装したリポジトリはこちらです；  
https://github.com/suzukalight/study-graphql-apollo-server/tree/master/src/06-authorization

# メールアドレスとパスワードによるユーザ認証

## メールアドレスとパスワードをユーザモデルに追加

User のモデルとスキーマに、email, password を追加します；

```typescript{5-6,12-28}:src/05-authentication/src/models/user.ts
class User extends Model {
  public id!: number;
  public lastName!: string;
  public firstName!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    // ...

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42],
      },
    },
  },
  {
    // ...
  },
);
```

```typescript{9}:src/05-authentication/src/schema/user.ts
const schema = gql`
  # ...

  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    messages: [Message!]
  }
`;
```

seeder にもメルパスを追加します；

```typescript{5-6,12-13}:src/05-authentication/src/seed.ts
export const createUsersWithMessages = async (models: Models) => {
  await models.User.create({
    firstName: 'masahiko',
    lastName: 'kubara',
    email: 'masahiko_kubara@email.com',
    password: 'masahikokubara',
  });

  const user2 = await models.User.create({
    firstName: 'suzuka',
    lastName: 'light',
    email: 'suzukalight@email.com',
    password: 'suzukalight',
  });
};
```

データが登録できたか、クエリを発行して確認してみます；

```graphql:query
{
  users {
    id
    username
    email
  }
}
```

```json:response
{
  "data": {
    "users": [
      {
        "id": "1",
        "username": "masahiko kubara",
        "email": "masahiko_kubara@email.com"
      },
      {
        "id": "2",
        "username": "suzuka light",
        "email": "suzukalight@email.com"
      }
    ]
  }
}
```

email が返ってきました。成功です。

## サインアップ処理の追加

実際にサインアップを行うために、`signUp` のスキーマとリゾルバを追加しましょう；

```typescript{4-10}:src/05-authentication/src/schema/user.ts
const schema = gql`
  # ...

  extend type Mutation {
    signUp(lastName: String!, firstName: String!, email: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }
`;
```

```typescript{1,6-11}:src/05-authentication/src/resolvers/user.ts
const createToken = async (user: User) => 'dummy';

const resolvers: IResolvers<User, ResolverContext> = {
  // ...

  Mutation: {
    signUp: async (parent, { lastName, firstName, email, password }, { models }) => {
      const user = await models.User.create({ lastName, firstName, email, password });
      return { token: createToken(user) };
    },
  },
};
```

`User.create` でエンティティを生成し、サインアップ処理としています。成功したら、戻り値として認証トークンを返すようにしており、以降このトークンベースでユーザ認証を行う予定です。（トークンの実装は次節にて）

実装した Mutation を実行してみます；

```graphql:mutation
mutation {
  signUp(lastName: "new", firstName: "user", email: "newuser@email.com", password: "newuser") {
    token
  }
}
```

```json:response
{
  "data": {
    "signUp": {
      "token": "dummy"
    }
  }
}
```

ユーザが追加され、トークンが返ってきました。ちなみに 4 つの引数はいずれも必須パラメータなので、いずれかが未指定の場合はエラーが帰ってきます。引数を変えてお試しいただければと思います。

現時点でこのサインアップ処理には、「パスワードが暗号化されていない」という問題と、「ユーザ認証トークンの発行処理がダミーのまま」という課題があります。それぞれ実装していきましょう。

## パスワードの暗号化と Sequelize Hooks

パスワードの暗号化には **bcrypt** パッケージを利用します；

```bash
$ yarn workspace 05-authentication add bcrypt
$ yarn workspace 05-authentication add -D @types/bcrypt
```

入力されたパスワードを自動的に暗号化するために、**Sequelize の Hooks 関数**を利用します。Hooks はエンティティに対するイベントが発生した際に自動的に実行される関数のことで、今回はユーザエンティティの生成時にフックして呼び出される関数 **beforeCreate** を使用しました；

```typescript{1,3-6,15-19}:src/05-authentication/src/resolvers/user.ts
import bcrypt from 'bcrypt';

const generatePasswordHash = async (user: User) => {
  const saltRounds = 10;
  return await bcrypt.hash(user.password, saltRounds);
};

User.init(
  {
    // ...
  },
  {
    tableName: 'users',
    sequelize: sequelize,
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = await generatePasswordHash(user);
      },
    },
  },
);
```

init の第 2 引数で、hooks に関する定義ができます。ここで bcrypt を利用してパスワードを暗号化します。成功すると、DB に保存されるパスワードが自動的に暗号化されます；

![](bcrypt.png)

## ユーザ認証トークンの発行

ユーザのログイン状態を確認するために、トークンベースの認証を実装していきましょう。トークンには **JWT** を使用し、**jsonwebtoken** パッケージで実装します；

```bash
$ yarn workspace 05-authentication add jsonwebtoken
$ yarn workspace 05-authentication add -D @types/jsonwebtoken
```

JWT の発行には、**シークレットキーと有効期限が必要です。**特にシークレットキーはコード管理できない（漏洩リスク）のため、**環境変数で取り扱います。**その環境変数を Node 上で扱うために、**dotenv** パッケージを使用します；

```bash
$ yarn workspace 05-authentication add dotenv
```

.env ファイルに、シークレットキーと有効期限を記述します。このファイルは gitignore して、リポジトリやコードには公開されないようにしておきましょう；

```env:src/05-authentication/.env
JWT_SECRET="your_jwt_secret_phrase"
JWT_EXPIRES_IN="30m"
```

index.ts で、環境変数として取り込み、context に流し込みます；

```typescript{4-7}:src/05-authentication/src/resolvers/typings.ts
export interface ResolverContext {
  me: User;
  models: Models;
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
```

dotenv パッケージの `config` 関数を利用すると、`process.env` に .env の内容が展開されて利用できるようになります；

```typescript{1,3,9}:src/05-authentication/src/index.ts
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  context: async () => ({
    models,
    me: await models.User.findByPk(2),
    jwt: { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN },
  }),
});
```

シークレットキーと有効期限の情報をもとに、JWT トークンを発行します；

```typescript{1,3-6,10-13}:src/05-authentication/src/resolvers/user.ts
import jwt from 'jsonwebtoken';

const createToken = async (user: User, secret: string, expiresIn: string) => {
  const { id, email } = user;
  return await jwt.sign({ id, email }, secret, { expiresIn });
};

const resolvers: IResolvers<User, ResolverContext> = {
  Mutation: {
    signUp: async (parent, { lastName, firstName, email, password }, { models, jwt }) => {
      const user = await models.User.create({ lastName, firstName, email, password });
      return { token: createToken(user, jwt.secret, jwt.expiresIn) };
    },
  },
};
```

`jwt.sign` を使用して、id と email の情報を含んだ JWT トークンを生成しています。この情報を signUp リゾルバの戻り値とし、認証情報としてクライアント側の localstorage などで管理してもらうこととします。

## サインイン処理

サインアップ処理でユーザ認証トークンの発行ができるようになりましたので、これを用いてサインイン処理でのトークン発行も実装します。

**User スキーマ**  
mutation として signIn 関数を追加します；

```typescript{6}:src/05-authentication/src/schema/user.ts
const schema = gql`
  # ...

  extend type Mutation {
    signUp(lastName: String!, firstName: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!
  }
`;
```

**User モデル**  
サインインするユーザを検索するためのクエリ関数（findByEmail）と、入力したパスワードの有効性を確認する関数（validatePassword）を追加していきます；

```typescript{4-5,8-12}:src/05-authentication/src/models/user.ts
class User extends Model {
  // ...

  public static findByEmail: (email: string) => Promise<User | null>;
  public validatePassword!: (password: string) => Promise<boolean>;
}

User.findByEmail = async (email: string) => User.findOne({ where: { email } });

User.prototype.validatePassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};
```

`findByEmail` は `models.User` 経由で実行される関数のため、static 関数で定義します。実装としては findOne で email を検索するシンプルなものです。

`validatePassword` は、取得した user エンティティのパスワードと、ユーザが入力したパスワードとを比較する関数のため、インスタンス関数として定義しています。実装としては **bcrypt.compare** を使って、暗号化された DB データと、それと同じロジックで暗号化した入力データとが一致するかを比較しています。

**User リゾルバ**  
User モデルの関数と、JWT 発行関数とを利用して、サインイン処理を完成させます；

```typescript{1,7-15}:src/05-authentication/src/resolvers/user.ts
import { IResolvers, UserInputError, AuthenticationError } from 'apollo-server-express';

const resolvers: IResolvers<User, ResolverContext> = {
  // ...

  Mutation: {
    signIn: async (parent, { email, password }, { models, jwt }) => {
      const user = await models.User.findByEmail(email);
      if (!user) throw new UserInputError('No user found with this login credentials.');

      const isValid = await user.validatePassword(password);
      if (!isValid) throw new AuthenticationError('Invalid password.');

      return { token: createToken(user, jwt.secret, jwt.expiresIn) };
    },
  },
};
```

1. 入力された email, password をもとに、**findByEmail** でユーザを検索
2. そのユーザのパスワードを **validatePassword** で検証
3. 新しいユーザ認証トークンを **createToken** で発行して、戻り値とする

では signIn Mutation を実行してみます；

```graphql:mutation
mutation {
  signIn(email: "suzukalight@email.com", password: "suzukalight") {
    token
  }
}
```

```json:response
{
  "data": {
    "signIn": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXp1a2FsaWdodEBlbWFpbC5jb20iLCJpYXQiOjE1NzYzMDc1MTUsImV4cCI6MTU3NjMwOTMxNX0.F_a_w7kPXZBpho4r8EFbuU1CvmJU-qYA2ISQ92cRMQw"
    }
  }
}
```

成功です！

ここで email, password をそれぞれ変えてみると、サーバからそれぞれ適切なエラーメッセージが返ってくると思いますので、お試しください。

# ユーザごとの認可と、ロール単位での認可

## ユーザ認証トークンから me 情報を取得

サインイン処理によって発行された JWT トークンには、id と email が載っています。**この情報をクライアントで保管し、サーバアクセス時に送信してもらう**ことで、クライアントがどのユーザでサインインしているかを判定します。

```typescript{1,3-12,14-23}:src/06-authorization/src/index.ts
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

const getMe = async (req: Request) => {
  const token = <string>req.headers['x-token'];
  if (token) {
    try {
      return jwt.verify(token, <string>process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      jwt: { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN },
    };
  },
});
```

- クライアントは、リクエストヘッダの `x-token` フィールドに、JWT を詰めてリクエストを行う仕様とします
- サーバ側では、この x-token フィールドを、context の `req.headers` 引数経由で取得します
- 取り出した  `jwt.verify` でトークンを検証します。成功すれば、JWT に詰めていた id, email の情報を取り出すことができ、これを me の情報として今後扱っていきます

## Message リゾルバに認可処理を追加 (graphql-resolvers)

リゾルバに認可処理を追加していきますが、基本的に**「ログインユーザに対する認証認可」は非常に多くのシチュエーションで登場するため、その処理を切り出しておきたくなると思います。**

たとえば createMessage では、まず「ログインユーザ認可」→「メッセージ生成処理」という解決をしたいですし、deleteMessage ではさらに「メッセージのオーナー、あるいは管理者であるかの認可」も付け加えたいと感じるのではないでしょうか？

そうやって**切り出した処理をつなぎ合わせて、新しいリゾルバにできる仕組み**があれば便利なのですが、それを行ってくれるコンパニオンツールとして、**[graphql-resolvers](https://github.com/lucasconstantino/graphql-resolvers)** があります。

```bash
$ yarn workspace 06-authorization add graphql-resolvers
$ yarn workspace 06-authorization add -D @types/graphql-resolvers
```

ログインユーザ情報が存在するかを確認する、`isAuthenticated`関数を切り出してみましょう；

```typescript:src/06-authorization/src/resolvers/authorization.ts
import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server-express';
import { ResolverContext } from './typings';

export const isAuthenticated = (parent: any, args: any, { me }: ResolverContext) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');
```

me 情報の有無で、ログインしているかどうかを確認しています。このリゾルバは skip が評価されると成功したことになり、次のリゾルバに処理が移ります。

これを既存の createMessage リゾルバに連結してみます；

```typescript{1,3,7-12}:src/06-authorization/src/resolvers/message.ts
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

const resolvers: IResolvers<User, ResolverContext> = {
  Mutation: {
    createMessage: combineResolvers(isAuthenticated, async (parent, { text }, { me, models }) =>
      models.Message.create({
        text,
        userId: me.id,
      }),
    ),
  },
};
```

`combineResolvers` 関数に、任意の個数のリゾルバ関数を引き渡すと、それらを順次実行してくれます。

認可処理を動作確認してみましょう。まずは有効期限切れになったトークンを x-token に指定して実行してみます；

![](token-expired.png)

`Your session expired.` となって、正常に失敗しました。つづけて signIn を実行して新しいトークンを取得し、その結果を x-token に指定しなおしてみます；

![](create-message-succeeded.png)

今度は成功しました！

## Permission-based Authorization

この仕組みを使って deleteMessage も作成していきます。メッセージの削除に対する認可として「そのメッセージのオーナーかどうか」を条件としてみます。こういった**「誰に対して何を認可する」という認可手法を、Permission-based な認可**と呼んだりします。

authorization リゾルバ集に、メッセージのオーナーであるかどうかで認可を行う、`isMessageOwner` を追加します；

```typescript{2,6-16}:src/06-authorization/src/resolvers/authorization.ts
// ...
import Message from '../models/message';

// ...

export const isMessageOwner = async (
  parent: any,
  { id }: Message,
  { models, me }: ResolverContext,
) => {
  const message = await models.Message.findByPk(id, { raw: true });
  if (!message || message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  return skip;
};
```

これを deleteMessage リゾルバで使用してみましょう；

```typescript{1,7-14}:src/06-authorization/src/resolvers/message.ts
import { isAuthenticated, isMessageOwner } from './authorization';

const resolvers: IResolvers<User, ResolverContext> = {
  Mutation: {
    // ...

    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) =>
        models.Message.destroy({
          where: { id },
        }),
    ),
  },
};
```

まず `isAuthenticated` でログインしているかどうかを判定し、次に `isMessageOwner` でそのユーザが当該メッセージのオーナーであるかを判定しています。いずれも満たす場合にだけ、はじめて `Message.destroy` が行われる処理へ到達する、というリゾルバにすることができました。

このように、**combineResolvers を使うことで、シンプルかつ解りやすい認可実装が実現できています。**

## Role-based Authorization (RBAC)

これまで Permission-based な認可についてご紹介しました。このようなユーザごとに認可を割り付ける手法はシンプルですが、**ユーザと認可が増えると爆発的に設定個数が増え、管理が難しくなる側面もあります。**

こうした問題を解決する方法として、ユーザに認可をつけるのではなく、**ユーザが持つ役割に対して認可を付ける方法があります。**具体的には「Admin 権限の人はユーザの削除ができる」や「Editor 権限の人は記事の編集だけはできる」などの表現になります。

管理者は役割に対して認可を与え、その役割をユーザに割り付けることで、管理すべき認可を大きくグルーピングできることができるようになります。**実質的な管理工数はユーザ数にのみ依存**することになり、現実的な工数感に収めることができるようになります。

前置きはここまでで、実装に移ってまいりましょう。まずは User エンティティに Role を追加します；

```typescript{1,5,10-12}:src/06-authorization/src/models/user.ts
export type Role = 'member' | 'admin';

class User extends Model {
  // ...
  public role?: Role;
}
User.init({
  // ...
  role: {
    type: DataTypes.STRING,
  },
});
```

seeder にはユーザごとに権限を分けて設定してみます；

```typescript{4,9}:src/06-authorization/src/seed.ts
export const createUsersWithMessages = async (models: Models) => {
  await models.User.create({
    // ...
    role: 'member',
  });

  const user2 = await models.User.create({
    // ...
    role: 'admin',
  });
};
```

スキーマにも role を追加するとともに、ユーザを削除できる mutation である deleteUser を追加します；

```typescript{4,9}:src/06-authorization/src/schema/user.ts
const schema = gql`
  extend type Mutation {
    # ...
    deleteUser(id: ID!): Boolean
  }

  type User {
    # ...
    role: String
  }
`;
```

Role-based な認可のリゾルバとして、ログインユーザが管理者権限かを調べる isAdmin を追加します。me はログインしていない場合には null になりますので、**Optional Chaining `me?.role` で null チェックします**；

```typescript{4,9}:src/06-authorization/src/resolvers/authorization.ts
export const isAdmin = (parent: any, args: any, { me }: ResolverContext) =>
  me?.role === 'admin' ? skip : new ForbiddenError('Not authorized as admin');
```

各素材を使って deleteUser リゾルバを記述しましょう；

```typescript{1,3,6-7,13-15}:src/06-authorization/src/resolvers/user.ts
import { combineResolvers } from 'graphql-resolvers';

import { isAdmin } from './authorization';

const createToken = async (user: User, secret: string, expiresIn: string) => {
  const { id, email, role } = user;
  return await jwt.sign({ id, email, role }, secret, { expiresIn });
};

const resolvers: IResolvers<User, ResolverContext> = {
  Mutation: {
    // ...
    deleteUser: combineResolvers(isAdmin, async (parent, { id }, { models }) =>
      models.User.destroy({ where: { id } }),
    ),
  },
};
```

**`createToken` で JWT へ role を追加しています。**context.me は getMe の情報を参照し、getMe は JWT を参照しますので、この role が JWT に設定されていないと、各種の role-based な処理はすべて失敗してしまいます。忘れずに追加しておきましょう。

## RBAC の mutation を実行

では実際に deleteUser を実行してみます。先に signUp でメンバーを 1 人追加しておき、role=admin のメンバーでサインインして、そのメンバー（id:3）を削除してみましょう；

```graphql:mutation
mutation {
  signUp(lastName: "new", firstName: "user", email: "newuser@email.com", password: "newuser") {
    token
  }
}

mutation {
  signIn(email: "suzukalight@email.com", password: "suzukalight") {
    token
  }
}

mutation {
  deleteUser(id: "3")
}
```

```json:response
{
  "data": {
    "deleteUser": true
  }
}
```

成功しました。role=admin の場合は、deleteUser ができています。

次に、role=member のメンバーでサインインした場合はどうでしょうか？

```graphql:mutation
mutation {
  signUp(lastName: "new", firstName: "user", email: "newuser@email.com", password: "newuser") {
    token
  }
}

mutation {
  signIn(email: "masahiko_kubara@email.com", password: "masahikokubara") {
    token
  }
}

mutation {
  deleteUser(id: "4")
}
```

```json:response
{
  "errors": [
    {
      "message": "Not authorized as admin"
    }
  ]
}
```

正常に失敗しました。同じ mutation でも、role によって実行の可否が振り分けできるようになり、グッと本格的なサービスっぽくなってきましたね！

# 完成品

実装したリポジトリはこちらです；  
https://github.com/suzukalight/study-graphql-apollo-server/tree/master/src/06-authorization
