---
title: Gatsby のサイトカスタマイズ
date: '2019-06-30T00:08:00'
description: 'PWA対応・OGP対応・テーマ変更・目次表示・syntaxHighlight・GA設定・RSS・Sitemap'
category: Technology
tags: ['gatsby', 'pwa']
hero: gatsbyjs.jpg
status: 'published'
---

Gatsby のプラグインを利用することで、ブログに必要な数々の設定を簡単におこなうことができた。

# PWA 対応

- [Add manifest and favicon](https://github.com/suzukalight/suzukalight.github.io/commit/13b7d4660c560061a3892daa54e76b89162cb2ef)

`gatsby-plugin-manifest` が利用可能。starter で自動インストール済み。

マニフェストの内容とアイコン類は、下記のサイトを使って自動生成することができる。それを `gatsby-config.js` にコピペすれば良い。

- 手順: https://takumon.com/2018/10/08/
- 生成: https://app-manifest.firebaseapp.com/

# OGP 対応

starter に付属のコンポーネント `<SEO />` を利用すると、多くの項目について、自動で OGP を設定してくれるため、こちらから追加で何かをする必要はほとんどなかった。

# テーマ変更

- [Add typography theme of github](https://github.com/suzukalight/suzukalight.github.io/commit/976447b1a6b7cdeb3a6fd60b6ba8663f8174321b)

starter は [typography.js](https://kyleamathews.github.io/typography.js/) で文字のスタイリングを行っている。typographyjs のテーマに GitHub 版の `typography-theme-github` があったので、これを適用した。

# 目次の追加

- [getting-table-of-contents](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/#getting-table-of-contents)

query に`tableOfContents`を追加すると、目次情報の HTML を取得することができる；

```javascript{5}:templates/BlogPost/index.js
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
`;
```

あとはこれをマークアップしつつ表示すれば OK；

```jsx
<section className={styles.toc}>
  <h1 className={styles.tocHeader}>目次</h1>
  <div className={styles.tocBody} dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
</section>
```

# syntax-highlighter

- [Add syntax highligher](https://github.com/suzukalight/suzukalight.github.io/commit/ed08bb35190bbb2bea121af2a0cedfddff6388a8)

`gatsby-remark-prismjs` のオプションで指定可能。

- [Add gatsby-remark-code-titles](https://github.com/suzukalight/suzukalight.github.io/commit/91aeab5e033a4f8001d363ddf88dd538f80c8e1f)

`gatsby-remark-code-titles` を追加すると、さらにファイル名表記も付与可能に。

# Google Analytics

- [gatsby-plugin-google-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/)

プラグイン自体は、すでに starter に入っています。`gatsby-config.js`を書き換えるだけで OK です；

```javascript{4}:gatsby-config.js
{
  resolve: `gatsby-plugin-google-analytics`,
  options: {
    trackingId: 'YOUR TRACKING ID',
  },
},
```

# RSS Feed

starter でデフォルト有効です。`/rss.xml` で配信されます。

# Sitemap

- [gatsby-plugin-sitemap](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/)

sitemap プラグインをインストールし、サイト情報とオプションを設定すれば OK です；

```javascript{2,6-9}:gatsby-config.js
siteMetadata: {
  siteUrl: `https://suzukalight.com`,
},
plugins: [
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      sitemapSize: 5000,
    },
  },
]
```
