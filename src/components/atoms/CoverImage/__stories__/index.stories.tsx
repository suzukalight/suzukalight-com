import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { CoverImage, CoverImageProps } from '..';

export default {
  title: 'atoms/CoverImage',
  component: CoverImage,
} as Meta;

const Template: Story<CoverImageProps> = (args) => (
  <Box maxW="40em">
    <CoverImage {...args} />
  </Box>
);

export const Image = Template.bind({});
Image.args = {
  imageSrc: 'images/hakodate-night.jpg',
} as CoverImageProps;

export const Emoji = Template.bind({});
Emoji.args = {
  emoji: '👍',
} as CoverImageProps;

export const Null = Template.bind({});
Null.args = {} as CoverImageProps;
