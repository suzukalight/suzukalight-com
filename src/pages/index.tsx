import React, { useRef } from 'react';
import { GetStaticProps } from 'next';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

import { DefaultLayout } from '../components/templates/DefaultLayout';
import { HtmlHead } from '../components/atoms/HtmlHead';
import { Link } from '../components/atoms/Link';
import { Hero } from '../components/molecules/Hero';
import { CenterMaxW } from '../components/atoms/CenterMaxW';
import { SlickArticles } from '../components/organisms/SlickArticles';
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
import { getArticle, getArticles } from '../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../utils/article/sorter';

type HomePageProps = {
  pickupArticles: Article[];
  blogArticles: Article[];
  snippetArticles: Article[];
};

export const HomePage: React.FC<HomePageProps> = ({
  pickupArticles,
  blogArticles,
  snippetArticles,
}) => {
  const refBlog = useRef<HTMLDivElement>();

  return (
    <DefaultLayout>
      <HtmlHead />

      <Hero
        title="suzukalight.com"
        subtitle={`"なければ作ればいいじゃない"`}
        image="images/hero/01.webp"
        refBlog={refBlog}
      />

      <Box backgroundColor="gray.50" minH="16em" px={[0, 8, 16, 24]} ref={refBlog}>
        <CenterMaxW maxWidth="60em">
          <VStack spacing={8} align="left">
            <Heading as="h1" fontSize="3xl">
              <Text as="span">Blog</Text>
            </Heading>

            <Box mb={8}>
              <Heading as="h2" fontSize="xl">
                <Text as="span">Pickup Articles</Text>
              </Heading>

              <SlickArticles
                articles={pickupArticles}
                urlContents={urlContentsBlog}
                urlPosts={urlBlogPosts}
              />
            </Box>

            <Box>
              <Heading as="h2" mb={4} fontSize="xl">
                <Text as="span">Recent Articles</Text>
              </Heading>

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
                <Text align="right" textDecoration="underline" _hover={{ color: 'teal.500' }}>
                  すべてのBlogを見る→
                </Text>
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
                <Text align="right" textDecoration="underline" _hover={{ color: 'teal.500' }}>
                  すべてのSnippetを見る→
                </Text>
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

  const pickupArticles = await Promise.all(
    [
      '2020-12-31-2020-reflection',
      '2020-12-30-react-tech-stack',
      '2019-09-09-react-i18next',
      '2019-09-06-join-carrot-club',
      '2019-02-05-to-release-smartphone-app',
      '2018-12-08-frontend-technology-selection',
    ].map(async (slug) => await getArticle(slug, urlContentsBlog)),
  );

  return {
    props: {
      pickupArticles,
      blogArticles: blogArticlesSorted,
      snippetArticles: snippetArticlesSorted,
    } as HomePageProps,
  };
};
