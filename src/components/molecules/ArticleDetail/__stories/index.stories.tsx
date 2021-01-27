import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ArticleDetail, ArticleDetailProps } from '..';

import '../../../../styles/remark.scss';
import '../../../../styles/prism.scss';

import contentSource from '../../../../../.storybook/__mocks/contentSource';
import { hydrate } from '../../../../utils/article/markdown';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/ArticleDetail',
  component: ArticleDetail,
} as Meta;

const Template: Story<ArticleDetailProps> = (args) => {
  const slug = '2021-01-19-storybook-nextjs-chakraui';
  const content = hydrate(contentSource, {
    components: {},
    baseImageUrl: getContentsUrlWithSlug(slug, UrlTable.blog),
    baseHref: `${UrlTable.blogPosts}/[slug]`,
    baseAs: mergeUrlAndSlug(slug, UrlTable.blogPosts),
  });

  return (
    <Box maxW="40em">
      <ArticleDetail {...args} content={content} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  // content: contentHydrated,
} as ArticleDetailProps;
