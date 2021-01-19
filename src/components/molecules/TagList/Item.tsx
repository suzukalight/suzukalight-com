import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';

type TagItemProps = {
  tag: string;
  chakraProps?: TextProps;
};

export const Tag: React.FC<TagItemProps> = ({ tag, chakraProps }) => (
  <Text as="span" {...chakraProps}>{`#${tag}`}</Text>
);
