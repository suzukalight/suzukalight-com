import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';
import { FaHome } from '@react-icons/all-files/fa/FaHome';

import { BackLinks, BackLinksProps } from '../';

import { UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/BackLinks',
  component: BackLinks,
} as Meta;

const Template: Story<BackLinksProps> = (args) => (
  <Box w="100%" h={64}>
    <BackLinks {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  links: [
    {
      href: UrlTable.blogTags,
      label: 'タグ一覧に戻る',
    },
    {
      href: UrlTable.blog,
      label: 'ブログ一覧に戻る',
    },
    {
      href: UrlTable.home,
      label: 'ホームに戻る',
    },
  ],
} as BackLinksProps;

export const WithIcon = Template.bind({});
WithIcon.args = {
  links: [
    {
      href: UrlTable.home,
      label: 'ホームに戻る',
      icon: FaHome,
    },
  ],
} as BackLinksProps;
