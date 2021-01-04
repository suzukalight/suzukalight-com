import React from 'react';
import { GetStaticProps } from 'next';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

import { DefaultLayout } from '../components/templates/DefaultLayout';
import { HtmlHead } from '../components/atoms/HtmlHead';
import { Hero } from '../components/molecules/Hero';
import { CenterMaxW } from '../components/atoms/CenterMaxW';
import { ArticleTipList } from '../components/molecules/ArticleTipList';

import {
  urlBlogRoot,
  urlContentsBlog,
  urlBlogPosts,
  urlSnippetRoot,
  urlSnippetPosts,
  urlContentsSnippet,
} from './url.json';
import { Article } from '../utils/article/entity';
import { getArticles } from '../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../utils/article/sorter';
import { Link } from '../components/atoms/Link';

type HomePageProps = {
  blogArticles: Article[];
  snippetArticles: Article[];
};

export const HomePage: React.FC<HomePageProps> = ({ blogArticles, snippetArticles }) => {
  return (
    <DefaultLayout>
      <HtmlHead />

      <Hero
        title="suzukalight.com"
        subtitle={`"なければ作ればいいじゃない"`}
        image="images/hero/01.jpg"
      />

      <Box backgroundColor="gray.50" minH="16em" px={[0, 8, 16, 24]}>
        <CenterMaxW maxWidth="60em">
          <VStack spacing={8} align="left">
            <Heading as="h1" fontSize="3xl">
              <Text as="span" mr={4}>
                Blog
              </Text>
            </Heading>

            <Box>
              {blogArticles.length > 0 ? (
                <ArticleTipList
                  articles={blogArticles}
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
              <Link to={urlBlogRoot}>
                <Text textDecoration="underline">すべてのBlogを見る→</Text>
              </Link>
            </Box>
          </VStack>
        </CenterMaxW>
      </Box>

      <Box minH="16em" px={[0, 8, 16, 24]}>
        <CenterMaxW maxWidth="60em">
          <VStack spacing={8} align="left">
            <Heading as="h1" fontSize="3xl">
              Snippet
            </Heading>

            <Box>
              {snippetArticles.length > 0 ? (
                <ArticleTipList
                  articles={snippetArticles}
                  urlBlogPosts={urlSnippetPosts}
                  urlContentsBlog={urlContentsSnippet}
                />
              ) : (
                <Text as="small" color="gray.600">
                  関連する記事は見つかりませんでした
                </Text>
              )}
            </Box>

            <Box>
              <Link to={urlSnippetRoot}>
                <Text textDecoration="underline">すべてのSnippetを見る→</Text>
              </Link>
            </Box>
          </VStack>
        </CenterMaxW>
      </Box>
    </DefaultLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const snippetArticles = await getArticles(urlContentsSnippet);
  const snippetArticlesSorted = sortArticlesByDateDesc(snippetArticles).slice(0, 6);

  const blogArticles = await getArticles(urlContentsBlog);
  const blogArticlesSorted = sortArticlesByDateDesc(blogArticles).slice(0, 6);

  return {
    props: {
      blogArticles: blogArticlesSorted,
      snippetArticles: snippetArticlesSorted,
    } as HomePageProps,
  };
};
