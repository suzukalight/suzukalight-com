import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleExcerptItem, ArticleExcerptItemProps } from '..';
import { UrlTable } from '../../../../utils/path/url';
import { Article, ArticleFrontMatter } from '../../../../utils/article/entity';

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
  article: {
    slug: 'new-blog',
    excerpt:
      'キャロットクラブの新規会員募集ページから、フォームに必要事項を記入して申し込みます。　1週間かからずに、申込書とカタログが届きました。オラワクワクすっぞ！',
    frontMatter: {
      title: '新しいブログ',
      date: '2019-09-06T00:02:00',
      status: 'published',
      tags: ['new-blog', 'blog'],
    } as ArticleFrontMatter,
  } as Article,
  urlRoot: '',
  urlTags: UrlTable.blogTags,
  urlPosts: UrlTable.blogPosts,
  contentSource,
};

export const Default = Template.bind({});
Default.args = {
  ...args,
} as ArticleExcerptItemProps;
