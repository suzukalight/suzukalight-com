---
title: Gatsby のファイル構成
date: '2019-07-01T23:00:00'
description: 'Gatsby 開発時に利用するファイル類の構成について'
category: Technology
tags: ['gatsby']
hero: title.png
status: 'published'
---

基本的な内容は、こちらで解説されていますので、あわせて参照ください。  
https://www.gatsbyjs.org/docs/gatsby-project-structure/

# ディレクトリ構成

大まかなディレクトリ構成は以下のようになっています。
（templates を移動するなど、一部変更を加えています）

```
root
 ┣ content       // 記事用
 ┃ ┣ assets        // 記事で使用する素材
 ┃ ┗ blog          // 記事
 ┣ src           // 開発用
 ┃ ┣ components    // ヘッダやタグなどの部品
 ┃ ┣ pages         // 主に固定ページ用
 ┃ ┣ styles        // 共通スタイル
 ┃ ┗ utils         // 共通ロジック
 ┣ static        // アイコンや robots.txt など
 ┗ package.json
```

# content ディレクトリ ＝ 記事用

```
root
 ┣ content
 ┃ ┣ assets
 ┃ ┃ ┗ tarako.jpg
 ┃ ┗ blog
 ┃   ┣ 2019-06-29-hello-world
 ┃   ┃ ┗ index.md
 ┃   ┗ 2019-06-30-site-settings
 ┃     ┗ index.md
```

## content/assets

記事で使用する共通のアセット類を格納するディレクトリです。個別の記事で使用する場合は、blog ディレクトリに配備すれば大丈夫のはずです。

## content/blog

記事を格納するディレクトリです。

記事は 1 つずつディレクトリを作成し、そのなかに `index.md` ファイルを配備します。Gatsby はこれらの md ファイル（と template）をもとに、html ファイルを自動生成します。このときディレクトリ名が記事の slug（URL）になります。

> ディレクトリ名に日付を入れる必要はありません。記事の markdown 側で投稿日時を記載可能です。

# src ディレクトリ = 開発用

```
root
 ┣ src
 ┃ ┣ components
 ┃ ┃ ┣ atoms
 ┃ ┃ ┣ molecules
 ┃ ┃ ┣ pages
 ┃ ┃ ┃ ┗ Root
 ┃ ┃ ┃   ┣ Posts.js
 ┃ ┃ ┃   ┗ Posts.module.scss
 ┃ ┃ ┗ templates
 ┃ ┃   ┣ BlogPost
 ┃ ┃   ┃ ┣ index.js
 ┃ ┃   ┃ ┗ index.module.scss
 ┃ ┃   ┣ Layout
 ┃ ┃   ┃ ┣ index.js
 ┃ ┃   ┃ ┗ index.module.scss
 ┃ ┃   ┗ Tags
 ┃ ┃     ┗ index.js
 ┃ ┣ pages
 ┃ ┃ ┣ 404.js
 ┃ ┃ ┣ index.js
 ┃ ┃ ┗ tags.js
 ┃ ┣ styles
 ┃ ┃ ┗ syntax-highlight.scss
 ┃ ┗ utils
 ┃   ┗ typography.js
```

## src/components

ページで使用する、共通のコンポーネントを入れておくディレクトリです。内容については特に決まりはありません。

私はコンポーネントを Atomic Design で管理しているので、atoms, molecules などのサブディレクトリを配置しています。

独自の変更として、Gatsby の templates をこちらに移動させ、CSS Modules でマークアップするようにしています。pages も移動させたかったのですが、pages は Gatsby の縛りで固定のようなので移動させず、pages で使用しているサブコンポーネントだけをこちらに移動させる形としました。

## src/pages

Gatsby 固定のディレクトリで、この中にある js ファイルが、自動的に固定ページとして扱われます。

URL とファイル名が一致する形で生成されます。

## src/styles

共通のスタイルを入れています。独自に追加したものです。

## src/utils

共通のロジックを入れています。独自に追加したものです。

## src/templates

src/components/templates に移動させました。独自の改変です。

# static ディレクトリ = 配信ファイル用

```
root
 ┣ static
 ┃ ┣ icons
 ┃ ┃ ┗ icon-128x128.png
 ┃ ┣ CNAME
 ┃ ┣ favicon.ico
 ┃ ┗ robots.txt
```

デプロイ時に public ディレクトリへ展開したいファイルを入れておく場所です。

manifest.json で利用するアイコン類や、robots.txt, favicon などを入れています。

# root ディレクトリ直下 = 各種設定

```
root
 ┣ gatsby-browser.js
 ┣ gatsby-config.js
 ┣ gatsby-node.js
 ┗ package.json
```

## gatsby-browser.js

browserAPI（ブラウザで表示する側のファイル）に対して影響を与える設定類を記述します。私は共通 CSS 類の取り込み指示を書きました。

## gatsby-config.js

全体共通の設定類です。主にプラグインに関する設定を記述しました。

## gatsby-node.js

nodeAPI（記事を生成する側のファイル）に対して影響を与える設定類を記述します。タグページの追加や、関連記事情報の生成など。

# その他

## .cache, public ディレクトリ

ビルド時に生成されます。 `$ gatsby clean` で消去できます。
