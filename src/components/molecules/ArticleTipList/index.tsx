import React from 'react';
import Link from 'next/link';
import { Flex, Center, Img, Text, SimpleGrid, Link as ChakraLink } from '@chakra-ui/react';

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
          {hero ? (
            <Img
              src={`${urlContentsBlog}/${slug}/${hero}`}
              alt={slug}
              boxSize={8}
              borderRadius={4}
              flexShrink={0}
              mr={4}
              backgroundColor="gray.100"
              objectFit="cover"
            />
          ) : (
            <Center boxSize={8} borderRadius={4} flexShrink={0} mr={4}>
              <Text fontSize="xl">{emoji ?? '📝'}</Text>
            </Center>
          )}

          <Flex flexGrow={1} direction="column">
            <Text
              as="strong"
              fontSize="md"
              lineHeight={1.25}
              maxH="2.5em"
              overflowY="hidden"
              wordBreak="break-all"
            >
              {title}
            </Text>

            <Flex flexGrow={1} direction="column" justifyContent="flex-end" mt={1}>
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
  <SimpleGrid columns={[1, 1, 2]} rowGap={6} columnGap={[8, 12, 16]}>
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
