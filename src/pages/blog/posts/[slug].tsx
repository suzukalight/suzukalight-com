/* eslint-disable react/display-name */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { Heading, Box, Text, Link as ChakraLink } from '@chakra-ui/react';

import {
  ArticleFrontMatter,
  blogContentsUrl,
  getArticleDate,
  getMdxDataAndContent,
} from '../../../utils/article';
import { getDirNamesThatHaveMdx, getMdxSource } from '../../../utils/article-fs';
import DefaultLayout from '../../../components/templates/DefaultLayout';

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from './slug.module.scss';

type BlogPostProps = {
  mdxSource: string;
  frontMatter: ArticleFrontMatter;
  slug: string;
};

export const BlogPost: React.FC<BlogPostProps> = ({ mdxSource, frontMatter, slug }) => {
  const contentBaseUrl = `${blogContentsUrl}/${slug}`;

  const content = hydrate(mdxSource, {
    components: {
      img: (props) => <img {...props} src={`${contentBaseUrl}/${props.src}`} />,
    },
  });

  return (
    <DefaultLayout>
      <Head>
        <title>{`${frontMatter.title} - suzukalight.com`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Box m="1em">
          <Box maxW="640px" mx="auto">
            {frontMatter.hero && <img src={`${contentBaseUrl}/${frontMatter.hero}`} />}

            <Heading as="h1" mt={8} mb={2} wordBreak="break-all">
              {frontMatter.title}
            </Heading>

            <Box mb={8}>
              <Box maxH="1.25em" overflow="hidden" lineHeight="1.25" wordBreak="break-all">
                {(frontMatter.tags || []).map((tag) => (
                  <Text as="span" key={tag} mr={2} color="gray.400" fontSize="sm">{`#${tag}`}</Text>
                ))}
              </Box>

              <Text fontSize="sm" color="gray.400" opacity="0.8">
                {getArticleDate(frontMatter.date)}
              </Text>
            </Box>

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
    </DefaultLayout>
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
  const mdxSource = await renderToString(content, {
    components: {
      img: (props) => <img {...props} src={`${blogContentsUrl}/${params.slug}/${props.src}`} />,
    },
  });

  return {
    props: {
      mdxSource,
      frontMatter: data,
      slug: params.slug,
    } as BlogPostProps,
  };
}