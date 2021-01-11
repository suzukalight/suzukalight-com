import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { getContentsUrlWithSlug, mergeUrlAndSlug } from '../../../utils/path/url';

import { TagListPlainText } from '../TagList/PlainText';
import { CoverImage } from '../../atoms/CoverImage';

type ArticleHeaderProps = {
  article: Article;
  urlRoot: string;
  urlTags?: string;
  textbook?: Article;
};

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  urlRoot,
  urlTags,
  textbook,
}) => {
  const { slug } = article;
  const { title, tags, hero, emoji } = article.frontMatter;
  const imageSrc = textbook
    ? `${getContentsUrlWithSlug(slug, mergeUrlAndSlug(textbook.slug, urlRoot))}/${hero}`
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
