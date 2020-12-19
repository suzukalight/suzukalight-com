---
title: 'apollo-server-testing と SQLite で統合テストを実装してみよう'
date: '2020-10-21T00:02:00'
category: Technology
tags: ['typescript', 'graphql', 'jest', 'sqlite', 'test']
emoji: '🧪'
status: 'published'
---

apollo-server で GraphQL バックエンド開発をしている際の、統合テスト（Integration Testing）を行うための手法として、apollo-server-testing と sqlite を選択しました。**その結果、高速に実行でき、かつ既存 DB にも影響を及ぼさない方法を実践できました**のでご紹介します。

# apollo-server-testing とは

https://www.apollographql.com/docs/apollo-server/testing/testing/  
Apollo が提供しているテスト用のユーティリティで、**サーバ実装全体の統合テストを簡単に実行できるようにするツール**を提供しています。

```ts
const { query, mutate } = createTestClient(server);

mutate({
  mutation: UPDATE_USER,
  variables: { id: 1, email: 'nancy@foo.co' },
});
```

`createTestClient` は **HTTP サーバを立てることなく、内部の resolver を実行することができるようしてくれるメソッドです**。ここを起点に resolver から見た統合テストを行うことができます。

# サンプルプロジェクト

[こちらのリポジトリ](https://github.com/suzukalight/sample-apollo-server-testing-integration-test) にサンプルを Push していますので、clone してお試しください。

```bash
git clone https://github.com/suzukalight/sample-apollo-server-testing-integration-test
cd sample-apollo-server-testing-integration-test
yarn
```

以下の技術を使用しています；

- Clean Architecture
- Node.js + TypeScript
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) w/Express + [apollo-server-testing](https://www.apollographql.com/docs/apollo-server/testing/testing/)
- [TypeORM](https://typeorm.io/) w/SQLite
- [GraphQL Code Generator](https://graphql-code-generator.com/)
- [Jest w/ts-jest](https://github.com/kulshekhar/ts-jest)

# テストの要件と対象

## deleteUser mutation を考えます

```graphql
mutation DeleteUser($input: DeleteUserRequest) {
  deleteUser(input: $input) {
    user {
      id
      email
    }
  }
}
```

ユーザを削除する mutation である deleteUser を作成し、その統合テストを考えます。

## テスト要件

- Admin ユーザでログインしているときは、すべてのユーザに対して、削除が成功する
- Member ユーザでログインしているときは、自身に対してのみ、削除が成功する
- 非ログイン時は、エラーを返す
- 存在しない ID に対する削除操作は、エラーを返す
- 無効なパラメータを指定した場合は、エラーを返す

などを今回、統合テストで確認していきます。

> 実際のところ、これらの要件チェックのほとんどは usecase のユニットテストで実現できます。統合テストで確認すべきなのは「コンポーネントの結合が正しく行えているか」なので、統合テストではデグレの確認やインタフェースミスマッチの確認などにとどめて、ユニットテストをより厚くするほうが、テストピラミッド的にもベターだと思います

# 統合テストの実装

具体的な実装に入ります。実装の大きな流れとしては；

1. sqlite でテスト用の DB を自動生成する
1. apollo-server-testing で統合テスト用の GraphQL クライアントを生成する
1. GraphQL クライアントを通して、jest でテストを並列実行する

特に気にかけた点としては、**1 つのテストごとに、1 つのテスト DB を自動的に生成するようにした**という点です。これによってテストが互いに疎となり、副作用を起こすことなく並列実行できるようになっています。

## パッケージのインストール

```bash
yarn add -D apollo-server-testing
```

## 各テストごとに個別の DB を作成する

```ts:test/integration/setup/database.ts
import { Connection, createConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// ランダムなDB名を生成
export const getRandomDbPath = () => `./test_db/${uuidv4()}.sqlite`;

// 各テストごとに独立したDBを作成し、テストの独立性を担保する
export const createDbConnection = async (randomDbPath: string) =>
  createConnection({
    type: "sqlite",
    name: randomDbPath,
    database: randomDbPath,
    entities: [User],
    synchronize: true,
  });

// DBファイルを削除
export const deleteDbFile = (dbPath: string) => {
  fs.unlinkSync(dbPath);
};
```

実環境の DB をテストに使うことはできないので、SQLite で DB をモックすることにしました。TypeORM では、`type: 'sqlite', database: filepath, synchronize: true` と設定することで、**DB 接続時に自動的に DB ファイルを作成し、同時にスキーマ同期をかけてくれます**。

このとき、各テストは describe 単位で並列に実行されるため、共用 DB ではほかのテスト結果を汚染してしまう可能性があります。このため、**1 つのテストごとに 1 つのデータベースを作成するような仕組みにしました**。

SQLite であれば、ファイルベースまたはメモリベースで DB を素早く作成できるため、**統合テストのような繰り返し実行する要件に対して有利です**。メモリベースにしなかったのは、CI 上で実行する際にコンテナのメモリを食いつぶして予期せぬ失敗とならないようにするためです。

## apollo-server-testing でテストサーバを起動

```ts:test/integration/setup/apollo-server.ts
import {
  createTestClient,
  ApolloServerTestClient,
} from "apollo-server-testing";
// ...

export const createApolloServerForTesting = (
  dbConnection: Connection,
  actor?: UserDto
): ApolloServerTestClient => {
  // graphql-codegen でバンドルしたスキーマファイルを使用
  const schema = loadSchemaSync(
    path.join(__dirname, "../../../src/schema/schema.graphql"),
    {
      loaders: [new GraphQLFileLoader()],
    }
  );

  // resolverをスキーマと連結
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
  });

  // ApolloServerでGraphQLサーバを起動
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context: () => getContext(dbConnection, actor),
  });

  // テスト用のGraphQLクライアントを生成
  const testClient = createTestClient(server);
  return testClient;
};
```

ApolloServer のインスタンスを作成して、apollo-server-testing の `createTestClient` に渡すことで、テスト用のクライアントを取得することができます。このクライアントから query や mutate を呼び出すことで、統合テストを実行していきます。

なお、ApolloServer のインスタンスに、Express の設定を施す必要はありません。この統合テストでは HTTP クライアントは使用せず、テストクライアントから resolver を直接呼び出すことができるためです。

## テストごとにサーバと DB を生成

```ts
describe('deleteUser', () => {
  describe('Admin', () => {
    const actor = {
      id: '1',
      email: 'admin@email.com',
      roles: [RoleTypes.Admin],
    }; // Adminロールのactor
    const randomDbPath = getRandomDbPath(); // テストごとに固有のファイルを作成
    let dbConnection: Connection;
    let testClient: ApolloServerTestClient | undefined;

    beforeAll(async () => {
      dbConnection = await createDbConnection(randomDbPath); // DBの作成とマイグレーション
      await seedAll(dbConnection); // UserをDBに流し込む
      testClient = createApolloServerForTesting(dbConnection, actor); // Adminをactorとしてサーバを起動
    });

    afterAll(async () => {
      await dbConnection.close();
      deleteDbFile(randomDbPath); // DBファイルを削除し、テストごとにDBを破棄
    });

    // ...
  });
});
```

deleteUser のテストには、actor を切り替えて実行する 2 種類のテストを用意しています。actor が Admin ロールの場合はすべてのユーザを削除することができ、Member ロールの場合は自身の削除のみが可能としています。

**各テストグループの初期化時に、テストクライアントと DB を生成し、終了時にそれらを破棄しています**。actor ごとに DB を作成することで、テストシナリオの影響範囲を局所化でき、並列実行がしやすくなっています。

## `{query, mutate}` を使って統合テストを記述

```ts
test('OK: Adminロールで、エンティティの削除ができた', async () => {
  const result = await testClient?.mutate({
    mutation: DELETE_USER,
    variables: {
      input: {
        id: '3',
      },
    },
  });

  const { user } = result?.data?.deleteUser ?? {};
  expect(user?.email).toBe('anonymous@email.com'); // 削除したユーザの情報が返ってくる
});

test('NG: 存在しないIDを指定した', async () => {
  const result = await testClient?.mutate({
    mutation: DELETE_USER,
    variables: {
      input: {
        id: '99999',
      },
    },
  });

  const { data, errors } = result ?? {};
  expect(data?.deleteUser).toBeNull(); // dataはnullが返ってくる
  expect(errors?.length).toBeGreaterThan(0); // errorsにエラー内容が含まれている
});
```

各テストでは、`mutate` メソッドを用いて deleteUser の resolver を実行し、期待通りのレスポンスを返してくれるかを assert しています。

# 実行

```bash
$ yarn test
yarn run v1.22.4
$ env-cmd -f .env.default jest
 PASS  src/entity/user/__tests__/index.ts
 PASS  src/policy/decision/__tests__/common.ts
 PASS  src/entity/common/Password/__tests__/encrypt.ts
 PASS  src/entity/common/Email/__tests__/index.ts
 PASS  src/entity/common/Password/__tests__/entity.ts
 PASS  test/integration/User/__tests__/deleteUser.ts

Test Suites: 6 passed, 6 total
Tests:       59 passed, 59 total
Snapshots:   0 total
Time:        4.087 s
Ran all test suites.
✨  Done in 4.85s.
```

正常に PASS しました。

手元環境では、**2 種類 5 項目の統合テストを実行するのに必要だった時間は 4〜7 秒でした**。Google TestSize では Meduim サイズのテストにかけてよい時間は最大 300 秒ですから、十分に短い時間と言えます。

# おわりに

**apollo-server-testing と sqlite によって、既存の環境に影響を及ぼすことなく、高速に resolver の統合テストを行うことができました**。ユニットテストと E2E テストの間を埋める重要なテストを手軽に構築できる仕組みがあるのは、とてもありがたいです。

余談ですが今回の統合テストによって、「Admin ロール**しか持っていない**場合に、ユーザ削除ができなかった」という不具合を除去することができました。統合テストの成果か…は微妙ですが、テストを書くことで、バグのままリリースせずに済んで良かった。

前提として、テストピラミッドの下段にあるユニットテストをまずは厚くしつつ、、、さらに高速実行できる統合テストが多数あれば、E2E テストや手動テストに頼らずとも品質維持能力が向上していくはずです。統合テストもさらに改良を続けていきたい。これでもうデグレも怖くない！たぶん！

### ボーナス

下記のリポジトリで、さらに多くの統合テストを行っているプロジェクトを公開していますので、あわせてご覧いただければと思います。  
https://github.com/suzukalight/clean-architecture-nodejs-graphql-codegen
