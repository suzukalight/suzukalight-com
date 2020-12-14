import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import { ArticleList } from '../../components/molecules/ArticleList';

const root = process.cwd();
const contentDir = 'contents/blog';
const baseUrl = '/blog/posts';

export default function IndexPage({ articles }) {
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
}

export async function getStaticProps() {
  const contentRoot = path.join(root, contentDir);
  const articles = fs.readdirSync(contentRoot).map((p) => {
    const source = fs.readFileSync(path.join(contentRoot, p), 'utf8');
    const { data, content } = matter(source);

    return {
      slug: p.replace(/\.mdx/, ''),
      title: data.title,
      excerpt: content.substr(0, 128),
      date: data.date || null,
      image: data.hero || null,
      tags: data.tags || null,
    };
  });

  return { props: { articles } };
}
