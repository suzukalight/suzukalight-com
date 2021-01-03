import React from 'react';
import Link from 'next/link';
import { Flex, Box, Center, Img, Text, SimpleGrid, Link as ChakraLink } from '@chakra-ui/react';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { getInlineTextTagStyle, TagList } from '../TagList';

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
  const { title, tags, hero, emoji } = article.frontMatter;

  return (
    <Link href={`${urlBlogPosts}/[slug]`} as={`${urlBlogPosts}/${slug}`}>
      <ChakraLink overflow="hidden" href={`${urlBlogPosts}/${slug}`}>
        <Flex direction="row" maxH={24} overflow="hidden">
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
              <Box maxH="1.25em" overflow="hidden" lineHeight="1.25" wordBreak="break-all">
                <TagList
                  tags={tags}
                  tagItemProps={{
                    ...getInlineTextTagStyle(),
                    fontSize: 'xs',
                    mb: 0,
                    _hover: { textDecoration: 'inherit' },
                  }}
                />
              </Box>

              <Text as="small" fontSize="xs" color="gray.700" opacity="0.8">
                {getDateFormatted(article)}
              </Text>
            </Flex>
          </Flex>

          {hero ? (
            <Img
              src={`${urlContentsBlog}/${slug}/${hero}`}
              alt={slug}
              boxSize={20}
              borderRadius={8}
              flexShrink={0}
              ml={6}
              backgroundColor="gray.100"
              objectFit="cover"
            />
          ) : (
            <Center boxSize={20} borderRadius={8} flexShrink={0} ml={6} backgroundColor="gray.100">
              <Text fontSize="3xl">{emoji ?? '✏️'}</Text>
            </Center>
          )}
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
  <SimpleGrid columns={[1, 1, 1, 2]} rowGap={[6, 6, 8]} columnGap={[12, 12, 16]}>
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
