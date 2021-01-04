import React, { useState } from 'react';
import { VStack, SlideFade, Box } from '@chakra-ui/react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { SocialLinks } from './NormalList';

type SocialLinksLeftFixedProps = {
  urlBlog: string;
  title: string;
};

export const SocialLinksLeftFixed: React.FC<SocialLinksLeftFixedProps> = ({ title, urlBlog }) => {
  const [showSocialLinks, setShowSocialLinks] = useState(true);

  useScrollPosition(({ prevPos, currPos }) => {
    const visible = currPos.y > prevPos.y;
    setShowSocialLinks(visible);
  }, []);

  return (
    <Box
      position="fixed"
      left="calc(50vw - 28em)"
      top="7em"
      visibility={['hidden', 'hidden', 'hidden', 'visible']}
    >
      <SlideFade in={showSocialLinks} offsetX="-1em" offsetY={0}>
        <VStack spacing={4} p={4} backgroundColor="gray.50" borderRadius={8}>
          <SocialLinks urlBlog={urlBlog} title={title} />
        </VStack>
      </SlideFade>
    </Box>
  );
};
