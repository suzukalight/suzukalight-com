import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleHeader, ArticleHeaderProps } from '..';
import { UrlTable } from '../../../../utils/path/url';
import { Article, ArticleFrontMatter } from '../../../../utils/article/entity';

export default {
  title: 'molecules/ArticleHeader',
  component: ArticleHeader,
} as Meta;

const Template: Story<ArticleHeaderProps> = (args) => (
  <Box maxW="40em">
    <ArticleHeader {...args} />
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
};

export const Default = Template.bind({});
Default.args = {
  ...args,
} as ArticleHeaderProps;

export const Image = Template.bind({});
Image.args = {
  ...args,
  article: {
    ...args.article,
    frontMatter: {
      ...args.article.frontMatter,
      hero: 'horse.jpg',
    },
  },
} as ArticleHeaderProps;

export const Emoji = Template.bind({});
Emoji.args = {
  ...args,
  article: {
    ...args.article,
    frontMatter: {
      ...args.article.frontMatter,
      emoji: '👍',
    },
  },
} as ArticleHeaderProps;

export const TooLong = Template.bind({});
TooLong.args = {
  ...args,
  article: {
    ...args.article,
    frontMatter: {
      ...args.article.frontMatter,
      title:
        'とても長いタイトルとても長いタイトルとても長いタイトルとても長いタイトルとても長いタイトルとても長いタイトルとても長いタイトルとても長いタイトルとても長いタイトルとても長いタイトル',
      tags: [
        'tag-no11',
        'tag-no12',
        'tag-no13',
        'tag-no14',
        'tag-no15',
        'tag-no16',
        'tag-no17',
        'tag-no18',
        'tag-no19',
        'tag-no20',
      ],
      hero: 'horse.jpg',
    },
  },
} as ArticleHeaderProps;
