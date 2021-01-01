import React from 'react';
import { Heading, Box, Text, VStack } from '@chakra-ui/react';

import { ArticleTipList } from '../../../components/molecules/ArticleTipList';
import { getDefaultTagStyle, TagList } from '../../../components/molecules/TagList';

import { Article, ArticleDTO } from '../../../utils/article/entity';

type RelatedArticlesProps = {
  tags: string[];
  relatedArticlesDTO: ArticleDTO[];
  prevArticleDTO: ArticleDTO;
  nextArticleDTO: ArticleDTO;
  urlContentsBlog: string;
  urlBlogPosts: string;
  urlBlogTags: string;
};

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  tags,
  relatedArticlesDTO,
  prevArticleDTO,
  nextArticleDTO,
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

      {relatedArticlesDTO.length > 0 ? (
        <ArticleTipList
          articles={relatedArticlesDTO.map((r) => Article.fromDTO(r))}
          urlBlogPosts={urlBlogPosts}
          urlContentsBlog={urlContentsBlog}
        />
      ) : (
        <Text as="small" color="gray.500">
          関連する記事は見つかりませんでした
        </Text>
      )}
    </Box>

    <Box>
      <Heading as="h1" fontSize="xl" mb={8}>
        Prev/Next Article
      </Heading>

      <ArticleTipList
        articles={[
          prevArticleDTO && Article.fromDTO(prevArticleDTO),
          nextArticleDTO && Article.fromDTO(nextArticleDTO),
        ].filter((a) => a)}
        urlBlogPosts={urlBlogPosts}
        urlContentsBlog={urlContentsBlog}
      />
    </Box>
  </VStack>
);
