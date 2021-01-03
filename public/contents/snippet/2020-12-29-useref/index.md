---
title: useRefの使いどき
date: '2020-12-29T02:00:00'
category: Snippet
tags: ['react', 'react-hooks', 'use-ref']
status: 'published'
---

下記の 2 パターンで利用する；

1. DOM ノードの参照を持つときに使う（e.g. `<input ref={ref} />`）
2. re-render を走らせたくない変数に使う（e.g. タイマー ID）

### DOM ノードの参照を持つときに使う

```tsx:ja.reactjs.org/docs/hooks-reference.html#useref
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### re-render を走らせたくない変数に使う

```tsx:ja.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

**関数コンポーネントにおける、クラスのインスタンス変数として使える。**

useRef はオブジェクトを作ってその参照を返すので、`intervalRef.current` の値を変更しても、intervalRef 自体が変更されないことから、**re-render が走らない。**この性質を利用して、クラスコンポーネントにおけるインスタンス変数のようなものとして扱うことができる。

### references

- https://ja.reactjs.org/docs/hooks-reference.html#useref
- https://ja.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
- https://yukinaka.me/react-useref
