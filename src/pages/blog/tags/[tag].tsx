import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Heading, Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleListItem } from '../../../components/molecules/ArticleListItem';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';

import { urlContentsBlog, urlBlogPosts, urlBlogTags } from '../../url.json';
import { Article, ArticleDTO } from '../../../utils/article/entity';
import { getArticles } from '../../../utils/article/fs.server';
import { getTagsIncludedInArticles } from '../../../utils/article/tag';
import { filterArticleByTag } from '../../../utils/article/filter';
import { sortArticlesByDateDesc } from '../../../utils/article/sorter';

type IndexPageProps = {
  tag: string;
  articles: ArticleDTO[];
};

export const TagPage: React.FC<IndexPageProps> = ({ tag, articles: articleDTOs }) => {
  const title = `#${tag} タグの付いた Blog`;
  const articles = articleDTOs.map((dto) => Article.fromDTO(dto));

  return (
    <DefaultLayout>
      <HtmlHead title={title} />

      <Box py={8}>
        <Box m="1em">
          <Box maxW="50em" mx="auto">
            <Heading as="h1" mb={12}>
              {title}
            </Heading>

            <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
              {articles.map((article) => (
                <ArticleListItem
                  key={article.getSlug()}
                  article={article}
                  contentBaseUrl={`${urlContentsBlog}/${article.getSlug()}`}
                  tagBaseUrl={urlBlogTags}
                  postBaseUrl={urlBlogPosts}
                  showContentLink
                />
              ))}
            </VStack>

            <Divider mt={12} mb={8} />

            <BackLinks
              links={[
                { to: '/blog/tags', icon: FaPencilAlt, label: 'Back to TagList' },
                { to: '/blog', icon: FaPencilAlt, label: 'Back to Blog Index' },
                { to: '/', icon: FaHome, label: 'Back to Home' },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getArticles(urlContentsBlog);
  const tags = getTagsIncludedInArticles(articles);
  const paths = tags.map((tag) => ({ params: { tag: encodeURIComponent(tag) } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articles = getArticles(urlContentsBlog);
  const tag = params.tag as string;
  const articlesFilteredByTag = filterArticleByTag(articles, tag);

  return {
    props: { tag, articles: sortArticlesByDateDesc(articlesFilteredByTag).map((a) => a.toDTO()) },
  };
};
