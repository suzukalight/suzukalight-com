import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleListLayout } from '../../../components/templates/ArticleListLayout';
import { ArticleListItem } from '../../../components/molecules/ArticleListItem';
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
    <ArticleListLayout title={title}>
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
    </ArticleListLayout>
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
