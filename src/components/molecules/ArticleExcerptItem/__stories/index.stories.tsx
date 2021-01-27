import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleExcerptItem, ArticleExcerptItemProps } from '..';
import { article1 } from '../../../../../.storybook/__mocks/article';

import { UrlTable } from '../../../../utils/path/url';
import { Article } from '../../../../utils/article/entity';

import contentSource from '../../../../../.storybook/__mocks/contentSource';

export default {
  title: 'molecules/ArticleExcerptItem',
  component: ArticleExcerptItem,
} as Meta;

const Template: Story<ArticleExcerptItemProps> = (args) => (
  <Box maxW="40em">
    <ArticleExcerptItem {...args} />
  </Box>
);

const args = {
  article: { ...article1 } as Article,
  urlRoot: '',
  urlTags: UrlTable.blogTags,
  urlPosts: UrlTable.blogPosts,
  contentSource,
};

export const Default = Template.bind({});
Default.args = {
  ...args,
} as ArticleExcerptItemProps;
