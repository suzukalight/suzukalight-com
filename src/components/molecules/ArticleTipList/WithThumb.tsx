import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Center, Text, SimpleGrid, Link as ChakraLink } from '@chakra-ui/react';

import styles from './WithThumb.module.scss';

import { TagListPlainText } from '../TagList';

import { Article } from '../../../utils/article/entity';
import { getContentsUrl, stripPosts } from '../../../utils/path/url';

export type ArticleTipWithThumbProps = {
  article: Article;
  url: string;
};

export const ArticleTipWithThumb: React.FC<ArticleTipWithThumbProps> = ({ article, url }) => {
  const slug = article.slug;
  const { title, hero, emoji, tags } = article.frontMatter;

  return (
    <Link href={`${url}/[slug]`} as={`${url}/${slug}`}>
      <ChakraLink overflow="hidden" href={`${url}/${slug}`}>
        <Flex direction="row" minH={10} maxH={24} overflow="hidden">
          <Box flexShrink={0} mt={1} mr={4}>
            {hero ? (
              <Flex position="relative" justifyContent="center" alignItems="center">
                <Image
                  src={`${getContentsUrl(stripPosts(url))}/${slug}/${hero}`}
                  alt={slug}
                  width={32}
                  height={32}
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
              </Flex>
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

export type ArticleTipWithThumbListProps = {
  articles: Article[];
  url: string;
};

export const ArticleTipWithThumbList: React.FC<ArticleTipWithThumbListProps> = ({
  articles,
  url,
}) => (
  <SimpleGrid columns={[1, 1, 2]} rowGap={[6, 6, 8]} columnGap={[8, 12, 16]}>
    {articles.map((article) => (
      <ArticleTipWithThumb key={article.slug} article={article} url={url} />
    ))}
  </SimpleGrid>
);
