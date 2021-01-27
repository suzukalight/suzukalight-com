import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleUnorderedList, ArticleUnorderedListProps } from '..';
import { article1, article2, article3, article4 } from '../../../../../.storybook/__mocks/article';

import { UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/ArticleUnorderedList',
  component: ArticleUnorderedList,
} as Meta;

const Template: Story<ArticleUnorderedListProps> = (args) => (
  <Box maxW="40em">
    <ArticleUnorderedList {...args} />
  </Box>
);

const args = {
  articles: [article1, article2, article3, article4],
  urlPosts: UrlTable.blogPosts,
} as ArticleUnorderedListProps;

export const Default = Template.bind({});
Default.args = {
  ...args,
} as ArticleUnorderedListProps;
