import React, { ReactNode } from 'react';
import { Box, Heading, Text, Stack, VStack, Img, Center } from '@chakra-ui/react';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { getContentsUrlWithSlug, mergeUrlAndSlug } from '../../../utils/path/url';

import { ArticleDetail } from '../ArticleDetail';
import { Link } from '../../atoms/Link';

type CourseItemProps = {
  course: Article;
  urlCourse: string;
  cta: ReactNode;
  hasTitleLink?: boolean;
};

export const CourseItem: React.FC<CourseItemProps> = ({ course, urlCourse, cta, hasTitleLink }) => {
  const { slug, excerpt, frontMatter } = course;
  const { title, hero, emoji } = frontMatter;
  const url = urlCourse ? mergeUrlAndSlug(course.slug, urlCourse) : null;
  const imageSrc = `${getContentsUrlWithSlug(slug, urlCourse)}/${hero}`;

  return (
    <Stack direction={['column', 'column', 'row-reverse']} spacing={[2, 2, 0]} w="100%">
      <Box flexShrink={0} w={['100%', '100%', 48]} ml={[0, 0, 8]}>
        {hero ? (
          <Img src={imageSrc} alt={slug} w="100%" h={48} objectFit="cover" borderRadius={12} />
        ) : (
          <Center>
            <Text fontSize="64px">{emoji ?? '📝'}</Text>
          </Center>
        )}
      </Box>

      <VStack flexGrow={1} spacing={2} align="left">
        <Box>
          {hasTitleLink ? (
            <Link to={url}>
              <Heading as="h1" fontSize="2xl" lineHeight={1.5}>
                {`"${title}"`}
              </Heading>
            </Link>
          ) : (
            <Heading as="h1" fontSize="2xl" lineHeight={1.5}>
              {`"${title}"`}
            </Heading>
          )}
        </Box>

        <Box>
          <ArticleDetail contentHtml={excerpt} />
        </Box>

        <Text fontSize="sm" color="gray.600" my={1}>
          {getDateFormatted(course)}
        </Text>

        <Box>{cta}</Box>
      </VStack>
    </Stack>
  );
};
