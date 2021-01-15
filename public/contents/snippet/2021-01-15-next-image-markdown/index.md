---
title: markdownページでnext/imageを使う
date: '2021-01-15T01:00:00'
category: Snippet
tags: ['markdown', 'mdx', 'react', 'next-mdx-remote', 'nextjs', 'next-image']
status: 'published'
---

```tsx
import React from 'react';
import Image from 'next/image';

type NextImageProps = {
  src: string;
  alt?: string;
};

export const NextImage: React.FC<NextImageProps> = ({ src, alt, ...props }) => (
  <div
    style={{
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '16em',
      marginBottom: '1.75em',
      backgroundColor: '#f7fafc',
    }}
  >
    <Image {...props} src={src} alt={alt || src} layout="fill" objectFit="contain" />
  </div>
);
```

markdown で利用する画像サイズは予測しづらいので、next/image の `layout="fill"` を使い、動的にリクエストを変更してもらう。親コンテナ（のサイズ）が必要になるので、div で wrap しておき、画像自身は `objectFit="contain"` で枠に収まるように設定した。

```tsx
import remarkUnwrapImages from 'remark-unwrap-images';

const getDefaultMdxOptions = () => ({
  // ...
  remarkPlugins: [
    // ...
    remarkUnwrapImages,
  ],
});
```

markdown のデフォルトだと、image を`p`で囲ってしまい、`p -> div`の HTML 違反となってしまうため、`remark-unwrap-images` で p を外す。next-mdx-remote の mdxOptions に remarkUnwrapImages を追加することで対応できる。

### references

- next/image: https://nextjs.org/docs/api-reference/next/image
- layout-fill sample: https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/layout-fill.js
- remark-unwrap-images: https://github.com/remarkjs/remark-unwrap-images
