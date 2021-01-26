import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box, Icon } from '@chakra-ui/react';
import { FaCode } from '@react-icons/all-files/fa/FaCode';

import { Card, CardProps } from '../Card';
import { NextImageOrEmoji } from '../../NextImage';

export default {
  title: 'atoms/Card/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => (
  <Box w={64} h={64}>
    <Card {...args} />
  </Box>
);

export const Svg = Template.bind({});
Svg.args = {
  image: <Icon as={FaCode} boxSize={8} fill="teal.500" />,
  title: 'CardDefault',
  supplement: 'This is a supplement text.',
} as CardProps;

export const Image = Template.bind({});
Image.args = {
  image: <NextImageOrEmoji src="images/hakodate-night.jpg" width="100%" height="8em" />,
  title: 'CardImage',
  supplement: 'This is a supplement text.',
} as CardProps;
