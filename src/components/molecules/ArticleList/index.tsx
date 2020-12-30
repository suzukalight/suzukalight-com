import React from 'react';
import Link from 'next/link';
import {
  Flex,
  Box,
  Center,
  Icon,
  Img,
  Text,
  SimpleGrid,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaPen } from 'react-icons/fa';

import { Article } from '../../../utils/article/entity';

type ArticleCardProps = {
  article: Article;
  urlBlogPosts: string;
  urlContentsBlog: string;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  urlBlogPosts,
  urlContentsBlog,
}) => {
  const slug = article.getSlug();
  const { title, tags, hero, emoji } = article.getFrontMatter();

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
                {(tags || []).map((tag) => (
                  <Text
                    as="small"
                    key={tag}
                    mr={2}
                    color="gray.700"
                    fontSize="xs"
                  >{`#${tag}`}</Text>
                ))}
              </Box>
              <Text as="small" fontSize="xs" color="gray.700" opacity="0.8">
                {article.getDateFormatted()}
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
              {emoji ? (
                <Text fontSize="3xl">{emoji}</Text>
              ) : (
                <Icon as={FaPen} boxSize={8} color="gray.500" />
              )}
            </Center>
          )}
        </Flex>
      </ChakraLink>
    </Link>
  );
};

type ArticleListProps = {
  articles: Article[];
  urlBlogPosts: string;
  urlContentsBlog: string;
};

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  urlBlogPosts,
  urlContentsBlog,
}) => (
  <SimpleGrid columns={[1, 1, 1, 2]} rowGap={[6, 6, 8]} columnGap={[12, 12, 16]}>
    {articles.map((article) => (
      <ArticleCard
        key={article.getSlug()}
        article={article}
        urlBlogPosts={urlBlogPosts}
        urlContentsBlog={urlContentsBlog}
      />
    ))}
  </SimpleGrid>
);
