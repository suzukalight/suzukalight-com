---
title: 上スクロールしたときだけ表示されるヘッダ
date: '2021-01-04T01:00:00'
category: Snippet
tags: ['react', 'UI', 'react-hooks']
status: 'published'
---

```tsx:header.tsx
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

export const Header: React.FC = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);

  useScrollPosition(({ prevPos, currPos }) => {
    const visible = currPos.y > prevPos.y;
    setShowMenu(visible);
  }, []);

  return (
    <Center
      as="nav"
      visibility={showMenu ? 'visible' : 'hidden'}
      transition={`all 200ms ${showMenu ? 'ease-in' : 'ease-out'}`}
      transform={showMenu ? 'none' : 'translate(0, -100%)'}
    >
      {children}
    </Center>
  );
};
```

`useScrollPosition` Hooks を利用して、スクロールイベントをフックする。前回と今回の Y 座標を比較して、今回のほうが大きい（上にスクロールした）場合は、ヘッダを表示する。

> hooks の引数無指定の場合は document.body の boundingClientRect が参照される。下にスクロールすると、body の top は上方向に移動する＝ body の Y 座標はどんどんマイナス値になっていく

表示トランジションには、Chakra UI の Collapse などを利用しても良い。ただページ遷移の際にもアニメーションしてしまって、少し違和感を覚えたので、上記の例ではトランジションを自筆している。

### references

- @n8tb1t/use-scroll-position: https://github.com/n8tb1t/use-scroll-position
