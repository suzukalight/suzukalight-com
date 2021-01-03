---
title: Array.map で async/await を使う
date: '2020-12-30T03:00:00'
category: Snippet
tags: ['typescript', 'javascript', 'async-await']
status: 'published'
---

```ts
const data = await Promise.all(
  arr.map(async (a) => ({
    prop: await asyncFunc(a),
  })),
);
```

Promise.all で Array.map をラップすれば良い。

### references

- https://qiita.com/kwbt/items/6c0fe424c89a9f7553c1
