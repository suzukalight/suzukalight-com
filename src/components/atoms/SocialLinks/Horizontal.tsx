import React from 'react';
import { HStack } from '@chakra-ui/react';

import { SocialLinks } from './NormalList';

type SocialLinksHorizontalProps = {
  urlBlog: string;
  title: string;
};

export const SocialLinksHorizontal: React.FC<SocialLinksHorizontalProps> = ({ title, urlBlog }) => (
  <HStack spacing={4}>
    <SocialLinks urlBlog={urlBlog} title={title} />
  </HStack>
);
