import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleListLayout } from '../../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../../components/molecules/HtmlHead';
import { ArticleExcerptItem } from '../../../components/molecules/ArticleExcerptItem';
import { BackLinks } from '../../../components/molecules/BackLinks';

import { Article } from '../../../utils/article/entity';
import { getArticles } from '../../../utils/article/fs.server';
import { getTagsIncludedInArticles } from '../../../utils/article/tag';
import { filterArticleByTag } from '../../../utils/article/filter';
import { sortArticlesByDateDesc } from '../../../utils/article/sorter';
import { UrlTable } from '../../../utils/path/url';

type TagPageProps = {
  tag: string;
  articles: Article[];
};

export const TagPage: React.FC<TagPageProps> = ({ tag, articles }) => {
  const title = `#${tag} タグの付いた Blog`;
  const tagUrl = `${UrlTable.blogTags}/${encodeURIComponent(tag)}`;

  return (
    <ArticleListLayout title={title}>
      <HtmlHead title={title} url={tagUrl} />

      <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
        {articles.map((a) => (
          <ArticleExcerptItem
            key={a.slug}
            article={a}
            urlRoot={UrlTable.blog}
            urlTags={UrlTable.blogTags}
            urlPosts={UrlTable.blogPosts}
            contentText={a.excerpt}
            showContentLink
          />
        ))}
      </VStack>

      <Divider mt={12} mb={8} />

      <BackLinks
        links={[
          { to: UrlTable.blogTags, icon: FaPencilAlt, label: 'Back to TagList' },
          { to: UrlTable.blog, icon: FaPencilAlt, label: 'Back to Blog Index' },
          { to: '/', icon: FaHome, label: 'Back to Home' },
        ]}
      />
    </ArticleListLayout>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles(UrlTable.blog);
  const tags = getTagsIncludedInArticles(articles);
  const paths = tags.map((tag) => ({ params: { tag: encodeURIComponent(tag) } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params.tag as string;

  const articles = await getArticles(UrlTable.blog);
  const articlesFilteredByTag = filterArticleByTag(articles, tag);
  const articlesSorted = sortArticlesByDateDesc(articlesFilteredByTag);

  return { props: { tag, articles: articlesSorted } as TagPageProps };
};
