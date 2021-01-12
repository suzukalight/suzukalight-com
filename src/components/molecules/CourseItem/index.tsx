import React from 'react';
import { Box, Heading, Text, Stack, VStack, Img, Center } from '@chakra-ui/react';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { getContentsUrlWithSlug, mergeUrlAndSlug } from '../../../utils/path/url';

import { ArticleDetail } from '../ArticleDetail';
import { Link } from '../../atoms/Link';

type CourseItemProps = {
  course: Article;
  urlCourse: string;
};

export const CourseItem: React.FC<CourseItemProps> = ({ course, urlCourse }) => {
  const { slug, excerpt, frontMatter } = course;
  const { title, hero, emoji } = frontMatter;
  const url = mergeUrlAndSlug(course.slug, urlCourse);
  const imageSrc = `${getContentsUrlWithSlug(slug, urlCourse)}/${hero}`;

  return (
    <VStack spacing={4} align="left">
      <Box>
        <Link to={url}>
          <Heading as="h1" fontSize="2xl" lineHeight={1.5}>
            {title}
          </Heading>
        </Link>
      </Box>

      <Stack direction={['column', 'column', 'row']} spacing={[2, 2, 8]} w="100%">
        <Box flexShrink={0} w={['100%', '100%', 48]}>
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
            <ArticleDetail contentHtml={excerpt} />
          </Box>

          <Text fontSize="sm" color="gray.600" my={1}>
            {getDateFormatted(course)}
          </Text>

          <Box>
            <Link to={url}>
              <Text fontSize="md" textDecoration="underline" _hover={{ color: 'teal.500' }}>
                コースを読む→
              </Text>
            </Link>
          </Box>
        </VStack>
      </Stack>
    </VStack>
  );
};
