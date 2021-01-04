import React from 'react';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';

import { ArticleTipList } from '../../../components/molecules/ArticleTipList';
import { getDefaultTagStyle, TagList } from '../../../components/molecules/TagList';

import { Article } from '../../../utils/article/entity';

type RelatedArticlesProps = {
  tags: string[];
  relatedArticles: Article[];
  prevArticle: Article;
  nextArticle: Article;
  urlContentsBlog: string;
  urlBlogPosts: string;
  urlBlogTags: string;
};

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  tags,
  relatedArticles,
  prevArticle,
  nextArticle,
  urlContentsBlog,
  urlBlogPosts,
  urlBlogTags,
}) => (
  <VStack as="aside" spacing={16} align="stretch">
    <VStack spacing={4} align="left">
      <Heading as="h1" fontSize="xl">
        Tags
      </Heading>

      <HStack wrap="wrap">
        <TagList
          tags={tags}
          tagBaseUrl={urlBlogTags}
          tagItemProps={{ ...getDefaultTagStyle(), fontSize: 'md', mr: 2 }}
        />
      </HStack>
    </VStack>

    <VStack spacing={4} align="left">
      <Heading as="h1" fontSize="xl">
        Related Articles
      </Heading>

      {relatedArticles.length > 0 ? (
        <ArticleTipList
          articles={relatedArticles}
          urlBlogPosts={urlBlogPosts}
          urlContentsBlog={urlContentsBlog}
        />
      ) : (
        <Text as="small" color="gray.600">
          関連する記事は見つかりませんでした
        </Text>
      )}
    </VStack>

    <VStack spacing={4} align="left">
      <Heading as="h1" fontSize="xl">
        Prev/Next Article
      </Heading>

      <ArticleTipList
        articles={[prevArticle, nextArticle].filter((a) => a)}
        urlBlogPosts={urlBlogPosts}
        urlContentsBlog={urlContentsBlog}
      />
    </VStack>
  </VStack>
);
