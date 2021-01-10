---
title: 子要素を親要素からはみ出して配置するCSS
date: '2020-12-30T02:00:00'
category: Snippet
tags: ['css', 'user-interface']
status: 'published'
---

```css
.full {
  margin: 0 calc(50% - 50vw);
  padding: 0 calc(50vw - 50%);
  width: 100vw;
}
```

margin で画面端に寄せて、padding で中央に戻す。

### 発生した現象

例えば記事ページにおいて横幅を 40em で固定してあるときに、記事内部の画像やコードなどを全幅で表示したいような場合。`position` を指定する方法だと、height がわかってないとダメなので使えない。

### 具体的な手法

```html
<div class="content">
  <div class="inner">
    <div class="full">ここを画面幅いっぱいにしたい</div>
  </div>
</div>
```

```css
.content {
  overflow: hidden;
}

.inner {
  width: 40em;
  max-width: 100%;
  margin: 0 auto;
}

.full {
  margin: 0 calc(50% - 50vw);
  padding: 0 calc(50vw - 50%);
  width: 100vw;
}
```

`position: static` のままで問題なく機能する。

### references

- https://haniwaman.com/inner-over/
