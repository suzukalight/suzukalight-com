# suzukalight-com

自己紹介、オリジナルコース、コードスニペット、ブログなどの様々なコンテンツを掲載することができる Web サイトプロジェクトです。Next.js + Chakra-UI + mdx(markdown) をメイン技術として使用しています。

## DEMO

https://suzukalight.com にて公開および運用中です。コンテンツサンプルとして、下記リンクを参照ください。

- [自己紹介](https://suzukalight.com/about)
- [コース「実践問題で学ぶ C 言語プログラミング」](https://suzukalight.com/course/clang)
- [ブログ「2020 年の振り返り」](https://suzukalight.com/blog/posts/2020-12-31-2020-reflection)
- [コードスニペット一覧](https://suzukalight.com/snippet)

# 技術スタック

- Next.js (React.js)
- Chakra UI
- next-mdx-remote
- remark.js

# 環境構築

## 環境

- Node.js が必要です
- どの OS でも開発できます（私は Windows10 + WSL2 で開発しています）

## セットアップ

```
git clone https://github.com/suzukalight/suzukalight-com
```

- `.env.local.sample` ファイルを `.env.local` ファイルとして複製し、必要に応じて設定を変更してください
- `next-seo.config.js` ファイルを正しい設定に変更してください

## インストールおよび動作確認

```
yarn
yarn dev
```

http://localhost:3000 に dev server が起動します。

## テスト

```
yarn fix
yarn test
```

- `fix` : tsc, eslint, prettier が順に走ります
- `test` : jest が走ります

## storybook

```
yarn storybook
```

## デプロイ

[公開中のサイト](https://suzukalight.com) は Vercel を使用しています。  
https://suzukalight.com/blog/posts/2020-12-20-vercel-deploy

# 特徴

## 様々な種類のコンテンツを作成できる

単なるブログだけではなく、以下のような種類のコンテンツを作成することができます。

- **Snippet**: コードスニペットなどの、メモ書き程度のもの
- **Blog**: 日記や調べ物など、比較的長文のもの
- **Course**: 複数の章節からなる、続きもののドキュメント
- **About**: あなたの自己紹介

これらをそれぞれのコンテンツタイプに適した形で表示する機能を有しています。

## コンテンツを MDX で記述できる

`next-mdx-remote`, `remark.js`, `prism.js` などを使って markdown で書かれたコンテンツを HTML へ変換して表示しています。

コンテンツは `/public/contents/x` ディレクトリで管理しており、そこへサブディレクトリを切って `index.md(mdx)` ファイルを置くと、サブディレクトリを URL とみなして自動的に公開します。画像などのコンテンツも markdown と同じディレクトリに置けば同時に公開できます。

詳細は **[コンテンツに関する README](public/contents/README.md)** を参照ください。

## オリジナルコースを作れる

複数の章節で構成される「**続き物のドキュメント**」を作成することができます。電子書籍の作成、セミナーの作成、アドベントカレンダーの実施などにお使いください。

コースの各章は作成日順で自動的に連番処理され、目次も作成されます。ほか詳細は **[コンテンツに関する README](public/contents/README.md)** を参照ください。

## タグページを自動生成

ブログやスニペットに `frontMatter.tags` にタグを付与すると、タグごとの記事一覧ページや、タグ一覧ページを自動的に作成し、反映します。

## その他

### sitemap.xml を自動生成＋公開

`/src/pages/sitemap.xml.tsx` によって SSR にて自動的に生成し、更新されます。特別なコマンドなどは必要ありません。

### タイトルイメージは、画像または emoji が使える

記事のタイトルイメージは、画像ファイルの他に、emoji を指定することもできます。画像を用意するほどでもないようなコンテンツに対しても、簡単に見栄えを良くすることができます。

### 様々なライブラリのデモプロジェクトとしても

| 機能                   | ライブラリ                                                                   |
| ---------------------- | ---------------------------------------------------------------------------- |
| カルーセル表示         | react-slick, slick-carousel                                                  |
| SNS シェアボタン       | react-share                                                                  |
| SEO 対策               | next-seo                                                                     |
| Twitter 埋め込み       | react-twitter-embed                                                          |
| シンタックスハイライト | remark-prism, remark-code-titles, remark-custom-blocks, remark-unwrap-images |
