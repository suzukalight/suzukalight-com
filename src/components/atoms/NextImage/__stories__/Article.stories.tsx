import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { NextImageArticle, NextImageArticleProps } from '../Article';

export default {
  title: 'atoms/NextImage/Article',
  component: NextImageArticle,
} as Meta;

const Template: Story<NextImageArticleProps> = (args) => (
  <Box maxW="40em">
    <NextImageArticle {...args} />
  </Box>
);

export const Image = Template.bind({});
Image.args = {
  src: 'images/hakodate-night.jpg',
} as NextImageArticleProps;

export const Small = Template.bind({});
Small.args = {
  src: 'images/tarako.jpg',
} as NextImageArticleProps;
