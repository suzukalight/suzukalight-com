import React from 'react';
import { Heading, Box, Text, VStack } from '@chakra-ui/react';

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
    <Box>
      <Heading as="h1" fontSize="xl" mb={8}>
        Tags
      </Heading>

      <Box>
        <TagList
          tags={tags}
          tagBaseUrl={urlBlogTags}
          tagItemProps={{ ...getDefaultTagStyle(), fontSize: 'md', mr: 2 }}
        />
      </Box>
    </Box>

    <Box>
      <Heading as="h1" fontSize="xl" mb={8}>
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
    </Box>

    <Box>
      <Heading as="h1" fontSize="xl" mb={8}>
        Prev/Next Article
      </Heading>

      <ArticleTipList
        articles={[prevArticle, nextArticle].filter((a) => a)}
        urlBlogPosts={urlBlogPosts}
        urlContentsBlog={urlContentsBlog}
      />
    </Box>
  </VStack>
);
