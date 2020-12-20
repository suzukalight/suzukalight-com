/* eslint-disable react/display-name */

import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { Heading, Center, Box, Text, Divider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkSlug from 'remark-slug';
import remarkCodeTitles from 'remark-code-titles';
import remarkPrism from 'remark-prism';

import {
  ArticleFrontMatter,
  blogContentsUrl,
  getArticleDate,
  getMdxDataAndContent,
} from '../../../utils/article';
import { getDirNamesThatHaveMdx, getMdxSource } from '../../../utils/article-fs';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';

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
      <HtmlHead title={frontMatter.title} />

      <Box>
        <Box m="1em">
          <Box maxW="640px" mx="auto">
            {frontMatter.hero && <img src={`${contentBaseUrl}/${frontMatter.hero}`} />}
            {frontMatter.emoji && (
              <Center w="100%" h={48} borderRadius={8} flexShrink={0} backgroundColor="gray.100">
                <Text fontSize="6xl">{frontMatter.emoji}</Text>
              </Center>
            )}

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

            <Divider mt={12} mb={8} />

            <BackLinks
              links={[
                { to: '/blog', icon: FaPencilAlt, label: 'Back to Blog List' },
                { to: '/', icon: FaHome, label: 'Back to Home' },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const dirNamesThatHaveMdx = getDirNamesThatHaveMdx();
  const paths = dirNamesThatHaveMdx.map((dir) => ({ params: { slug: dir.replace(/\.mdx?/, '') } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = getMdxSource(params.slug as string);
  const { data, content } = getMdxDataAndContent(source);
  const mdxSource = await renderToString(content, {
    components: {
      img: (props) => <img {...props} src={`${blogContentsUrl}/${params.slug}/${props.src}`} />,
    },
    mdxOptions: {
      remarkPlugins: [
        remarkSlug,
        [
          remarkAutolinkHeadings,
          {
            content: {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['icon', 'icon-link', 'remark-autolink-headings'],
              },
            },
          },
        ],
        remarkCodeTitles,
        remarkPrism,
      ],
    },
  });

  return {
    props: {
      mdxSource,
      frontMatter: data,
      slug: params.slug,
    } as BlogPostProps,
  };
};
