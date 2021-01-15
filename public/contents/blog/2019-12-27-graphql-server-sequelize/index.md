---
title: Sequelize+TypeScript による Apollo-Server の実装
date: '2019-12-27T00:02:00'
category: Technology
tags: ['sequelize', 'graphql', 'apollo-server', 'express', 'nodejs', 'typescript']
hero: apollo-graphql.png
status: 'published'
---

Sequelize+TypeScript による Apollo-Server の実装に関するメモです。

今回実装したリポジトリはこちらです；  
https://github.com/suzukalight/study-graphql-apollo-server/tree/master/src/12-ddd

# セットアップ

下記の環境で実践しました；

- Node v10
- Apollo-Server v2.9
- Sequelize v5
- SQLite v3

## パッケージのインストール

```bash
$ yarn add sequelize sqlite3
```

## .sequelizerc: 設定ファイルの所在に関する設定

```javascript
const path = require('path');

module.exports = {
  config: path.resolve('src/infrastructure/sequelize', 'config.json'),
  'models-path': path.resolve('src/infrastructure/sequelize', 'models'),
  'seeders-path': path.resolve('src/infrastructure/sequelize', 'seeders'),
  'migrations-path': path.resolve('src/infrastructure/sequelize', 'migrations'),
};
```

## config.json: DB 接続に関する設定

```json
{
  "development": {
    "dialect": "sqlite",
    "storage": "./database.sqlite",
    "logging": false
  }
}
```

# モデリング

## TypeScript による型定義

```typescript:src/models/user.ts
import { Model, Association, DataTypes, HasManyCreateAssociationMixin } from 'sequelize';

import Message from './message';

export type Role = 'member' | 'admin';

class User extends Model {
  // DBスキーマ
  public id!: number;
  public lastName!: string;
  public firstName!: string;
  public email!: string;
  public password!: string;
  public role?: Role;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // resolverで生成するプロパティ
  public readonly username!: string;

  // カスタム static CRUDメソッド
  public static findByEmail: (email: string) => Promise<User | null>;

  // カスタム instance メソッド
  public validatePassword!: (password: string) => Promise<boolean>;

  // アソシエーション
  public static associations: {
    messages: Association<User, Message>;
  };

  // アソシエーションで得られる子エンティティ
  public readonly messages?: Message[];

  // アソシエーションで得られる子エンティティ
  public createMessage!: HasManyCreateAssociationMixin<Message>;
}

export default User;
```

## sequelize モデル定義

```typescript
import { sequelize } from '../infrastructure/sequelize';

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
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
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    // hooks
  },
);
```

## sequelize hooks: CRUD 操作へのフック

```typescript
import bcrypt from 'bcrypt';

const generatePasswordHash = async (user: User): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(user.password, saltRounds);
};

User.init(
  {
    // models
  },
  {
    tableName: 'users',
    sequelize: sequelize,
    hooks: {
      beforeCreate: async (user) => {
        user.set('password', await generatePasswordHash(user));
      },
    },
  },
);
```

## アソシエーション: 他エンティティとの接続

```typescript
User.hasMany(Message, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'messages',
});
```

## static メソッド: カスタム CRUD の追加

```typescript
User.findByEmail = async (email: string) =>
  User.findOne({
    where: { email },
  });
```

## instance メソッド: インスタンスへの操作

```typescript
User.prototype.validatePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
```

# アプリケーションとの接続

## Sequelize の初期化

実行環境によって設定を切り替えられるように、config.json に複数の設定値を記述しておき、それをもとに初期化させます；

```json:src/infrastructure/sequelize/config.json
{
  "development": {
    "dialect": "sqlite",
    "storage": "./database.sqlite",
    "logging": false
  },
  "test": {
    "dialect": "sqlite",
    "storage": "./testdatabase.sqlite",
    "logging": false
  }
}
```

```typescript:src/infrastructure/sequelize/index.ts
import path from 'path';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, './config.json'))[env];

export const sequelize = new Sequelize(config);
```

## サーバとの連携

```typescript:src/domain/models/index.ts
import { sequelize } from '../../infrastructure/sequelize';
import User from './user';
import Message from './message';

export { sequelize };

const models = {
  User,
  Message,
};

export type Models = typeof models;

export default models;
```

```typescript:src/index.ts
import models, { sequelize } from './domain/models';

const server = new ApolloServer({
  // ...
  context: async ({ req, connection }) => {
    if (connection) return { models };

    if (req) {
      const me = await getMe(req);
      return {
        models,
        me,
        jwt: { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN },
      };
    }
  },
});

sequelize.sync().then(async () => {
  httpServer.listen({ port: process.env.DB_PORT }, () => {
    console.log(`Apollo Server on http://localhost:${process.env.DB_PORT}/graphql`);
  });
});
```

## リゾルバでの CRUD 操作実行

```typescript:src/application/resolvers/user.ts
import User from '../models/user';

const resolvers: IResolvers<User, ResolverContext> = {
  Query: {
    me: async (parent, args, { models, me }) => models.User.findByPk(me?.id),
    users: async (parent, args, { models }) => models.User.findAll(),
    user: async (parent, { id }, { models }) => models.User.findByPk(id),
  },

  Mutation: {
    deleteUser: combineResolvers(isAdmin, async (parent, { id }, { models }) =>
      models.User.destroy({ where: { id } }),
    ),
  },

  User: {
    messages: async (user, args, { models }) =>
      models.Message.findAll({
        where: { userId: user.id },
      }),
  },
};
```

# マイグレーション: データを保持しながらスキーマを変更

運用中の DB を維持したまま、新しいデータスキーマ変更を適用したい場合に行う手順をマイグレーション(migration)と呼びます。sequelize ではこのマイグレーションを、sequelize-cli パッケージで提供しています。

## 雛形の生成

migration ファイルの雛形を生成できます。config で指定したディレクトリに出力されます；

```bash
$ npx sequelize-cli migration:generate --name user
```

## up と down

- up: 適用したい変更を記述します
- down: 適用した変更を元に戻す方法を記述します

```javascript:src/infrastructure/sequelize/migrations/20191222094216-user.js
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        lastName: {
          type: Sequelize.STRING(250),
          allowNull: true,
        },
        firstName: {
          type: Sequelize.STRING(250),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            isEmail: true,
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [7, 42],
          },
        },
        role: {
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        charset: 'utf8mb4',
      },
    ),

  down: queryInterface => queryInterface.dropTable('users'),
};
```

## コマンド実行

```bash
$ npx sequelize-cli db:migrate
```

# シーダー（Seeder）

DB の初期データを設定するファイルです。

## 雛形の生成

seed ファイルの雛形を生成できます。config で指定したディレクトリに出力されます；

```bash
$ yarn sequelize-cli seed:generate --name user
```

## seeding

```javascript:src/infrastructure/sequelize/seeders/20191227020432-user.js
'use strict';

const bcrypt = require('bcrypt');

const saltRounds = 10;
const generatePasswordHash = async password => bcrypt.hash(password, saltRounds);

module.exports = {
  up: async queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'masahiko',
          lastName: 'kubara',
          email: 'masahiko_kubara@email.com',
          password: await generatePasswordHash('masahikokubara'),
          role: 'member',
        },
        {
          firstName: 'suzuka',
          lastName: 'light',
          email: 'suzukalight@email.com',
          password: await generatePasswordHash('suzukalight'),
          role: 'admin',
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
```

## コマンド実行

```bash
$ npx sequelize-cli db:seed:all
```

# 完成品

実装したリポジトリはこちらです；  
https://github.com/suzukalight/study-graphql-apollo-server/tree/master/src/12-ddd
