import React from 'react';
import { Heading, Text, VStack, HStack } from '@chakra-ui/react';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { getInlineTextTagStyle, TagList } from '../../../components/molecules/TagList';
import { CoverImage } from '../../../components/atoms/CoverImage';

type ArticleHeaderProps = {
  article: Article;
  urlContent: string;
  urlTags: string;
};

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, urlContent, urlTags }) => {
  const { slug } = article;
  const { title, tags, hero, emoji } = article.frontMatter;
  const contentBaseUrl = `${urlContent}/${slug}`;

  return (
    <VStack spacing={8} align="left" w="100%">
      <CoverImage hero={hero} emoji={emoji} contentBaseUrl={contentBaseUrl} />

      <VStack spacing={2} align="left">
        <Heading as="h1" fontSize={['2xl', '2xl', '3xl']}>
          {title}
        </Heading>

        <HStack wrap="wrap">
          <TagList tags={tags} tagBaseUrl={urlTags} tagItemProps={getInlineTextTagStyle()} />
        </HStack>

        <Text fontSize="sm" color="gray.600">
          {getDateFormatted(article)}
        </Text>
      </VStack>
    </VStack>
  );
};