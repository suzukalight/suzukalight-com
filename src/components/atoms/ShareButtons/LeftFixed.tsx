import React, { useState } from 'react';
import { VStack, SlideFade, Box } from '@chakra-ui/react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { ShareButtons } from './Buttons';

type ShareButtonsLeftFixedProps = {
  url: string;
  title: string;
  indexUrl: string;
  twitterId?: string;
};

export const ShareButtonsLeftFixed: React.FC<ShareButtonsLeftFixedProps> = ({
  title,
  url,
  indexUrl,
  twitterId,
}) => {
  const [showShareButtons, setShowShareButtons] = useState(true);

  useScrollPosition(({ prevPos, currPos }) => {
    const visible = currPos.y > prevPos.y;
    setShowShareButtons(visible);
  }, []);

  return (
    <Box
      position="fixed"
      left="calc(50vw - 28em)"
      top="7em"
      visibility={['hidden', 'hidden', 'hidden', 'visible']}
    >
      <SlideFade in={showShareButtons} offsetX="-1em" offsetY={0}>
        <VStack spacing={4} p={4} backgroundColor="gray.50" borderRadius={8}>
          <ShareButtons
            url={url}
            title={title}
            tooltipPlacement="left"
            indexUrl={indexUrl}
            twitterId={twitterId}
          />
        </VStack>
      </SlideFade>
    </Box>
  );
};
