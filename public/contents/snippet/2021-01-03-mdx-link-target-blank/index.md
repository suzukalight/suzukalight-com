---
title: mdxファイルのリンクにtarget=_blankなどを入れる
date: '2021-01-03T02:00:00'
category: Snippet
tags: ['nextjs', 'mdx', 'next-mdx-remote', 'react']
status: 'published'
---

```tsx:markdown.tsx
import hydrate from 'next-mdx-remote/hydrate';

export const LinkWithTargetBlank = (props) => {
  const { href, ...rest } = props;
  if (href.startsWith('http'))
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />;

  return <Link to={href} {...rest} />;
};

hydrate(content, {
  components: {
    // ...
    a: LinkWithTargetBlank
  },
});
```

- href が外部リンクの場合は、a タグで展開し、`target="_blank"` や `rel="noopener noreferrer"` を付与する
- href が内部リンクの場合は、`next/link` で展開する

Chakra UI の Link が使える場合は、target, ref のかわりに `isExternal` を付与するだけで OK。

### references

- noopener: https://blog.ojisan.io/noreferrer-noopener
