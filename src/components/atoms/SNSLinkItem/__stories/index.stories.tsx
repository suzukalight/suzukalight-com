import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { SNSLinkItem, SNSLinkItemProps } from '../';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';

export default {
  title: 'atoms/SNSLinkItem',
  component: SNSLinkItem,
} as Meta;

const Template: Story<SNSLinkItemProps> = (args) => (
  <Box w={128} h={64} pl={16} pt={16}>
    <SNSLinkItem {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  url: 'https://twitter.com/intent/tweet?screen_name=suzukalight',
  label: '@suzukalight にメッセージを送る',
  icon: FaTwitter,
  boxSize: 6,
  color: 'gray.800',
  ariaLabel: 'Twitter で @suzukalight にメッセージを送る',
} as SNSLinkItemProps;

export const Small = Template.bind({});
Small.args = {
  url: 'https://www.facebook.com/masahiko.kubara/',
  label: 'masahiko.kubara',
  icon: FaFacebookF,
  boxSize: 3,
  color: 'blue.500',
  colorHover: 'blue.200',
  ariaLabel: 'Facebook',
  placement: 'bottom',
} as SNSLinkItemProps;
