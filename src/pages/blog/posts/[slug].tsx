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
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { Article, ArticleDTO, blogContentsUrl } from '../../../utils/article/entity';
import { getDirNamesThatHaveMdx, getMdxSource } from '../../../utils/article/file-system';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from './slug.module.scss';

type BlogPostProps = {
  article: ArticleDTO;
  contentHtml: string;
};

export const BlogPost: React.FC<BlogPostProps> = ({ article: articleDTO, contentHtml }) => {
  const article = Article.fromDTO(articleDTO);
  const slug = article.getSlug();
  const { title, tags, hero, emoji } = article.getFrontMatter();
  const contentBaseUrl = `${blogContentsUrl}/${slug}`;

  const content = hydrate(contentHtml, {
    components: {
      img: (props) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img {...props} src={`${contentBaseUrl}/${props.src}`} />
        </div>
      ),
      TwitterEmbed: (props) => (
        <TwitterTweetEmbed
          tweetId={props.tweetId}
          options={props.options || { conversation: 'none' }}
        />
      ),
    },
  });

  return (
    <DefaultLayout>
      <HtmlHead title={title} />

      <Box>
        <Box m="1em">
          <Box maxW="640px" mx="auto">
            <Center>
              {hero && <img src={`${contentBaseUrl}/${hero}`} />}
              {emoji && (
                <Center w="100%" h={48} borderRadius={8} flexShrink={0} backgroundColor="gray.100">
                  <Text fontSize="6xl">{emoji}</Text>
                </Center>
              )}
            </Center>

            <Heading as="h1" mt={8} mb={2} wordBreak="break-all">
              {title}
            </Heading>

            <Box mb={8}>
              <Box maxH="1.25em" overflow="hidden" lineHeight="1.25" wordBreak="break-all">
                {(tags || []).map((tag) => (
                  <Text as="span" key={tag} mr={2} color="gray.400" fontSize="sm">{`#${tag}`}</Text>
                ))}
              </Box>

              <Text fontSize="sm" color="gray.400" opacity="0.8">
                {article.getDateFormatted()}
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
  const slug = params.slug as string;
  const source = getMdxSource(slug);
  const article = Article.fromMdxSource(source, slug);

  const contentHtml = await renderToString(article.getContent(), {
    components: {
      img: (props) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img {...props} src={`${blogContentsUrl}/${params.slug}/${props.src}`} />
        </div>
      ),
      TwitterEmbed: (props) => (
        <TwitterTweetEmbed
          tweetId={props.tweetId}
          options={props.options || { conversation: 'none' }}
        />
      ),
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

  return { props: { article: article.toDTO(), contentHtml } };
};
