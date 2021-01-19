import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ShareButtonsHorizontal, ShareButtonsHorizontalProps } from '../Horizontal';

export default {
  title: 'atoms/ShareButtonsHorizontal',
  component: ShareButtonsHorizontal,
} as Meta;

const Template: Story<ShareButtonsHorizontalProps> = (args) => (
  <Box w={128} h={64} pl={16} pt={16}>
    <ShareButtonsHorizontal {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  title: 'あたらしい記事',
  url: '/blog/item-01',
  indexUrl: 'https://example.com',
} as ShareButtonsHorizontalProps;

export const WithTwitterId = Template.bind({});
WithTwitterId.args = {
  title: 'あたらしい記事',
  url: '/blog/item-01',
  indexUrl: 'https://example.com',
  twitterId: 'suzukalight',
} as ShareButtonsHorizontalProps;

export const WithFill = Template.bind({});
WithFill.args = {
  title: 'あたらしい記事',
  url: '/blog/item-01',
  indexUrl: 'https://example.com',
  iconProps: { fill: 'blue.500', _hover: { fill: 'blue.200' } },
} as ShareButtonsHorizontalProps;
