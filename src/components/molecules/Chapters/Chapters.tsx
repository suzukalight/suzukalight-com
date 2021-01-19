import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';

import { Article } from '../../../utils/article/entity';
import { mergeUrlAndSlug } from '../../../utils/path/url';

import { ChapterNode } from './Node';
import { Link } from '../../atoms/Link';

type ChaptersProps = {
  urlCourse: string;
  chapters: Article[];
};

export const Chapters: React.FC<ChaptersProps> = ({ urlCourse, chapters }) => (
  <VStack spacing={8} align="left" p={4} pt={8} backgroundColor="gray.50" borderRadius={4}>
    <Heading as="h1" fontSize={['xl', 'xl', '2xl']} borderBottom="sm">
      Chapters
    </Heading>

    <Box>
      {chapters.map((c, index) => (
        <ChapterNode
          key={c.slug}
          title={<Link href={mergeUrlAndSlug(c.slug, urlCourse)}>{c.frontMatter.title}</Link>}
          left={`#${index + 1}`}
          isLast={index === chapters.length - 1}
        />
      ))}
    </Box>
  </VStack>
);
