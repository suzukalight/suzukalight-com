import React from 'react';
import { ChakraProps, Text } from '@chakra-ui/react';

type TagItemProps = {
  tag: string;
  chakraProps?: ChakraProps;
};

export const Tag: React.FC<TagItemProps> = ({ tag, chakraProps }) => (
  <Text as="span" {...chakraProps}>{`#${tag}`}</Text>
);
