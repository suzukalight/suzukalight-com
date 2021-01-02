import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleListLayout } from '../../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { ArticleExcerptItem } from '../../../components/molecules/ArticleExcerptItem';
import { BackLinks } from '../../../components/molecules/BackLinks';

import { urlContentsBlog, urlBlogPosts, urlBlogTags } from '../../url.json';
import { Article } from '../../../utils/article/entity';
import { getArticles } from '../../../utils/article/fs.server';
import { getTagsIncludedInArticles } from '../../../utils/article/tag';
import { filterArticleByTag } from '../../../utils/article/filter';
import { sortArticlesByDateDesc } from '../../../utils/article/sorter';

type TagPageProps = {
  tag: string;
  articles: Article[];
};

export const TagPage: React.FC<TagPageProps> = ({ tag, articles }) => {
  const title = `#${tag} タグの付いた Blog`;
  const tagUrl = `${urlBlogTags}/${encodeURIComponent(tag)}`;

  return (
    <ArticleListLayout title={title}>
      <HtmlHead title={title} url={tagUrl} />

      <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
        {articles.map((a) => (
          <ArticleExcerptItem
            key={a.slug}
            article={a}
            contentText={a.excerpt}
            contentBaseUrl={`${urlContentsBlog}/${a.slug}`}
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
  const articles = await getArticles(urlContentsBlog);
  const tags = getTagsIncludedInArticles(articles);
  const paths = tags.map((tag) => ({ params: { tag: encodeURIComponent(tag) } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params.tag as string;

  const articles = await getArticles(urlContentsBlog);
  const articlesFilteredByTag = filterArticleByTag(articles, tag);
  const articlesSorted = sortArticlesByDateDesc(articlesFilteredByTag);

  return { props: { tag, articles: articlesSorted } as TagPageProps };
};
