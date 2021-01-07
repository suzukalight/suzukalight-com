import React from 'react';
import Link from 'next/link';
import { Box, Flex, Center, Img, Text, SimpleGrid, Link as ChakraLink } from '@chakra-ui/react';

import { TagListPlainText } from '../TagList';

import { Article } from '../../../utils/article/entity';

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
  const { title, hero, emoji, tags } = article.frontMatter;

  return (
    <Link href={`${urlBlogPosts}/[slug]`} as={`${urlBlogPosts}/${slug}`}>
      <ChakraLink overflow="hidden" href={`${urlBlogPosts}/${slug}`}>
        <Flex direction="row" minH={10} maxH={24} overflow="hidden">
          <Box flexShrink={0} mt={1} mr={4}>
            {hero ? (
              <Img
                src={`${urlContentsBlog}/${slug}/${hero}`}
                alt={slug}
                boxSize={8}
                borderRadius={4}
                objectFit="cover"
              />
            ) : (
              <Center boxSize={8}>
                <Text fontSize="28px">{emoji ?? '📝'}</Text>
              </Center>
            )}
          </Box>

          <Flex flexGrow={1} direction="column">
            <Text
              as="p"
              overflowY="hidden"
              maxH="2.5em"
              mb={1}
              fontSize="sm"
              fontWeight="600"
              lineHeight={1.25}
              // textDecoration="underline solid #22543D40"
              wordBreak="break-all"
              color="teal.800"
            >
              {title}
            </Text>

            <Flex flexGrow={1} maxH={4} overflow="hidden">
              <TagListPlainText
                tags={tags}
                tagWrapProps={{ mb: 0 }}
                tagItemProps={{ fontSize: 'xs', color: 'gray.400', lineHeight: 1.25 }}
              />
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
