import React from 'react';
import { GetStaticProps } from 'next';
import { Box, Heading, Text, Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListItem } from '../../components/molecules/ArticleListItem';
import { DefaultLayout } from '../../components/templates/DefaultLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';

import { Article, ArticleDTO } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { urlContentsBlog, urlBlogPosts, urlBlogTags } from '../url.json';

type IndexPageProps = {
  articlesDTO: ArticleDTO[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ articlesDTO }) => (
  <DefaultLayout>
    <HtmlHead title="Blog" />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="50em" mx="auto">
          <Heading as="h1" mb={2}>
            Blog
          </Heading>
          <Text as="p" fontSize="md" color="gray.500" mb={12}>
            技術調査や素振り、競馬や一口馬主、ほかに旅行やゲームの話など。
          </Text>

          <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
            {articlesDTO
              .map((a) => Article.fromDTO(a))
              .map((article) => (
                <ArticleListItem
                  key={article.getSlug()}
                  article={article}
                  contentBaseUrl={`${urlContentsBlog}/${article.getSlug()}`}
                  tagBaseUrl={urlBlogTags}
                  postBaseUrl={urlBlogPosts}
                  showContentLink
                />
              ))}
          </VStack>

          <Divider mt={12} mb={8} />

          <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = getArticles(urlContentsBlog);
  return { props: { articlesDTO: sortArticlesByDateDesc(articles).map((a) => a.toDTO()) } };
};
