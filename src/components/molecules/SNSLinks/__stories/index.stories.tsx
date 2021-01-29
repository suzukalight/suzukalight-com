import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { SNSLinks, SNSLinksProps } from '../';

export default {
  title: 'molecules/SNSLinks',
  component: SNSLinks,
} as Meta;

const Template: Story<SNSLinksProps> = (args) => (
  <Box w="100%" p={16}>
    <SNSLinks {...args} />
  </Box>
);

export const AboutMePhoto = Template.bind({});
AboutMePhoto.args = {
  spacing: 3,
  boxSize: 4,
  color: 'gray.800',
} as SNSLinksProps;

export const Footer = Template.bind({});
Footer.args = {
  spacing: 3,
  boxSize: 3,
  color: 'gray.500',
} as SNSLinksProps;

export const Hero = Template.bind({});
Hero.args = {
  spacing: 3,
  boxSize: 6,
} as SNSLinksProps;
