import React from 'react';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { Box, Button, Heading } from '@chakra-ui/react';
import Head from 'next/head';

import { MdxComponentProvider } from '../../../components/providers/MdxProvider';

const components = { Button };
const root = process.cwd();
const contentDir = 'src/contents/blog';

export default function BlogPost({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, { components });
  return (
    <MdxComponentProvider>
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

            {content}
          </Box>
        </Box>
      </Box>
    </MdxComponentProvider>
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
