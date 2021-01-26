import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { Logo, LogoProps } from '..';

export default {
  title: 'atoms/Logo',
  component: Logo,
} as Meta;

const Template: Story<LogoProps> = (args) => (
  <Box maxW="40em">
    <Logo {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  imageSrc: 'images/tarako.jpg',
  name: 'suzukalight',
} as LogoProps;

export const WithSupplement = Template.bind({});
WithSupplement.args = {
  imageSrc: 'images/masahiko_kubara.jpg',
  name: 'suzukalight',
  supplement: 'Masahiko KUBARA',
} as LogoProps;
