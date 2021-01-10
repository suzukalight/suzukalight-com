# Contents ディレクトリ

ここに markdown(md/mdx)ファイルを置くと、コンテンツとして公開することができます。

## ディレクトリ構成

- **about**: 自己紹介
- **blog**: 一般的なブログ
- **snippet**: 再利用可能なコードスニペット

## ファイルの置き方

**markdown**  
`/public/contents/blog/[slug]/index.md(x?)` を配置すると、 `https://example.com/blog/posts/[slug]` として公開することができます。

**images**  
`/public/contents/blog/[slug]` のディレクトリに画像などを配置して、`![alt](image.png)` として markdown に記述すれば、同じ URL で同時に公開することができます。（vscode などでプレビューしているときも画像が展開できるので便利です）

## frontmatter

```
---
title: RELATIONSのフロントエンド技術スタックと、大事にしている選択基準
date: '2018-12-08T02:00:00'
tags: ['技術選定', 'frontend', 'react', 'storybook', 'atomic-design', 'graphql']
emoji: 👨‍💻
status: 'published'
---
```

- **title**: 記事のタイトル
- **date**: 記事の公開日時。コンテンツは日付順で並べ替えて表示しています
- **tags**: タグごとのページが自動で作成され、そこに表示されます。配列形式で記述します。
- **hero/emoji**: アイキャッチを指定します。hero で画像ファイルを、emoji で絵文字を指定できます
- **status**: `published` のものだけが公開されます。非公開のものは `draft` を指定しておきます（public に置いたままだと、markdown そのものは外部から見えることに注意）
