import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleHeader, ArticleHeaderProps } from '..';
import { article1, article4 } from '../../../../../.storybook/__mocks/article';

import { UrlTable } from '../../../../utils/path/url';
import { Article } from '../../../../utils/article/entity';

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
  article: { ...article1 } as Article,
  urlRoot: UrlTable.blog,
  urlTags: UrlTable.blogTags,
};

export const Default = Template.bind({});
Default.args = {
  ...args,
  article: {
    ...args.article,
    frontMatter: {
      ...args.article.frontMatter,
      hero: undefined,
      emoji: undefined,
    },
  },
} as ArticleHeaderProps;

export const Image = Template.bind({});
Image.args = {
  ...args,
  article: {
    ...args.article,
    frontMatter: {
      ...args.article.frontMatter,
      emoji: undefined,
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
      hero: undefined,
      emoji: '👍',
    },
  },
} as ArticleHeaderProps;

export const TooLong = Template.bind({});
TooLong.args = {
  ...args,
  article: {
    ...article4,
    frontMatter: {
      ...article4.frontMatter,
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
    },
  },
} as ArticleHeaderProps;
