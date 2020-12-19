---
title: 'Jest の test.each で Parameterized test を実行する'
date: '2020-10-27T00:02:00'
category: Technology
tags: ['typescript', 'jest', 'test', 'date-fns']
emoji: '🧪'
status: 'published'
---

Jest で関数の引数を複数パターンチェックしたい場合、ベタに書く方法のほかに、**`test.each` でテーブルとして記述する方法があります**。テストの視認性が良くなるため、オススメの記法です。今回はこちらをご紹介するとともに、いくつかの実践問題も提示します。

# Jest の `test.each` とは

https://jestjs.io/docs/ja/api#testeachtablename-fn-timeout
**Jest で Parameterized test を行うことができるメソッドです**。関数の「引数と期待値」を複数個与えることができ、Jest はそれをとりかえながら、すべて実行してくれます；

```ts
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```

上記のような形で、配列によってパラメータを指定することができるようになり、Jest は**その配列の個数分だけテストを繰り返し実行してくれます**。この方法でも十分ですが、オススメなのが下記のテーブル記法です；

```ts
test.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`('returns $expected when $a is added $b', ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});
```

上記のような、**テーブル形式による記述が、パラメータと結果のマトリクスをより直感的に表現できていると思います**。parameter が named になるメリットもありますので、こちらを利用するのがおすすめです。

# サンプルプロジェクト

https://github.com/suzukalight/sample-jest-test-each  
上記の URL にサンプルを Push していますので、clone してお試しください。

```bash:bash
git clone https://github.com/suzukalight/sample-jest-test-each
cd sample-jest-test-each
yarn
```

以下の技術を使用しています；

- Node.js + TypeScript ([gts](https://github.com/google/gts) でテンプレート生成)
- [Jest w/ts-jest](https://github.com/kulshekhar/ts-jest)
- date-fns

# テストの要件と対象

## 「映画館のチケット料金」を考えます

映画館のチケット料金は、通常の大人・小人料金のほかに、**ファーストデイ（毎月 1 日）や、レイトショー（22 時以降の上映）などの割引料金が存在します**。

| 条件           | 料金  |
| -------------- | ----- |
| 大人           | 1,800 |
| 小人           | 1,200 |
| ファーストデイ | 1,000 |
| レイトショー   | 1,100 |

今回は上記の条件を考えてみましょう。なお、複数の割引が当てはまった場合は、最も安くなるものを 1 つのみ採用することとします。

## 料金計算関数の実装

シンプルに、安いものから順に条件チェックするものとし、以下の関数を作りました；

```ts:src/getTheaterTicketPrice.ts
const getDate = require("date-fns/getDate");
const getHours = require("date-fns/getHours");
const differenceInYears = require("date-fns/differenceInYears");

