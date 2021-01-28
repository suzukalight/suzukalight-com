import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/react';

import { CourseList, CourseListProps } from '../List';

import { course1 } from '../../../../../.storybook/__mocks/course';

export default {
  title: 'molecules/Course/CourseList',
  component: CourseList,
} as Meta;

const Template: Story<CourseListProps> = (args) => (
  <Box w="50em" h={64}>
    <CourseList {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  courses: [course1, course1, course1],
} as CourseListProps;
