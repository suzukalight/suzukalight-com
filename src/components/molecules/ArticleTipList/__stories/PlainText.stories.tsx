import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleTipPlainTextList, ArticleTipPlainTextListProps } from '../PlainText';
import { article1, article2, article3, article4 } from '../../../../../.storybook/__mocks/article';

import { UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/ArticleTipList/PlainText',
  component: ArticleTipPlainTextList,
} as Meta;

const Template: Story<ArticleTipPlainTextListProps> = (args) => (
  <Box maxW="40em">
    <ArticleTipPlainTextList {...args} />
  </Box>
);

const args = {
  articles: [article1, article2, article3, article4],
  url: UrlTable.blogPosts,
};

export const Default = Template.bind({});
Default.args = {
  ...args,
} as ArticleTipPlainTextListProps;

export const One = Template.bind({});
One.args = {
  ...args,
  articles: [article1],
} as ArticleTipPlainTextListProps;
