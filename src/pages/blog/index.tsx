import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Box, Heading, ListItem, UnorderedList, Text, Link as ChakraLink } from '@chakra-ui/react';

const root = process.cwd();
const contentDir = 'contents/blog';
const baseUrl = '/blog/posts';

export default function IndexPage({ postData }) {
  return (
    <Box>
      <Head>
        <title>Blog - suzukalight.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box py={8}>
        <Box m="1em">
          <Box maxW="640px" mx="auto">
            <Heading as="h1" mb={8}>
              Blog
            </Heading>

            <UnorderedList mb={8}>
              {postData.map((data) => (
                <ListItem key={data.slug} py={2}>
                  <Link href={`${baseUrl}/[slug]`} as={`${baseUrl}/${data.slug}`}>
                    <ChakraLink>{data.frontMatter.title}</ChakraLink>
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>

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
  const postData = fs.readdirSync(contentRoot).map((p) => {
    const content = fs.readFileSync(path.join(contentRoot, p), 'utf8');
    return {
      slug: p.replace(/\.mdx/, ''),
      content,
      frontMatter: matter(content).data,
    };
  });
  return { props: { postData } };
}
