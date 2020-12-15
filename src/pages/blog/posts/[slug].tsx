import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { Heading, Box, Text, Link as ChakraLink } from '@chakra-ui/react';

import { ArticleFrontMatter, getMdxDataAndContent } from '../../../utils/article';
import { getDirNamesThatHaveMdx, getMdxSource } from '../../../utils/article-fs';

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from './slug.module.scss';

type BlogPostProps = {
  mdxSource: string;
  frontMatter: ArticleFrontMatter;
};

export const BlogPost: React.FC<BlogPostProps> = ({ mdxSource, frontMatter }) => {
  const content = hydrate(mdxSource);

  return (
    <Box>
      <Head>
        <title>{`${frontMatter.title} - suzukalight.com`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Box m="1em">
          <Box maxW="640px" mx="auto">
            <Heading as="h1" my="2em">
              {frontMatter.title}
            </Heading>

            <article className={styles.article}>{content}</article>

            <Box mb={16}>
              <Link href="/blog">
                <ChakraLink href="/blog">
                  <Text py={2}>← Back to Blog List</Text>
                </ChakraLink>
              </Link>
              <Link href="/">
                <ChakraLink href="/">
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

export default BlogPost;

export async function getStaticPaths() {
  const dirNamesThatHaveMdx = getDirNamesThatHaveMdx();
  const paths = dirNamesThatHaveMdx.map((dir) => ({ params: { slug: dir.replace(/\.mdx?/, '') } }));

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const source = getMdxSource(params.slug);
  const { data, content } = getMdxDataAndContent(source);
  const mdxSource = await renderToString(content);

  return { props: { mdxSource, frontMatter: data } };
}
