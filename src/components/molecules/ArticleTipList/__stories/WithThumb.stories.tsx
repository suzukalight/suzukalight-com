import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleTipWithThumbList, ArticleTipWithThumbListProps } from '../WithThumb';
import { article1, article2, article3, article4 } from '../../../../../.storybook/__mocks/article';

import { UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/ArticleTipList/WithThumb',
  component: ArticleTipWithThumbList,
} as Meta;

const Template: Story<ArticleTipWithThumbListProps> = (args) => (
  <Box maxW="40em">
    <ArticleTipWithThumbList {...args} />
  </Box>
);

const args = {
  articles: [article1, article2, article3, article4],
  url: UrlTable.blogPosts,
};

export const Default = Template.bind({});
Default.args = {
  ...args,
} as ArticleTipWithThumbListProps;

export const One = Template.bind({});
One.args = {
  ...args,
  articles: [article1],
} as ArticleTipWithThumbListProps;
