import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { TagListPlainText, TagListPlainTextProps } from '../PlainText';

import { UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/TagList/PlainText',
  component: TagListPlainText,
} as Meta;

const Template: Story<TagListPlainTextProps> = (args) => (
  <Box w={64}>
    <TagListPlainText {...args} />
  </Box>
);

const tags = [
  'tag1',
  'tag2',
  'tag-long-name',
  '日本語',
  'にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご',
];

export const ArticleCard = Template.bind({});
ArticleCard.args = {
  tags,
  tagWrapProps: { spacing: 0 },
  tagItemProps: { mr: 2, fontSize: 'sm' },
} as TagListPlainTextProps;

export const ArticleTipPlainText = Template.bind({});
ArticleTipPlainText.args = {
  tags,
  tagWrapProps: { mb: 0, maxH: 4, overflow: 'hidden' },
  tagItemProps: { fontSize: 'xs', color: 'gray.400', lineHeight: 1.25 },
} as TagListPlainTextProps;

export const ArticleTipWithThumb = Template.bind({});
ArticleTipWithThumb.args = {
  tags,
  tagWrapProps: { mb: 0 },
  tagItemProps: { fontSize: 'xs', color: 'gray.400', lineHeight: 1.25 },
} as TagListPlainTextProps;

export const WithLink = Template.bind({});
WithLink.args = {
  tags,
  tagBaseUrl: UrlTable.blogTags,
  tagWrapProps: { spacing: 0 },
  tagItemProps: { mr: 2, fontSize: 'sm' },
} as TagListPlainTextProps;

export const Empty = Template.bind({});
Empty.args = {
  tags: [],
} as TagListPlainTextProps;
