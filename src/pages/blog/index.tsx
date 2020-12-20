import React from 'react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleList } from '../../components/molecules/ArticleList';
import {
  ArticleData,
  blogContentsUrl,
  blogRootUrl,
  getMdxDataAndContent,
  sortArticlesByDateDesc,
} from '../../utils/article';
import { getDirNamesThatHaveMdx, getMdxSource } from '../../utils/article-fs';
import DefaultLayout from '../../components/templates/DefaultLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';

type IndexPageProps = {
  articles: ArticleData[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ articles }) => (
  <DefaultLayout backgroundColor="gray.50">
    <HtmlHead title="Blog" />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="64em" mx="auto">
          <Heading as="h1" mb={8}>
            Blog
          </Heading>

          <Box mb={8}>
            <ArticleList
              articles={articles}
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

export async function getStaticProps() {
  const mdxDirs = getDirNamesThatHaveMdx();
  const articles = mdxDirs.map((slug) => {
    const source = getMdxSource(slug);
    const { data, content } = getMdxDataAndContent(source);

    return {
      slug,
      excerpt: content.substr(0, 128),
      ...data,
    } as ArticleData;
  });

  return { props: { articles: sortArticlesByDateDesc(articles) } };
}
