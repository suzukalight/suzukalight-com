import React, { ReactNode } from 'react';
import { Box, Heading, Text, Stack, VStack } from '@chakra-ui/react';

import styles from './Item.module.scss';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { getContentsUrlWithSlug, mergeUrlAndSlug } from '../../../utils/path/url';

import { ArticleDetail } from '../ArticleDetail';
import { Link } from '../../atoms/Link';
import { NextImageOrEmoji } from '../../atoms/NextImage/ImageOrEmoji';

export type CourseItemProps = {
  course: Article;
  urlCourse: string;
  cta: ReactNode;
  hasLink?: boolean;
};

export const CourseItem: React.FC<CourseItemProps> = ({ course, urlCourse, cta, hasLink }) => {
  const { slug, excerpt, frontMatter } = course;
  const { title, hero, emoji } = frontMatter;
  const url = urlCourse ? mergeUrlAndSlug(course.slug, urlCourse) : null;
  const imageSrc = `${getContentsUrlWithSlug(slug, urlCourse)}/${hero}`;

  return (
    <Stack direction={['column', 'column', 'row-reverse']} spacing={[2, 2, 0]} w="100%">
      <Box flexShrink={0} w={['100%', '100%', 48]} ml={[0, 0, 8]}>
        {hasLink ? (
          <Link href={url}>
            <NextImageOrEmoji
              className={styles.image}
              src={imageSrc}
              emoji={emoji}
              alt={slug}
              height="12em"
              fontSize="64px"
            />
          </Link>
        ) : (
          <NextImageOrEmoji
            className={styles.image}
            src={imageSrc}
            emoji={emoji}
            alt={slug}
            height="12em"
            fontSize="64px"
          />
        )}
      </Box>

      <VStack flexGrow={1} spacing={2} align="left">
        <Box>
          {hasLink ? (
            <Link href={url}>
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
          <ArticleDetail content={excerpt} />
        </Box>

        <Text fontSize="sm" color="gray.600" my={1}>
          {getDateFormatted(course)}
        </Text>

        <Box>{cta}</Box>
      </VStack>
    </Stack>
  );
};
