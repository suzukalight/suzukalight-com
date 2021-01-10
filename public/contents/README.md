# Contents ディレクトリ

ここに markdown(md/mdx)ファイルを置くと、コンテンツとして公開することができます。

## ディレクトリ構成

- **about**: 自己紹介
- **blog**: 一般的なブログ
- **textbook**: 複数の章から構成される本
- **snippet**: 再利用可能なコードスニペット

# ファイルの置き方（blog, snippet）

1 記事 1 ファイルの基本的な構成です。

## markdown

`/public/contents/blog/[slug]/index.md(x?)` を配置すると、 `https://example.com/blog/posts/[slug]` として公開することができます。

## images

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

# ファイルの置き方（about）

基本は blog などと同じです。`index/index.md` のみ有効です。コンテンツはページの後半部分にレンダリングされます。

# ファイルの置き方（textbook）

## introduction

`/public/contents/[title]/index.md(x?)` に markdown を置くと、本の概説部分を提供することができます。本のタイトルなどもここで指定します。

### frontmatter

```
---
title: C言語プログラミング
date: '2018-12-08T02:00:00'
hero: index.png
status: 'published'
---
```

- **title**: 本のタイトル
- **date**: 公開日時
- **hero/emoji**: アイキャッチを指定します。hero で画像ファイルを、emoji で絵文字を指定できます
- **status**: `published` のものだけが公開されます。非公開のものは `draft` を指定しておきます（public に置いたままだと、markdown そのものは外部から見えることに注意）

## chapter

textbook は章構成があるため、各章のファイルパスは `/public/contents/[title]/[chapter]/index.md(x?)` という構成になっています。

画面左の目次などは、chapter slug のアルファベット順で列挙するため、ディレクトリ名の先頭に数値などを付加して順序付けておくと良いでしょう。（e.g. `01-variables/index.md`）

### frontmatter

```
---
title: 変数とデータ型
date: '2018-12-08T02:00:00'
hero: index.png
status: 'published'
---
```

- **title**: 章のタイトル
- **date**: 公開日時
- **hero/emoji**: アイキャッチを指定します。hero で画像ファイルを、emoji で絵文字を指定できます
- **status**: `published` のものだけが公開されます。非公開のものは `draft` を指定しておきます（public に置いたままだと、markdown そのものは外部から見えることに注意）
