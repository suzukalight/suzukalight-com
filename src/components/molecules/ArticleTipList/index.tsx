import React from 'react';
import Link from 'next/link';
import { Box, Flex, Center, Img, Text, SimpleGrid, Link as ChakraLink } from '@chakra-ui/react';

import { Article, getDateFormatted } from '../../../utils/article/entity';

type ArticleTipProps = {
  article: Article;
  urlBlogPosts: string;
  urlContentsBlog: string;
};

export const ArticleTip: React.FC<ArticleTipProps> = ({
  article,
  urlBlogPosts,
  urlContentsBlog,
}) => {
  const slug = article.slug;
  const { title, hero, emoji } = article.frontMatter;

  return (
    <Link href={`${urlBlogPosts}/[slug]`} as={`${urlBlogPosts}/${slug}`}>
      <ChakraLink overflow="hidden" href={`${urlBlogPosts}/${slug}`}>
        <Flex direction="row" maxH={24} overflow="hidden">
          <Box flexShrink={0} mr={2}>
            {hero ? (
              <Img
                src={`${urlContentsBlog}/${slug}/${hero}`}
                alt={slug}
                boxSize={8}
                borderRadius={4}
                objectFit="cover"
              />
            ) : (
              <Center boxSize={8} borderRadius={4}>
                <Text fontSize="xl">{emoji ?? '📝'}</Text>
              </Center>
            )}
          </Box>

          <Flex flexGrow={1} direction="column">
            <Text
              as="strong"
              overflowY="hidden"
              maxH="2.5em"
              fontSize="md"
              lineHeight={1.25}
              wordBreak="break-all"
            >
              {title}
            </Text>

            <Flex flexGrow={1} direction="column" justifyContent="flex-end">
              <Text as="small" fontSize="xs" color="gray.700" opacity="0.8">
                {getDateFormatted(article)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </ChakraLink>
    </Link>
  );
};

type ArticleTipListProps = {
  articles: Article[];
  urlBlogPosts: string;
  urlContentsBlog: string;
};

export const ArticleTipList: React.FC<ArticleTipListProps> = ({
  articles,
  urlBlogPosts,
  urlContentsBlog,
}) => (
  <SimpleGrid columns={[1, 1, 2]} rowGap={[6, 6, 8]} columnGap={[8, 12, 16]}>
    {articles.map((article) => (
      <ArticleTip
        key={article.slug}
        article={article}
        urlBlogPosts={urlBlogPosts}
        urlContentsBlog={urlContentsBlog}
      />
    ))}
  </SimpleGrid>
);
