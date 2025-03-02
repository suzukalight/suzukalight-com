import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { WorksList, WorksListProps } from '..';
import { work1, work2, work3 } from '../../../../../.storybook/__mocks/work';

import { Article } from '../../../../utils/article/entity';

export default {
  title: 'molecules/WorksList',
  component: WorksList,
} as Meta;

const Template: Story<WorksListProps> = (args) => (
  <Box maxW="60em">
    <WorksList {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  works: [work1, work2, work3] as unknown[] as Article[],
} as WorksListProps;

export const One = Template.bind({});
One.args = {
  works: [work3] as unknown[] as Article[],
} as WorksListProps;

export const Empty = Template.bind({});
Empty.args = {
  works: [] as unknown[] as Article[],
} as WorksListProps;
