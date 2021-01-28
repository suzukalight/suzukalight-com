import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { ChapterMenu, ChapterMenuProps } from '../Menu';
import { course1 } from '../../../../../.storybook/__mocks/course';
import { chapter2, chapter3, chapter5, chapter6 } from '../../../../../.storybook/__mocks/chapter';

export default {
  title: 'molecules/Chapters/ChapterMenu',
  component: ChapterMenu,
} as Meta;

const Template: Story<ChapterMenuProps> = (args) => (
  <Box w={48} h={64}>
    <ChapterMenu {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  course: course1,
  chapters: [chapter2, chapter3, chapter5, chapter6],
  selectedChapter: chapter3,
} as ChapterMenuProps;

export const NotSelected = Template.bind({});
NotSelected.args = {
  course: course1,
  chapters: [chapter2, chapter3, chapter5, chapter6],
  selectedChapter: null,
} as ChapterMenuProps;

export const Empty = Template.bind({});
Empty.args = {
  course: course1,
  chapters: [],
  selectedChapter: null,
} as ChapterMenuProps;
