import React from 'react';
import { HStack } from '@chakra-ui/react';

import { ShareButtons } from './Buttons';

type ShareButtonsHorizontalProps = {
  url: string;
  title: string;
};

export const ShareButtonsHorizontal: React.FC<ShareButtonsHorizontalProps> = ({ title, url }) => (
  <HStack spacing={4}>
    <ShareButtons url={url} title={title} tooltipPlacement="top" />
  </HStack>
);
