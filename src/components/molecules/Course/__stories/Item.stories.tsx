import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box, Text } from '@chakra-ui/react';

import { CourseItem, CourseItemProps } from '../Item';
import { Link } from '../../../atoms/Link';

import { course1 } from '../../../../../.storybook/__mocks/course';
import { mergeUrlAndSlug, UrlTable } from '../../../../utils/path/url';

export default {
  title: 'molecules/Course/CourseItem',
  component: CourseItem,
} as Meta;

const Template: Story<CourseItemProps> = (args) => (
  <Box w="50em" h={64}>
    <CourseItem {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  course: course1,
  urlCourse: UrlTable.course,
  cta: (
    <Link href={mergeUrlAndSlug(course1.slug, UrlTable.course)}>
      <Text fontSize="md" textDecoration="underline" _hover={{ color: 'teal.500' }}>
        コースの概要を確認する→
      </Text>
    </Link>
  ),
} as CourseItemProps;
