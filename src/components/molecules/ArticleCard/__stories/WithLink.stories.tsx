import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleCardWithLink, ArticleCardWithLinkProps } from '../WithLink';
import { getContentsUrlWithSlug, UrlTable } from '../../../../utils/path/url';
import { Article } from '../../../../utils/article/entity';

export default {
  title: 'molecules/ArticleCardWithLink',
  component: ArticleCardWithLink,
} as Meta;

const Template: Story<ArticleCardWithLinkProps> = (args) => (
  <Box w={64} h={64}>
    <ArticleCardWithLink {...args} />
  </Box>
);

const article = {
  slug: 'new-blog',
  frontMatter: {
    title: '新しいブログ新しいブログ新しいブログ新しいブログ新しいブログ新しいブログ新しいブログ',
    tags: ['new-blog', 'blog', 'blog-test'],
  },
} as Article;

export const Default = Template.bind({});
Default.args = {
  article,
  urlContents: getContentsUrlWithSlug(article.slug, UrlTable.blogPosts),
  urlPosts: UrlTable.blogPosts,
} as ArticleCardWithLinkProps;

export const Image = Template.bind({});
Image.args = {
  article: { ...article, frontMatter: { ...article.frontMatter, hero: './horse.jpg' } },
  urlContents: 'contents',
  urlPosts: UrlTable.blogPosts,
} as ArticleCardWithLinkProps;
