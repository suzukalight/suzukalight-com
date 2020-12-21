import React from 'react';
import { GetStaticProps } from 'next';
import { Box, Heading, Divider, Flex, Text } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleList } from '../../components/molecules/ArticleList';
import DefaultLayout from '../../components/templates/DefaultLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';
import { Link } from '../../components/atoms/Link';

import { Article, ArticleDTO, blogContentsUrl, blogRootUrl } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/file-system';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';

type IndexPageProps = {
  articles: ArticleDTO[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ articles }) => (
  <DefaultLayout backgroundColor="gray.50">
    <HtmlHead title="Blog" />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="64em" mx="auto">
          <Heading as="h1" mb={2}>
            Blog
          </Heading>

          <Flex mb={8}>
            <Box flexShrink={0}>
              <Link to="/blog/tags">
                <Text as="span">タグから探す →</Text>
              </Link>
            </Box>
          </Flex>

          <Box mb={8}>
            <ArticleList
              articles={articles.map((dto) => Article.fromDTO(dto))}
              blogRootUrl={blogRootUrl}
              blogContentsUrl={blogContentsUrl}
            />
          </Box>

          <Divider mt={12} mb={8} />

          <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = getArticles();
  return { props: { articles: sortArticlesByDateDesc(articles).map((a) => a.toDTO()) } };
};
