---
title: カルーセルでカードを表示する
date: '2021-01-07T01:00:00'
category: Snippet
tags: ['react', 'user-interface', 'react-slick', 'chakra-ui']
hero: carousel-card.png
status: 'published'
---

```tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import Slick, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings: Settings = {
  dots: true,
  infinite: true,
  centerMode: true,
  slidesToShow: 3,
  autoplay: true,
  speed: 500,
  cssEase: 'ease-out',
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export const SlickArticles: React.FC = ({ articles }) => (
  <Slick {...settings}>
    {articles.map((a) => (
      <Box key={a.slug} p={[2, 4]}>
        <ArticleCard article={a} />
      </Box>
    ))}
  </Slick>
);
```

**[react-slick](https://react-slick.neostack.com/)** ライブラリを使えば達成できる。

- **responsive** オプションで、タブレットビューやスマホビューにも対応できる。max-width タイプの指定になるので、Chakra で慣れている場合は逆指定になることに注意
- **autoplay** と **infinite** で自動スクロール
- **centerMode** を指定すると、左右にカードの一部が表示されるため、無限にあるように見えやすくなる。カードの枚数は slidesToShow で指定
- エレメントに padding はつかないため、自分でつけてから渡す（ここでは Box
  でラップしている）
- エレメントの高さにあった height に自動的になるが、dots ぶんの高さは確保されないので、margin-bottom などで調整する

### references

- react-slick: https://react-slick.neostack.com/
