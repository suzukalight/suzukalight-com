---
title: SNSシェアボタンの作成
date: '2021-01-05T01:00:00'
category: Snippet
tags: ['react', 'UI', 'chakra-ui', 'react-share', 'react-icons']
status: 'published'
---

```tsx
import React from 'react';
import { Icon, Placement, Tooltip } from '@chakra-ui/react';
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton,
} from 'react-share';
import { FaFacebook, FaGetPocket, FaLine, FaTwitter } from 'react-icons/fa';
import { SiHatenabookmark } from 'react-icons/si';

import { SITE_URL, TWITTER_ID } from '../../../utils/env';

type ShareButtonsProps = {
  urlBlog: string;
  title: string;
  tooltipPlacement: Placement;
};

export const ShareButtons: React.FC<ShareButtonsProps> = ({ urlBlog, title, tooltipPlacement }) => {
  const url = new URL(urlBlog, SITE_URL).toString();

  return (
    <>
      <TwitterShareButton url={url} title={title} via={TWITTER_ID}>
        <Icon as={FaTwitter} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <Icon as={FaFacebook} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
      </FacebookShareButton>
      <LineShareButton title={title} url={url}>
        <Icon as={FaLine} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
      </LineShareButton>
      <PocketShareButton title={title} url={url}>
        <Icon as={FaGetPocket} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
      </PocketShareButton>
      <HatenaShareButton title={title} url={url}>
        <Icon as={SiHatenabookmark} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
      </HatenaShareButton>
    </>
  );
};
```

**[react-share](https://github.com/nygardk/react-share)** ライブラリを使用する。外部スクリプトの読み込みや、テンプレート文字列の流し込みなど、必要な操作はすべて対応してくれる。

各業者のアイコンについては、今回はトーンを揃えたかったので **[react-icons](https://react-icons.github.io/react-icons)** の FontAwesome や Simple を利用した。react-share 自身にも各種アイコンは入っているので、それを利用しても OK。

```tsx
import { FacebookIcon } from 'react-share'; // react-share の組み込み
import { FaFacebook } from 'react-icons/fa'; // react-icons を使う場合

<Icon as={FaTwitter} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />;
```

### references

- react-share: https://github.com/nygardk/react-share
- react-share demo: http://nygardk.github.io/react-share/
- react-icons: https://react-icons.github.io/react-icons
