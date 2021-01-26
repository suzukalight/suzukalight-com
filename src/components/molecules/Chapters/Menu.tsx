import React from 'react';
import { Heading, VStack, ListItem, UnorderedList, Text } from '@chakra-ui/react';

import { Article } from '../../../utils/article/entity';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';

import { Link } from '../../atoms/Link';
import { NextImageOrEmoji } from '../../atoms/NextImage/ImageOrEmoji';

type ChapterMenuProps = {
  course: Article;
  chapters: Article[];
  selectedChapter: Article;
};

export const ChapterMenu: React.FC<ChapterMenuProps> = ({ course, chapters, selectedChapter }) => {
  const { hero, emoji } = course.frontMatter;
  const urlCourse = mergeUrlAndSlug(course.slug, UrlTable.course);
  const courseHeroUrl = `${getContentsUrlWithSlug(course.slug, UrlTable.course)}/${hero}`;

  return (
    <VStack spacing={4} align="left">
      <NextImageOrEmoji
        src={courseHeroUrl}
        emoji={emoji}
        fontSize="48px"
        width="13em"
        height="4em"
        objectFit="cover"
      />

      <Link href={urlCourse}>
        <Heading as="h1" fontSize="md">
          {course.frontMatter.title}
        </Heading>
      </Link>

      <UnorderedList listStyleType="none" spacing={1}>
        {chapters.map((c) => {
          const url = mergeUrlAndSlug(c.slug, urlCourse);
          const match = c.slug === selectedChapter.slug;

          return (
            <ListItem
              key={c.frontMatter.title}
              borderRadius={4}
              color={match ? 'gray.800' : 'gray.400'}
              backgroundColor={match ? 'gray.100' : 'inherit'}
              _hover={{
                textDecoration: 'underline',
                color: 'gray.800',
                backgroundColor: match ? 'gray.200' : 'gray.50',
              }}
            >
              <Link href={url}>
                <Text fontSize="sm" fontWeight="600" p={2}>
                  {c.frontMatter.title}
                </Text>
              </Link>
            </ListItem>
          );
        })}
      </UnorderedList>
    </VStack>
  );
};
