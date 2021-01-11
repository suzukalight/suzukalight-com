import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Flex, Box, Heading, VStack, ListItem, UnorderedList, Text } from '@chakra-ui/react';

import { Article, stripContent } from '../../../utils/article/entity';
import { getArticle, getArticles, getSlugs } from '../../../utils/article/fs.server';
import { hydrate } from '../../../utils/article/markdown';
import { renderToString } from '../../../utils/article/markdown.server';
import { getPrevAndNextArticle } from '../../../utils/article/related';
import { getContentsDirNames } from '../../../utils/path/file.server';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';

import { Header } from '../../../components/molecules/Header';
import { HtmlHead } from '../../../components/molecules/HtmlHead';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';
import { ArticleHeader } from '../../../components/molecules/ArticleHeader';
import { ArticleDetail } from '../../../components/molecules/ArticleDetail';
import { Link } from '../../../components/atoms/Link';

type BlogPostProps = {
  textbook: Article;
  article: Article;
  contentHtml: string;
  chapters: Article[];
  prevArticle?: Article;
  nextArticle?: Article;
};

export const BlogPost: React.FC<BlogPostProps> = ({ textbook, article, contentHtml, chapters }) => {
  const { slug } = article;
  const { title, hero } = article.frontMatter;
  const urlTextbook = mergeUrlAndSlug(textbook.slug, UrlTable.textbook);
  const urlChapter = mergeUrlAndSlug(slug, urlTextbook);

  const content = hydrate(contentHtml, slug, urlTextbook);
  const ogImage = hero ? { image: `${getContentsUrlWithSlug(slug, urlChapter)}/${hero}` } : null;

  return (
    <Flex direction="column" align="center" w="100%" minH="100vh" m="0 auto" overflowX="hidden">
      <Header />
      <HtmlHead title={title} description={article.excerpt} url={urlChapter} {...ogImage} />

      <VStack
        spacing={4}
        as="aside"
        flexShrink={0}
        position="fixed"
        left={['-15em', '-15em', '-15em', 0]}
        top={0}
        w="15em"
        h="100vh"
        pt="5em"
        px={4}
        align="left"
        shadow="sm"
        // backgroundColor="gray.50"
      >
        <Heading as="h1" fontSize="md">
          {textbook.frontMatter.title}
        </Heading>

        <UnorderedList listStyleType="none" spacing={1}>
          {chapters.map((chapter) => {
            const url = mergeUrlAndSlug(chapter.slug, urlTextbook);
            const match = chapter.slug === article.slug;

            return (
              <ListItem
                key={chapter.frontMatter.title}
                p={2}
                borderRadius={4}
                color={match ? 'gray.800' : 'gray.400'}
                backgroundColor={match ? 'gray.100' : 'inherit'}
                _hover={{
                  textDecoration: 'underline',
                  color: 'gray.800',
                  backgroundColor: match ? 'gray.200' : 'gray.50',
                }}
              >
                <Link to={url}>
                  <Text fontSize="sm" fontWeight="600">
                    {chapter.frontMatter.title}
                  </Text>
                </Link>
              </ListItem>
            );
          })}
        </UnorderedList>
      </VStack>

      <Box ml={[0, 0, 0, '15em']} mt="4em">
        <CenterMaxW maxWidth="40em">
          <VStack spacing={8} align="left">
            <ArticleHeader article={article} urlRoot={UrlTable.textbook} textbook={textbook} />
            <ArticleDetail contentHtml={content} />
          </VStack>
        </CenterMaxW>
      </Box>
    </Flex>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const titles = getContentsDirNames(UrlTable.textbook);
  const paths = titles
    .map((title) => {
      const slugs = getSlugs(`${UrlTable.textbook}/${title}`);
      return slugs.map((slug) => ({ params: { title, slug } }));
    })
    .flat();

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const textbookSlug = params.title as string;
  const slug = params.slug as string;
  const urlTextbook = mergeUrlAndSlug(textbookSlug, UrlTable.textbook);

  const { content, ...article } = await getArticle(slug, urlTextbook);
  const contentHtml = await renderToString(content, slug, urlTextbook);

  const chapters = await getArticles(urlTextbook);
  const { prevArticle, nextArticle } = getPrevAndNextArticle(article, chapters);

  const textbook = await getArticle(textbookSlug, UrlTable.textbook);

  return {
    props: {
      textbook: stripContent(textbook),
      article,
      contentHtml,
      chapters: chapters.map((c) => stripContent(c)),
      prevArticle,
      nextArticle,
    },
  };
};
