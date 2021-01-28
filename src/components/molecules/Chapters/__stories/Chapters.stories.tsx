import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { Chapters, ChaptersProps } from '../Chapters';
import { chapter2, chapter3, chapter5, chapter6 } from '../../../../../.storybook/__mocks/chapter';

import { mergeUrlAndSlug, UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/Chapters/Chapters',
  component: Chapters,
} as Meta;

const Template: Story<ChaptersProps> = (args) => (
  <Box w="100%" h={64}>
    <Chapters {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  chapters: [chapter2, chapter3, chapter5, chapter6],
  urlCourse: mergeUrlAndSlug('clang', UrlTable.course),
} as ChaptersProps;

export const Empty = Template.bind({});
Empty.args = {
  chapters: [],
  urlCourse: mergeUrlAndSlug('clang', UrlTable.course),
} as ChaptersProps;
