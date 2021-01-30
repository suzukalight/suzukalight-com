import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { TagListWithCount, TagListWithCountProps } from '../WithCount';

import { UrlTable } from '../../../../utils/path/url';
import { TagAndCount } from '../../../../utils/article/tag';

export default {
  title: 'molecules/TagList/WithCount',
  component: TagListWithCount,
} as Meta;

const Template: Story<TagListWithCountProps> = (args) => (
  <Box w="50em">
    <TagListWithCount {...args} />
  </Box>
);

const tagAndCounts: TagAndCount[] = [
  { tag: 'tag1', count: 16 },
  { tag: 'tag2', count: 8 },
  { tag: 'tag-long-name', count: 4 },
  { tag: '日本語', count: 2 },
  {
    tag: 'にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご',
    count: 1,
  },
];

export const Default = Template.bind({});
Default.args = {
  tagAndCounts,
  tagBaseUrl: UrlTable.blogTags,
} as TagListWithCountProps;

export const WithoutLink = Template.bind({});
WithoutLink.args = {
  tagAndCounts,
} as TagListWithCountProps;

export const Empty = Template.bind({});
Empty.args = {
  tagAndCounts: [],
  tagBaseUrl: UrlTable.blogTags,
} as TagListWithCountProps;