export const getTheaterTicketPrice = (watchDateTime: Date, birthday: Date) => {
  if (getDate(watchDateTime) === 1) return 1000;
  if (getHours(watchDateTime) >= 22) return 1100;
  if (differenceInYears(watchDateTime, birthday) <= 12) return 1200;

  return 1800;
};
```

これを test.each でテストすることを考えていきます。

## 関数のテスト要件

- 仕様
  - 大人 : 1,800 円
  - 小人 **（12 歳以下）** : 1,200 円
  - ファーストデイ **（3/1, 4/1 など)** : 1,000 円
  - レイトショー **（22:00 以降の上映）** : 1,100 円
- 補則：
  - 複数の割引が当てはまった場合は、最も安くなるものを、1 つのみ採用する

# テストの実装

## パッケージをインストール

```bash:bash
yarn add -D jest ts-jest @types/jest
yarn add date-fns
```

```js:jest.config.js
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/__tests__/*.+(ts|js)"],
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node",
};
```

## テストテーブルを作成

```ts:src/__tests__/getTheaterTicketPrice.ts
import { getTheaterTicketPrice } from "../getTheaterTicketPrice";

describe("getTheaterTicketPrice", () => {
  type TestArgsGetTheaterTicketPrice = {
    watchDateTime: string;
    birthday: string;
    price: number;
  };

  test.each`
    watchDateTime         | birthday              | price
    ${"2020-10-10T10:00"} | ${"1980-05-05T00:00"} | ${1800}
    ${"2020-10-10T10:00"} | ${"2010-05-05T00:00"} | ${1200}
    ${"2020-10-01T10:00"} | ${"1980-05-05T00:00"} | ${1000}
    ${"2020-10-10T23:00"} | ${"1980-05-05T00:00"} | ${1100}
  `(
    "上映日 $watchDateTime の映画を、誕生日が $birthday の人が見た場合、値段は $price 円である",
    ({ watchDateTime, birthday, price }: TestArgsGetTheaterTicketPrice) => {
      expect(
        getTheaterTicketPrice(new Date(watchDateTime), new Date(birthday))
      ).toBe(price);
    }
  );
});
```

コード中央部の template literal で囲われたテーブルが、今回テストする内容です。大人・小人・ファーストデイ・レイトショーの条件を列挙し、正しい料金が返されるかをチェックしています。

> **日付には時刻も指示するようにしてください**。これをしなかった場合、日付や時刻の比較がうまく行かない場合があります。**時刻を指定しなかった場合は、Date は時刻について UTC 換算で時刻を生成してしまうためです**。結果として日付取得関数は 9 時間遅れた値を返すようになります。

## テストを実行

```bash:bash
$ yarn test
 PASS  src/__tests__/getTheaterTicketPrice.ts
  getTheaterTicketPrice
    ✓ 上映日 2020-10-10T10:00 の映画を、誕生日が 1980-05-05T00:00 の人が見た場合、値段は 1800 円である (3 ms)
    ✓ 上映日 2020-10-10T10:00 の映画を、誕生日が 2010-05-05T00:00 の人が見た場合、値段は 1200 円である
    ✓ 上映日 2020-10-01T10:00 の映画を、誕生日が 1980-05-05T00:00 の人が見た場合、値段は 1000 円である
    ✓ 上映日 2020-10-10T23:00 の映画を、誕生日が 1980-05-05T00:00 の人が見た場合、値段は 1100 円である

Test Suites: 1 passed, 1 total
Tests:       3 todo, 4 passed, 7 total
Snapshots:   0 total
Time:        0.704 s, estimated 2 s
Ran all test suites.
✨  Done in 1.83s.
```

正常に PASS しました！

# 実践問題

## 1) テスト条件を追加

上記のテストは最低限の正常系のみをチェックしています。そこで以下のテストを加えてください；

- **条件が重複している場合**のチェック
  - ファーストデイかつレイトショー、など
- **境界値テスト**を追加
  - 「年齢」の前後
  - 「1 日」の前後
  - 「22 時」の前後

## 2) 料金体系を追加

以下の料金体系を追加実装して、それをテストしてください；

- 学生割引: **22 歳以下の人**は、1,400 円にします
- 誕生日割引: **誕生日を含む前後 7 日**は、年齢料金から半額にします（大人: 900 円）
- 株主優待割引: **株主優待券を使う**と、年齢料金から 1,000 円割引します（大人: 800 円）
- 団体割引: **10 人以上のグループの**場合は、年齢料金から 10%割引します（大人: 1,620 円）

# その他の `test.each` の使い方

## 非同期処理に対する `test.each`

今回の例のようなシンプルな同期関数だけでなく、下記のような非同期処理の関数もテストすることができます；

```ts
test.each`
  dueDate                | length
  ${'2019-10-01T00:00Z'} | ${0}
  ${'2020-01-07T00:00Z'} | ${0}
  ${'2020-01-08T00:00Z'} | ${1}
  ${'2020-01-09T00:00Z'} | ${2}
  ${'2020-01-10T00:00Z'} | ${3}
  ${'2021-01-01T00:00Z'} | ${3}
`(
  'OK: dueDate=$dueDateのとき、エンティティを$length件取得できた',
  async ({ dueDate, length }: { dueDate: string; length: number }) => {
    const connection = sqliteDbConnection.getConnection();
    if (!connection) throw new Error('cannot connect to test database.');

    const todoQueryService = new GqlTodoQueryService(connection);

    const result = await todoQueryService.allTodosWithDeadlineApproaching({
      dueDate: new Date(dueDate),
      daysBeforeWarning: 3,
    });

    expect(result.todos?.length).toBe(length);
  },
);
```

DB にアクセスし、条件にマッチするエンティティを複数取得する関数のテストです。このように **async/await で完了を待ってから、実行結果を比較することもできます**。

# おわりに

`test.each` を使うことで、**境界値での振る舞いや、複数の条件を持つような関数のテストについて、そのパラメータをテーブル記法で記述することができるようになりました**。これによりテストの視認性が向上するほか、多くのテストを素早く実行することもできるようになることでしょう。

### ボーナス

下記のリポジトリで、さらに多くの parameterized test を行っているプロジェクトを公開していますので、あわせてご覧いただければと思います。  
https://github.com/suzukalight/clean-architecture-nodejs-graphql-codegen
