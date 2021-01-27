import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleCardWithLink, ArticleCardWithLinkProps } from '../WithLink';
import { article3, article4 } from '../../../../../.storybook/__mocks/article';

import { UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/ArticleCardWithLink',
  component: ArticleCardWithLink,
} as Meta;

const Template: Story<ArticleCardWithLinkProps> = (args) => (
  <Box w={64} h={64}>
    <ArticleCardWithLink {...args} />
  </Box>
);

export const Image = Template.bind({});
Image.args = {
  article: article3,
  urlContent: UrlTable.blog,
  urlPosts: UrlTable.blogPosts,
} as ArticleCardWithLinkProps;

export const Emoji = Template.bind({});
Emoji.args = {
  article: article4,
  urlContent: UrlTable.blog,
  urlPosts: UrlTable.blogPosts,
} as ArticleCardWithLinkProps;
