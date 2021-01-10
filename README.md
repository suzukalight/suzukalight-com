# suzukalight-com

ポートフォリオ、自己紹介、ブログ、コードスニペットなどを掲載することができる、Next.js + Chakra-UI 構成の Web サイト向けプロジェクトです。

## DEMO

https://suzukalight.com にて公開および運用です。

# 技術スタック

- Next.js (React.js)
- Chakra UI
- next-mdx-remote

# 環境構築

セットアップ手順は下記の通りです；

- Node.js が必要です
- どの OS でも開発できます（私は Windows10+WSL2 で開発しました）
- `.env.local.sample` ファイルを `.env.local` ファイルとして複製し、必要に応じて設定を変更してください
- `next-seo.config.js` ファイルを正しい設定に変更してください

インストールおよび動作確認は、下記のコマンドでできます；

```
yarn
yarn dev
```

デプロイは Vercel を使うのが楽です；  
https://suzukalight.com/blog/posts/2020-12-20-vercel-deploy

# 特徴

## コンテンツを MDX で記述できる

next-mdx-remote, remarkjs, prismjs によって、markdown で書かれたコンテンツを HTML へ変換して表示しています。

コンテンツは `/public/contents/x` ディレクトリで管理しており、そこへサブディレクトリを切って `index.md(mdx)` ファイルを置くとそれを URL として自動的に公開します。画像などのコンテンツも markdown と同じディレクトリに置けば同時に公開できます。（画像と md が同じディレクトリにあるため、編集が非常に楽です）

## タグページを自動生成

`frontMatter.tags` にタグを付与すると、タグごとの記事一覧ページや、タグ一覧ページへ自動的に反映します。

## タイトルイメージは、画像または emoji

記事のタイトルイメージは、画像ファイルの他に、emoji を指定することもできます。

## 様々なライブラリのデモプロジェクトとして

- カルーセル表示: react-slick, slick-carousel
- SNS シェアボタン: react-share
- SEO 対策: next-seo
- Twitter 埋め込み: react-twitter-embed
- シンタックスハイライト: remark-prism, remark-code-titles
