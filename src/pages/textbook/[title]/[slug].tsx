import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Flex, Box, Heading, VStack } from '@chakra-ui/react';

import { urlContentsTextbook, urlTextbookRoot } from '../../url.json';
import { Article } from '../../../utils/article/entity';
import {
  getArticle,
  getArticles,
  getPublicDirNames,
  getPublicDirNamesThatHaveMdx,
} from '../../../utils/article/fs.server';
import { hydrate } from '../../../utils/article/markdown';
import { renderToString } from '../../../utils/article/markdown.server';
import { getPrevAndNextArticle } from '../../../utils/article/related';

import { Header } from '../../../components/molecules/Header';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';
import { ArticleHeader } from '../../../components/molecules/ArticleHeader';
import { ArticleDetail } from '../../../components/molecules/ArticleDetail';

type BlogPostProps = {
  bookTitle: string;
  urlTextbook: string;
  article: Article;
  contentHtml: string;
  prevArticle?: Article;
  nextArticle?: Article;
};

export const BlogPost: React.FC<BlogPostProps> = ({
  bookTitle,
  urlTextbook,
  article,
  contentHtml,
}) => {
  const { slug } = article;
  const { title, hero } = article.frontMatter;
  const blogUrl = `${urlTextbook}/${slug}`;
  const contentBaseUrl = `${urlContentsTextbook}/${urlTextbook}/${slug}`;
  const urlContentsTextbookTitle = `${urlContentsTextbook}/${bookTitle}`;

  const content = hydrate(contentHtml, contentBaseUrl);
  const ogImage = hero ? { image: `${contentBaseUrl}/${hero}` } : null;

  return (
    <Flex direction="column" align="center" w="100vw" m="0 auto" overflowX="hidden">
      <Header />
      <HtmlHead title={title} description={article.excerpt} url={blogUrl} {...ogImage} />

      <Box
        as="aside"
        flexShrink={0}
        position="fixed"
        left={['-15em', '-15em', '-15em', 0]}
        top="4em"
        w="15em"
        h="calc(100vh - 4em)"
      >
        <Heading as="h1" fontSize="md">
          {bookTitle}
        </Heading>

        {/* <ArticleDetail contentHtml={content} /> */}
      </Box>

      <Box ml={[0, 0, 0, '15em']} mt="4em">
        <CenterMaxW maxWidth="40em">
          <VStack spacing={12} align="left">
            <ArticleHeader article={article} urlContent={urlContentsTextbookTitle} />
            <ArticleDetail contentHtml={content} />
          </VStack>
        </CenterMaxW>
      </Box>
    </Flex>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const titles = getPublicDirNames(urlContentsTextbook);
  const paths = titles
    .map((title) => {
      const slugs = getPublicDirNamesThatHaveMdx(`${urlContentsTextbook}/${title}`);
      return slugs.map((slug) => ({ params: { title, slug } }));
    })
    .flat();

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookTitle = params.title as string;
  const slug = params.slug as string;
  const urlTextbook = `${urlTextbookRoot}/${bookTitle}`;
  const urlContentsTextbookTitle = `${urlContentsTextbook}/${bookTitle}`;
  const { content, ...article } = await getArticle(slug, urlContentsTextbookTitle);

  const contentHtml = await renderToString(content, `${urlContentsTextbookTitle}/${slug}`);

  const articles = await getArticles(urlContentsTextbook);
  const { prevArticle, nextArticle } = getPrevAndNextArticle(article, articles);

  return {
    props: {
      bookTitle,
      urlTextbook,
      article,
      contentHtml,
      prevArticle,
      nextArticle,
    },
  };
};
