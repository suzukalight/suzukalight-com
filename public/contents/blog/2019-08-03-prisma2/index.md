---
title: Prisma2 Preview を触る
date: '2019-08-03T00:01:00'
category: Technology
tags: ['prisma2', 'hands-on', 'prisma', 'sqlite']
hero: title.png
status: 'published'
---

# Prisma2

- Prisma2: https://github.com/prisma/prisma2

![](prisma2.png)
（※上記リポジトリより引用）

prisma2 ecosystem には、下記の 3 つが含まれています；

- **PhotonJS**: ORM。自作のサーバに import して利用するライブラリ
- **Lift**: データモデリングとマイグレーションを行う、CLI ツール
- **Studio**: データ管理画面を提供する、GUI ツール

v1 では専用サーバを立ち上げて、間接的に prisma を利用する形式でしたが、v2 では自作サーバに Photon を import することで、直接データを触っていくスタイルに変更されました。

Lift や Studio は、prisma2 CLI をインストールすることで利用することができるようになります。

# セットアップ

- [prisma2/tutorial\.md at master · prisma/prisma2](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)

上記ドキュメントの手順で進めていきます。ここではお手軽に SQLite を使ってハンズオンをしてみます。

## インストール

1. prisma2 CLI をインストール
1. prisma2 init でボイラープレートを作成

```bash
$ npm i -g prisma2
$ prisma2 init study-prisma2

> > SQLite

> [x] Photon
> [x] Lift
> > Create

> > TypeScript

> > From Scratch

> Your template has been successfully set up!
```

## VSCode にエクステンションを追加

あったほうが開発がはかどります；

- **[SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)** : dev.db の中身を表示できる
- **[Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)**: .prisma などのシンタックスハイライトができる

# 実行

## マイグレーション・シーダー

1. Lift を使ってマイグレーション
1. ボイラープレート付属の seeder スクリプトを使って、User と Post を作成

```bash
$ cd study-prisma2
$ yarn

$ prisma2 lift up

> Done with 1 migration in 196ms.

$ yarn seed

> Done in 1.52s.
```

SQLite エクステンションで開いてみると、seeder によって Post が増えているのが確認できました；

![](seeded.png)

## サンプルスクリプトの実行

サンプルスクリプト `src/script.ts` は、PhotonJS を使って、下記の処理を実行するサンプルです；

- すべての公開済み Post を取得
- User:alice が新しい Post を作成＋公開
- User:alice の Post 一覧を取得

実行結果は console.log で出力されます（一部省略）；

```bash
$ yarn start

> $ ts-node src/script.ts
> Retrieved all published posts: ...
> Created a new post: ...
> Published the newly created post: ...
> Retrieved all posts from a specific user: ...

> ✨  Done in 1.59s.
```

SQLite エクステンションで開いてみると、サンプルスクリプトによって Post が増えているのが確認できました；

![](started.png)

# Studio の起動

DB の状態は、管理ツールである Studio を起動することでも操作が可能です。prisma2 の Development mode を起動して、Studio を利用可能にしましょう；

```bash
$ prisma2 dev
```

管理ツールは http://localhost:5555 で起動します。ここからデータの閲覧や、クエリの発行などが可能になります；

![](studio.png)

# あとがき

ハンズオンはあっという間に完了することができました。次は自前の GraphQL サーバを作成しつつ、適当な SPA クライアントを実装して見る予定です。

# References

- [Prisma2](https://github.com/prisma/prisma2)
- [prisma2/tutorial\.md at master · prisma/prisma2](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)
- [Prisma 2 Preview: Type-safe Database Access & Declarative Migrations](https://www.prisma.io/blog/announcing-prisma-2-zq1s745db8i5#getting-started-with-prisma-2)
