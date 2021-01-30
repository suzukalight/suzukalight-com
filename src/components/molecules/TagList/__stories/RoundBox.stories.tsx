import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { TagListRoundBox, TagListRoundBoxProps } from '../RoundBox';

import { UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/TagList/RoundBox',
  component: TagListRoundBox,
} as Meta;

const Template: Story<TagListRoundBoxProps> = (args) => (
  <Box w="100%">
    <TagListRoundBox {...args} />
  </Box>
);

const TemplateShortWidth: Story<TagListRoundBoxProps> = (args) => (
  <Box w={32}>
    <TagListRoundBox {...args} />
  </Box>
);

const tags = [
  'tag1',
  'tag2',
  'tag-long-name',
  '日本語',
  'にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご',
];

export const Default = Template.bind({});
Default.args = {
  tags,
  tagBaseUrl: UrlTable.blogTags,
} as TagListRoundBoxProps;

export const WithoutLink = Template.bind({});
WithoutLink.args = {
  tags,
} as TagListRoundBoxProps;

export const ShortWidth = TemplateShortWidth.bind({});
ShortWidth.args = {
  tags,
  tagBaseUrl: UrlTable.blogTags,
} as TagListRoundBoxProps;

export const Empty = Template.bind({});
Empty.args = {
  tags: [],
  tagBaseUrl: UrlTable.blogTags,
} as TagListRoundBoxProps;
