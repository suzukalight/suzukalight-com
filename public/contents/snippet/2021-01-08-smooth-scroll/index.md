---
title: ボタンを押すと滑らかにスクロールしてコンテンツを表示
date: '2021-01-08T01:00:00'
category: Snippet
tags: ['react', 'user-interface', 'chakra-ui', 'scroll-into-view', 'a11y']
status: 'published'
---

```tsx
export const SomePage = () => {
  const refContents = useRef<HTMLDivElement>();

  const scrollToContents = useCallback(() => {
    refContents.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [refContents]);

  return (
    <VStack w="100%" minH="calc(100vh - 64px)">
      <Center h={16} pb={16}>
        <IconButton
          aria-label="Scroll to Contents section"
          icon={<FaArrowDown />}
          fontSize="2em"
          onClick={scrollToContents}
        />
      </Center>

      {/* 他の内容省略 */}

      <Box backgroundColor="gray.50" minH="16em" px={[0, 8, 16, 24]} ref={refContents}>
        {/* コンテンツ */}
      </Box>
    </VStack>
  );
};
```

**[scrollIntoView](https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView)** を使うと、対象の DOM へスクロールできる。

- `behavior: 'smooth'` とすると、スムーススクロールでジャンプしてくれる
- **block** で要素の先頭・中央・末尾のいずれへジャンプするかを指定できる
- DOM 要素の参照は **ref** で取得し **useRef** を通して保存する。取得した参照は **ref.current** からアクセスできる
- IconButton を利用すると、アイコンをボタン要素として利用できる。SVG アイコンであれば fontSize で大きさを指定できる
- アイコンを利用したリンク要素やボタン要素には、**aria-label** をつけること。アイコン単独だと可読な文字列がなく、スクリーンリーダーなどに対応できないため。これに限らず a11y は意識していきたい

### references

- scrollIntoView: https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView
