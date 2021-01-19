import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { CTAButton, CTAButtonProps } from '../';

export default {
  title: 'atoms/CTAButton',
  component: CTAButton,
} as Meta;

const Template: Story<CTAButtonProps> = (args) => (
  <Box w={128} h={64}>
    <CTAButton {...args} />
  </Box>
);

export const CTAButtonDefault = Template.bind({});
CTAButtonDefault.args = {
  label: 'コースをはじめる',
  href: '/course/title',
} as CTAButtonProps;
