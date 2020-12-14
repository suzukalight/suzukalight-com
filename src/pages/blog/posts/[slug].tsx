import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { Heading, Box, Text, Link as ChakraLink } from '@chakra-ui/react';

import styles from './slug.module.scss';

const root = process.cwd();
const contentDir = 'contents/blog';

export default function BlogPost({ mdxSource, frontMatter }) {
  // NOTE: markdownのHTMLにCSSを直接あてることにする
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
                <ChakraLink>
                  <Text py={2}>← Back to Blog List</Text>
                </ChakraLink>
              </Link>
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
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: fs
      .readdirSync(path.join(root, contentDir))
      .map((p) => ({ params: { slug: p.replace(/\.mdx/, '') } })),
  };
}

export async function getStaticProps({ params }) {
  const source = fs.readFileSync(path.join(root, contentDir, `${params.slug}.mdx`), 'utf8');
  const { data, content } = matter(source);
  const mdxSource = await renderToString(content);
  return { props: { mdxSource, frontMatter: data } };
}
