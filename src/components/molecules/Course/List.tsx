import React from 'react';
import { VStack, StackDivider, Text } from '@chakra-ui/react';

import { CourseItem } from './Item';
import { Link } from '../../atoms/Link';

import { Article } from '../../../utils/article/entity';
import { mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';

export type CourseListProps = {
  courses: Article[];
};

export const CourseList: React.FC<CourseListProps> = ({ courses }) =>
  !courses?.length ? null : (
    <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
      {courses.map((a) => (
        <CourseItem
          key={a.slug}
          course={a}
          urlCourse={UrlTable.course}
          cta={
            <Link href={mergeUrlAndSlug(a.slug, UrlTable.course)}>
              <Text fontSize="md" textDecoration="underline" _hover={{ color: 'teal.500' }}>
                コースの概要を確認する→
              </Text>
            </Link>
          }
          hasLink
        />
      ))}
    </VStack>
  );
