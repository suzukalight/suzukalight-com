import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box, Icon, Image as ChakraImage } from '@chakra-ui/react';
import { FaCode } from '@react-icons/all-files/fa/FaCode';

import { CardCatalog, CardCatalogProps } from '../Catalog';

import image from './hakodate-night.jpg';

export default {
  title: 'atoms/Card/Catalog',
  component: CardCatalog,
} as Meta;

const Template: Story<CardCatalogProps> = (args) => (
  <Box w={64} h={64}>
    <CardCatalog {...args} />
  </Box>
);

export const Svg = Template.bind({});
Svg.args = {
  image: <Icon as={FaCode} boxSize={8} fill="teal.500" />,
  title: 'CardDefault',
  supplement: 'This is a supplement text.',
} as CardCatalogProps;

export const Image = Template.bind({});
Image.args = {
  image: <ChakraImage src={image} boxSize={64} objectFit="cover" />,
  title: 'CardImage',
  supplement:
    'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお',
} as CardCatalogProps;
