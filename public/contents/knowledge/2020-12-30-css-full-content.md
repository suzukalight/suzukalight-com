---
title: 子要素を親要素からはみ出して配置するCSS
date: '2020-12-30T02:00:00'
category: Knowledge
tags: ['css']
status: 'published'
---

例えば記事ページにおいて横幅を 40em で固定してあるときに、記事内部の画像やコードなどを全幅で表示したいような場合。`position` を指定する方法だと、height がわかってないとダメなので使えない。

結論としては、margin で画面端に寄せて、padding で中央に戻す方法を取る。

```css
.full {
  margin: 0 calc(50% - 50vw);
  padding: 0 calc(50vw - 50%);
  width: 100vw;
}
```

### 具体的な方法

```html
<div class="content">
  <div class="inner">
    <div class="full">ここは画面幅いっぱい</div>
    <div class="body">ここはインナー幅の中</div>
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
