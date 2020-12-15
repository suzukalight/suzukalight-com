import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';

import { ArticleList } from '../../components/molecules/ArticleList';
import {
  ArticleData,
  getDirNamesThatHaveMdx,
  getMdxDataAndContent,
  getMdxSource,
} from '../../utils/article';

type IndexPageProps = {
  articles: ArticleData[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ articles }) => {
  const { pathname } = useRouter();
  const baseUrl = `${pathname}/posts`;

  return (
    <Box>
      <Head>
        <title>Blog - suzukalight.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box py={8}>
        <Box m="1em">
          <Box maxW="960px" mx="auto">
            <Heading as="h1" mb={8}>
              Blog
            </Heading>

            <Box mb={8}>
              <ArticleList articles={articles} baseUrl={baseUrl} />
            </Box>

            <Box mb={16}>
              <Link href="/">
                <ChakraLink>
                  <Text py={2}>← Back to Home</Text>
                </ChakraLink>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default IndexPage;

export async function getStaticProps() {
  const mdxDirs = getDirNamesThatHaveMdx();
  const articles = mdxDirs.map((slug) => {
    const source = getMdxSource(slug);
    const { data, content } = getMdxDataAndContent(source);

    return {
      slug,
      title: data.title,
      excerpt: content.substr(0, 128),
      date: data.date || null,
      image: data.hero || null,
      tags: data.tags || null,
    } as ArticleData;
  });

  return { props: { articles } };
}
