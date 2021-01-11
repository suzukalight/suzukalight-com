import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';

import { ArticleTipWithThumbList } from '../../../components/molecules/ArticleTipList';
import { TagListRoundBox } from '../../../components/molecules/TagList';

import { Article } from '../../../utils/article/entity';

type RelatedArticlesProps = {
  tags: string[];
  relatedArticles: Article[];
  prevArticle: Article;
  nextArticle: Article;
  urlBlogPosts: string;
  urlBlogTags: string;
};

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  tags,
  relatedArticles,
  prevArticle,
  nextArticle,
  urlBlogPosts,
  urlBlogTags,
}) => (
  <VStack as="aside" spacing={16} align="stretch">
    <VStack spacing={4} align="left">
      <Heading as="h1" fontSize="xl">
        Tags
      </Heading>

      <TagListRoundBox tags={tags} tagBaseUrl={urlBlogTags} />
    </VStack>

    <VStack spacing={4} align="left">
      <Heading as="h1" fontSize="xl">
        Related Articles
      </Heading>

      {relatedArticles.length > 0 ? (
        <ArticleTipWithThumbList articles={relatedArticles} url={urlBlogPosts} />
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

      <ArticleTipWithThumbList
        articles={[prevArticle, nextArticle].filter((a) => a)}
        url={urlBlogPosts}
      />
    </VStack>
  </VStack>
);
