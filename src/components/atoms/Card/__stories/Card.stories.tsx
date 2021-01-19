import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box, Icon, Image } from '@chakra-ui/react';
import { FaCode } from 'react-icons/fa';

import { Card, CardProps } from '../Card';

import image from './hakodate-night.jpg';

export default {
  title: 'atoms/Card/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => (
  <Box w={64} h={64}>
    <Card {...args} />
  </Box>
);

export const CardDefault = Template.bind({});
CardDefault.args = {
  image: <Icon as={FaCode} boxSize={8} fill="teal.500" />,
  title: 'CardDefault',
  supplement: 'This is a supplement text.',
} as CardProps;

export const CardImage = Template.bind({});
CardImage.args = {
  image: <Image src={image} />,
  title: 'CardImage',
  supplement: 'This is a supplement text.',
} as CardProps;
