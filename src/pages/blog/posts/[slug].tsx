import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Image, Heading, Center, Box, Text, Divider, VStack } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

// NOTE: markdownのHTMLにCSSを直接あてることにする
import styles from '../../../styles/article.module.scss';

import { Article, ArticleDTO } from '../../../utils/article/entity';
import { urlContentsBlog, urlBlogPosts, urlBlogTags } from '../../url.json';
import {
  getArticles,
  getDirNamesThatHaveMdx,
  getMdxSource,
} from '../../../utils/article/fs-blog.server';
import { hydrate } from '../../../utils/article/markdown';
import { renderToString } from '../../../utils/article/markdown.server';
import { getPrevAndNextArticle, getRelatedArticles } from '../../../utils/article/related';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { ArticleList } from '../../../components/molecules/ArticleList';
import { Link } from '../../../components/atoms/Link';

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
  const contentBaseUrl = `${urlContentsBlog}/${slug}`;

  const content = hydrate(contentHtml, contentBaseUrl);

  return (
    <DefaultLayout>
      <HtmlHead title={title} />

      <Box>
        <Box m="1em">
          <Box maxW="640px" mx="auto">
            <Center>
              {hero && (
                <Image
                  src={`${contentBaseUrl}/${hero}`}
                  alt="hero image"
                  fit="cover"
                  w="100%"
                  h={['16em', '16em', '20em']}
                />
              )}
              {emoji && (
                <Center
                  w="100%"
                  h={['16em', '16em', '20em']}
                  borderRadius={8}
                  flexShrink={0}
                  backgroundColor="gray.100"
                >
                  <Text fontSize={['5em', '5em', '6em']}>{emoji}</Text>
                </Center>
              )}
            </Center>

            <Heading as="h1" mt={8} mb={2} wordBreak="break-all">
              {title}
            </Heading>

            <Box mb={8}>
              <Box>
                {(tags || []).map((tag) => (
                  <Link to={`${urlBlogTags}/${encodeURIComponent(tag)}`} key={tag}>
                    <Text
                      as="span"
                      display="inline-block"
                      mr={2}
                      mb={1}
                      color="gray.600"
                      fontSize="sm"
                      lineHeight="1"
                      _hover={{ textDecoration: 'underline' }}
                    >{`#${tag}`}</Text>
                  </Link>
                ))}
              </Box>

              <Text fontSize="sm" color="gray.600" my={1}>
                {article.getDateFormatted()}
              </Text>
            </Box>

            <article className={styles.article}>{content}</article>

            <Divider mt={16} />

            <VStack as="aside" spacing={16} my={16} align="stretch">
              <Box>
                <Heading as="h1" fontSize="xl" mb={8}>
                  Tags
                </Heading>

                <Box>
                  {(tags || []).map((tag) => (
                    <Link to={`${urlBlogTags}/${encodeURIComponent(tag)}`} key={tag}>
                      <Text
                        as="span"
                        fontSize="md"
                        display="inline-block"
                        mr={2}
                        mb={2}
                        px={2}
                        borderRadius={8}
                        backgroundColor="gray.100"
                        lineHeight="2"
                        _hover={{ textDecoration: 'underline' }}
                      >{`#${tag}`}</Text>
                    </Link>
                  ))}
                </Box>
              </Box>

              <Box>
                <Heading as="h1" fontSize="xl" mb={8}>
                  Related Articles
                </Heading>

                {relatedArticlesDTO.length > 0 ? (
                  <ArticleList
                    articles={relatedArticlesDTO.map((r) => Article.fromDTO(r))}
                    urlBlogPosts={urlBlogPosts}
                    urlContentsBlog={urlContentsBlog}
                  />
                ) : (
                  <Text as="small" color="gray.500">
                    関連する記事は見つかりませんでした
                  </Text>
                )}
              </Box>

              <Box>
                <Heading as="h1" fontSize="xl" mb={8}>
                  Prev/Next Article
                </Heading>

                <ArticleList
                  articles={[
                    prevArticleDTO && Article.fromDTO(prevArticleDTO),
                    nextArticleDTO && Article.fromDTO(nextArticleDTO),
                  ].filter((a) => a)}
                  urlBlogPosts={urlBlogPosts}
                  urlContentsBlog={urlContentsBlog}
                />
              </Box>
            </VStack>

            <Divider mb={16} />

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

  const contentHtml = await renderToString(
    article.getContent(),
    `${urlContentsBlog}/${params.slug}`,
  );

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
