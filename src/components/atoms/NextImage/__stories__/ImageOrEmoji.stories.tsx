import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { NextImageOrEmoji, NextImageOrEmojiProps } from '../ImageOrEmoji';

export default {
  title: 'atoms/NextImage/ImageOrEmoji',
  component: NextImageOrEmoji,
} as Meta;

const Template: Story<NextImageOrEmojiProps> = (args) => (
  <Box maxW="40em">
    <NextImageOrEmoji {...args} />
  </Box>
);

export const Image = Template.bind({});
Image.args = {
  src: 'images/hakodate-night.jpg',
} as NextImageOrEmojiProps;

export const ImageContain = Template.bind({});
ImageContain.args = {
  src: 'images/hakodate-night.jpg',
  objectFit: 'contain',
} as NextImageOrEmojiProps;

export const Emoji = Template.bind({});
Emoji.args = {
  emoji: '👍',
} as NextImageOrEmojiProps;

export const SmallEmoji = Template.bind({});
SmallEmoji.args = {
  emoji: '👍',
  fontSize: '32px',
} as NextImageOrEmojiProps;
