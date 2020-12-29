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

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from './slug.module.scss';

import { Article, ArticleDTO, blogContentsUrl, blogRootUrl } from '../../../utils/article/entity';
import {
  getArticles,
  getDirNamesThatHaveMdx,
  getMdxSource,
} from '../../../utils/article/file-system.server';
import { getPrevAndNextArticle, getRelatedArticles } from '../../../utils/article/related';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { ArticleList } from '../../../components/molecules/ArticleList';

type BlogPostProps = {
  articleDTO: ArticleDTO;
  contentHtml: string;
  relatedArticlesDTO: ArticleDTO[];
  prevArticleDTO?: ArticleDTO;
  nextArticleDTO?: ArticleDTO;
};

export const BlogPost: React.FC<BlogPostProps> = ({
  articleDTO,
  contentHtml,
  relatedArticlesDTO,
  prevArticleDTO,
  nextArticleDTO,
}) => {
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

            <Divider my={12} />

            <Heading as="h1" fontSize="xl" my={8}>
              Related Articles
            </Heading>

            {relatedArticlesDTO.length > 0 ? (
              <ArticleList
                articles={relatedArticlesDTO.map((r) => Article.fromDTO(r))}
                blogRootUrl={blogRootUrl}
                blogContentsUrl={blogContentsUrl}
              />
            ) : (
              <Text as="small" color="gray.500">
                関連する記事は見つかりませんでした
              </Text>
            )}

            <Heading as="h1" fontSize="xl" mt={16} mb={8}>
              Prev/Next Article
            </Heading>

            <ArticleList
              articles={[
                prevArticleDTO && Article.fromDTO(prevArticleDTO),
                nextArticleDTO && Article.fromDTO(nextArticleDTO),
              ].filter((a) => a)}
              blogRootUrl={blogRootUrl}
              blogContentsUrl={blogContentsUrl}
            />

            <Divider my={12} />

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

  const articles = getArticles();

  const relatedArticles = getRelatedArticles(article, articles);
  const relatedArticlesDTO = relatedArticles.map((a) => a.toDTO());

  const { prevArticle, nextArticle } = getPrevAndNextArticle(article, articles);

  return {
    props: {
      articleDTO: article.toDTO(),
      contentHtml,
      relatedArticlesDTO,
      prevArticleDTO: prevArticle?.toDTO() ?? null,
      nextArticleDTO: nextArticle?.toDTO() ?? null,
    },
  };
};
