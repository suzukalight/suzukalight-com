import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { getContentsUrlWithSlug, mergeUrlAndSlug } from '../../../utils/path/url';

import { TagListPlainText } from '../TagList/PlainText';
import { CoverImage } from '../../atoms/CoverImage';

export type ArticleHeaderProps = {
  article: Article;
  urlRoot: string;
  urlTags?: string;
  course?: Article;
};

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  urlRoot,
  urlTags,
  course,
}) => {
  const { slug } = article;
  const { title, tags, hero, emoji } = article.frontMatter;
  const imageSrc = course
    ? `${getContentsUrlWithSlug(slug, mergeUrlAndSlug(course.slug, urlRoot))}/${hero}`
    : `${getContentsUrlWithSlug(slug, urlRoot)}/${hero}`;

  return (
    <VStack spacing={8} align="left" w="100%">
      <CoverImage imageSrc={hero ? imageSrc : null} emoji={emoji} />

      <VStack spacing={2} align="left">
        <Heading as="h1" fontSize={['2xl', '2xl', '3xl']}>
          {title}
        </Heading>

        <TagListPlainText tags={tags} tagBaseUrl={urlTags} />

        <Text fontSize="sm" color="gray.600">
          {getDateFormatted(article)}
        </Text>
      </VStack>
    </VStack>
  );
};
