# Contents ディレクトリ

ここに markdown(md/mdx)ファイルを置くと、コンテンツとして公開することができます。

## コンテンツおよび対応するディレクトリ名

| ディレクトリ名 | 対応するコンテンツ           |
| -------------- | ---------------------------- |
| **blog**       | 一般的なブログ               |
| **snippet**    | 再利用可能なコードスニペット |
| **course**     | 複数の章から構成されるコース |
| **about**      | 自己紹介                     |
| **works**      | ポートフォリオ               |

# blog, snippet

1 記事 1 ファイルの基本的な構成です。

- `/blog` : ブログ一覧
- `/blog/posts/[slug]` : 各ブログの内容
- `/blog/tags` : タグ一覧
- `/blog/tags/[tag]` : タグにマッチする記事一覧
- `/` に最新のブログやスニペットを表示する機能があります

## ファイルと URL の関係

`/public/contents/blog/[slug]/index.md(x?)` を作成すると、 `/blog/posts/[slug]` として公開することができます。index ファイルの内容のみが公開されます。

## 画像などのアセット

markdown ファイルと同じディレクトリに画像などを配置して、`![alt](image.png)` として markdown に記述すれば、同じ URL で同時に公開することができます。

> この仕様に決めたおかげで、vscode などでプレビューしているときも画像が展開できて便利でした

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

| type                 | 内容                                                                          |
| -------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| **title**            | 記事のタイトル                                                                |
| **date**             | 記事の公開日時。コンテンツは日付順で並べ替えて表示しています                  |
| **tags**             | タグごとのページが自動で作成され、そこに表示されます。配列形式で記述します    |
| **status**           | `published                                                                    | draft` （markdown そのものは外部から見えることに注意） |
| **hero**?/**emoji**? | アイキャッチを指定します。hero で画像ファイルを、emoji で絵文字を指定できます |

# course

course は章構成があるため、各章のファイルパスは `/public/contents/course/[title]/[chapter]/index.md(x?)` という構成になっています。

- `/course` : コース一覧
- `/course/[title]` : コースの説明と、各章の目次
- `/course/[title]/[chapter]` : 各章の内容

## 本の概要(title)

`/public/contents/course/[title]/index.md(x?)` に markdown を置くと、本の概説部分を提供することができます。本のタイトルなどもここで指定します。

### frontmatter

```
---
title: C言語プログラミング
date: '2018-12-08T02:00:00'
hero: index.png
status: 'published'
---
```

| type                 | 内容                                                                          |
| -------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| **title**            | 本のタイトル                                                                  |
| **date**             | 公開日時                                                                      |
| **status**           | `published                                                                    | draft` （markdown そのものは外部から見えることに注意） |
| **hero**?/**emoji**? | アイキャッチを指定します。hero で画像ファイルを、emoji で絵文字を指定できます |

## 各章(chapter)

- 各章のファイルパスは `/public/contents/course/[title]/[chapter]/index.md(x?)` です
- **目次は公開日時順で自動整列します**。

### frontmatter

```
---
title: 変数とデータ型
date: '2018-12-08T02:00:00'
hero: index.png
status: 'published'
---
```

| type                 | 内容                                                                          |
| -------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| **title**            | 章のタイトル                                                                  |
| **date**             | 公開日時                                                                      |
| **status**           | `published                                                                    | draft` （markdown そのものは外部から見えることに注意） |
| **hero**?/**emoji**? | アイキャッチを指定します。hero で画像ファイルを、emoji で絵文字を指定できます |

# about

`/about` ページにレンダリングされる自己紹介です。

`index/index.md` のみ有効です。コンテンツはページの後半部分にレンダリングされます。

# works

ポートフォリオを公開することができます。

- `/works` : 一覧表示（アイキャッチ大きめのギャラリー形式）
- `/works/detail/[slug]` : 各ポートフォリオの詳細
- `/` に Works の一部をピックアップして表示する機能があります

## frontmatter

```
---
title: Andlearn
supplement: マイクロラーニングアプリ
types: ['RELATIONS株式会社']
roles: ['フルスタックエンジニア']
date: '2018-10-01T00:00:00'
periodFrom: '2018-10-01T00:00:00'
periodTo: '2019-03-31T00:00:00'
hero: andlearn.png
status: 'published'
---
```

| type                 | 内容                                                                          |
| -------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| **title**            | ポートフォリオのタイトル                                                      |
| **supplement**?      | ごく簡単な説明                                                                |
| **date**             | 公開日時                                                                      |
| **status**           | `published                                                                    | draft` （markdown そのものは外部から見えることに注意） |
| **periodFrom**       | 開始日                                                                        |
| **periodTo**?        | 終了日                                                                        |
| **isNow**?           | 現任である場合は `true` を指定                                                |
| **types**?           | どのクライアントで行った仕事か                                                |
| **roles**?           | どういう役割を担っていたか                                                    |
| **hero**?/**emoji**? | アイキャッチを指定します。hero で画像ファイルを、emoji で絵文字を指定できます |
