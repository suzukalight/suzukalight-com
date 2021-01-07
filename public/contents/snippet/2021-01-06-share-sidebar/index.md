---
title: SNSシェアボタンを上スクロール時のみフェードインさせる
date: '2021-01-06T01:00:00'
category: Snippet
tags: ['react', 'UI', 'chakra-ui', 'react-share', 'react-icons']
hero: share-sidebar.png
status: 'published'
---

```tsx
import React, { useState } from 'react';
import { VStack, SlideFade, Box, Icon, Placement, Tooltip } from '@chakra-ui/react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { TwitterShareButton } from 'react-share';
import { FaTwitter } from 'react-icons/fa';

import { SITE_URL, TWITTER_ID } from '../../../utils/env';

type ShareButtonsLeftFixedProps = {
  urlBlog: string;
  title: string;
};

export const ShareButtonsLeftFixed: React.FC<ShareButtonsLeftFixedProps> = ({ title, urlBlog }) => {
  const [showShareButtons, setShowShareButtons] = useState(true);

  useScrollPosition(({ prevPos, currPos }) => {
    const visible = currPos.y > prevPos.y;
    setShowShareButtons(visible);
  }, []);

  const url = new URL(urlBlog, SITE_URL).toString();

  return (
    <Box
      position="fixed"
      left="calc(50vw - 28em)"
      top="7em"
      visibility={['hidden', 'hidden', 'hidden', 'visible']}
    >
      <SlideFade in={showShareButtons} offsetX="-1em" offsetY={0}>
        <VStack spacing={4} p={4} backgroundColor="gray.50" borderRadius={8}>
          <TwitterShareButton url={url} title={title} via={TWITTER_ID}>
            <Tooltip
              label="Twitterでシェア"
              shouldWrapChildren
              hasArrow
              placement={tooltipPlacement}
            >
              <Icon as={FaTwitter} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
            </Tooltip>
          </TwitterShareButton>

          {/* 以下のボタンは省略 */}
        </VStack>
      </SlideFade>
    </Box>
  );
};
```

- 上スクロールを検知するには **[use-scroll-position](https://github.com/n8tb1t/use-scroll-position)** を利用する
- スライドアニメーションのために Chakra-UI の **[SlideFade](https://chakra-ui.com/docs/components/transitions#slide-fade-transition)** を利用する
- タップすると何が起こるのかを提示するために Chakra-UI の **[Tooltip](https://chakra-ui.com/docs/overlay/tooltip)** を利用する

### references

- @n8tb1t/use-scroll-position: https://github.com/n8tb1t/use-scroll-position
- SlideFade: https://chakra-ui.com/docs/components/transitions#slide-fade-transition
- Tooltip: https://chakra-ui.com/docs/overlay/tooltip
