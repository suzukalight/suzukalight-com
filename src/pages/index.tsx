import React from 'react';
import { GetStaticProps } from 'next';
import { Box, Heading, Text } from '@chakra-ui/react';

import DefaultLayout from '../components/templates/DefaultLayout';
import { HtmlHead } from '../components/atoms/HtmlHead';
import { Hero } from '../components/molecules/Hero';
import { CenterMaxW } from '../components/atoms/CenterMaxW';
import { ArticleTipList } from '../components/molecules/ArticleTipList';

import {
  urlBlogRoot,
  urlContentsBlog,
  urlBlogPosts,
  urlKnowledgeRoot,
  urlKnowledgePosts,
  urlContentsKnowledge,
} from './url.json';
import { Article } from '../utils/article/entity';
import { getArticles } from '../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../utils/article/sorter';
import { Link } from '../components/atoms/Link';

type HomePageProps = {
  blogArticles: Article[];
  knowledgeArticles: Article[];
};

export const HomePage: React.FC<HomePageProps> = ({ blogArticles, knowledgeArticles }) => {
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
          <Heading as="h1" fontSize="3xl" mb={8}>
            <Text as="span" mr={4}>
              Blog
            </Text>
          </Heading>
          <Box mb={6}>
            {blogArticles.length > 0 ? (
              <ArticleTipList
                articles={blogArticles}
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
            <Link to={urlBlogRoot}>
              <Text textDecoration="underline">すべてのBlogを見る→</Text>
            </Link>
          </Box>
        </CenterMaxW>
      </Box>

      <Box minH="16em" px={[0, 8, 16, 24]}>
        <CenterMaxW maxWidth="60em">
          <Heading as="h1" fontSize="3xl" mb={8}>
            Knowledge
          </Heading>
          <Box mb={6}>
            {knowledgeArticles.length > 0 ? (
              <ArticleTipList
                articles={knowledgeArticles}
                urlBlogPosts={urlKnowledgePosts}
                urlContentsBlog={urlContentsKnowledge}
              />
            ) : (
              <Text as="small" color="gray.500">
                関連する記事は見つかりませんでした
              </Text>
            )}
          </Box>
          <Box>
            <Link to={urlKnowledgeRoot}>
              <Text textDecoration="underline">すべてのKnowledgeを見る→</Text>
            </Link>
          </Box>
        </CenterMaxW>
      </Box>
    </DefaultLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const knowledgeArticles = await getArticles(urlContentsKnowledge);
  const knowledgeArticlesSorted = sortArticlesByDateDesc(knowledgeArticles).slice(0, 6);

  const blogArticles = await getArticles(urlContentsBlog);
  const blogArticlesSorted = sortArticlesByDateDesc(blogArticles).slice(0, 6);

  return {
    props: {
      blogArticles: blogArticlesSorted,
      knowledgeArticles: knowledgeArticlesSorted,
    } as HomePageProps,
  };
};
