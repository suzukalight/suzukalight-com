import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { PrevNextButtons, PrevNextButtonsProps } from '../';
import { chapter2, chapter5 } from '../../../../../.storybook/__mocks/chapter';

import { mergeUrlAndSlug, UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/PrevNextButtons',
  component: PrevNextButtons,
} as Meta;

const Template: Story<PrevNextButtonsProps> = (args) => (
  <Box w="100%">
    <PrevNextButtons {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  urlCourse: mergeUrlAndSlug('clang', UrlTable.course),
  prevArticle: chapter2,
  nextArticle: chapter5,
} as PrevNextButtonsProps;

export const PrevOnly = Template.bind({});
PrevOnly.args = {
  urlCourse: mergeUrlAndSlug('clang', UrlTable.course),
  prevArticle: chapter2,
} as PrevNextButtonsProps;

export const NextOnly = Template.bind({});
NextOnly.args = {
  urlCourse: mergeUrlAndSlug('clang', UrlTable.course),
  nextArticle: chapter5,
} as PrevNextButtonsProps;

export const None = Template.bind({});
None.args = {
  urlCourse: mergeUrlAndSlug('clang', UrlTable.course),
} as PrevNextButtonsProps;
