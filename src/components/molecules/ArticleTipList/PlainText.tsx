import React from 'react';
import Link from 'next/link';
import { Flex, Text, SimpleGrid, Link as ChakraLink, VStack } from '@chakra-ui/react';

import { TagListPlainText } from '../TagList';

import { Article, getDateFormatted } from '../../../utils/article/entity';

type ArticleTipPlainTextProps = {
  article: Article;
  urlBlogPosts: string;
};

export const ArticleTipPlainText: React.FC<ArticleTipPlainTextProps> = ({
  article,
  urlBlogPosts,
}) => {
  const slug = article.slug;
  const { title, tags } = article.frontMatter;

  return (
    <Link href={`${urlBlogPosts}/[slug]`} as={`${urlBlogPosts}/${slug}`}>
      <ChakraLink overflow="hidden" href={`${urlBlogPosts}/${slug}`}>
        <Flex direction="row" minH={10} maxH={24} overflow="hidden">
          <Flex flexGrow={1} direction="column">
            <Text
              as="p"
              overflowY="hidden"
              maxH="2.5em"
              mb={1}
              fontSize="md"
              fontWeight="600"
              lineHeight={1.25}
              wordBreak="break-all"
              color="gray.600"
            >
              {title}
            </Text>

            <VStack spacing={0} align="left" flexGrow={1} overflow="hidden">
              <TagListPlainText
                tags={tags}
                tagWrapProps={{ mb: 0, maxH: 4, overflow: 'hidden' }}
                tagItemProps={{ fontSize: 'xs', color: 'gray.400', lineHeight: 1.25 }}
              />

              <Text as="small" fontSize="xs" color="gray.400">
                {getDateFormatted(article)}
              </Text>
            </VStack>
          </Flex>
        </Flex>
      </ChakraLink>
    </Link>
  );
};

type ArticleTipPlainTextListProps = {
  articles: Article[];
  urlBlogPosts: string;
};

export const ArticleTipPlainTextList: React.FC<ArticleTipPlainTextListProps> = ({
  articles,
  urlBlogPosts,
}) => (
  <SimpleGrid columns={[1, 1, 2, 3]} rowGap={[6, 6, 8]} columnGap={[8, 8, 12]}>
    {articles.map((article) => (
      <ArticleTipPlainText key={article.slug} article={article} urlBlogPosts={urlBlogPosts} />
    ))}
  </SimpleGrid>
);
