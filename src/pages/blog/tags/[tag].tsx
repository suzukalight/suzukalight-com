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
import { stripMarkdown } from '../../../utils/article/markdown';

type IndexPageProps = {
  tag: string;
  data: {
    article: ArticleDTO;
    contentText: string;
  }[];
};

export const TagPage: React.FC<IndexPageProps> = ({ tag, data }) => {
  const title = `#${tag} タグの付いた Blog`;

  return (
    <ArticleListLayout title={title}>
      <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
        {data.map((d) => (
          <ArticleListItem
            key={d.article.slug}
            article={Article.fromDTO(d.article)}
            contentText={d.contentText}
            contentBaseUrl={`${urlContentsBlog}/${d.article.slug}`}
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

  const data = await Promise.all(
    sortArticlesByDateDesc(articlesFilteredByTag).map(async (a) => ({
      article: a.toDTO(),
      contentText: await stripMarkdown(a.getContent()),
    })),
  );

  return {
    props: { tag, data },
  };
};
