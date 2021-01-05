import React from 'react';
import { HStack } from '@chakra-ui/react';

import { ShareButtons } from './Buttons';

type ShareButtonsHorizontalProps = {
  urlBlog: string;
  title: string;
};

export const ShareButtonsHorizontal: React.FC<ShareButtonsHorizontalProps> = ({
  title,
  urlBlog,
}) => (
  <HStack spacing={4}>
    <ShareButtons urlBlog={urlBlog} title={title} tooltipPlacement="top" />
  </HStack>
);
