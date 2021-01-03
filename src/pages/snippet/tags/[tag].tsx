import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleListLayout } from '../../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { ArticleExcerptItem } from '../../../components/molecules/ArticleExcerptItem';
import { BackLinks } from '../../../components/molecules/BackLinks';

import {
  urlContentsSnippet,
  urlSnippetPosts,
  urlSnippetTags,
  urlSnippetRoot,
} from '../../url.json';
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
  const title = `#${tag} タグの付いた Snippet`;
  const tagUrl = `${urlSnippetTags}/${encodeURIComponent(tag)}`;

  return (
    <ArticleListLayout title={title}>
      <HtmlHead title={title} url={tagUrl} />

      <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
        {articles.map((a) => (
          <ArticleExcerptItem
            key={a.slug}
            article={a}
            contentText={a.excerpt}
            contentBaseUrl={`${urlContentsSnippet}/${a.slug}`}
            tagBaseUrl={urlSnippetTags}
            postBaseUrl={urlSnippetPosts}
            showContentLink
          />
        ))}
      </VStack>

      <Divider mt={12} mb={8} />

      <BackLinks
        links={[
          { to: urlSnippetTags, icon: FaPencilAlt, label: 'Back to TagList' },
          { to: urlSnippetRoot, icon: FaPencilAlt, label: 'Back to Snippet Index' },
          { to: '/', icon: FaHome, label: 'Back to Home' },
        ]}
      />
    </ArticleListLayout>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles(urlContentsSnippet);
  const tags = getTagsIncludedInArticles(articles);
  const paths = tags.map((tag) => ({ params: { tag: encodeURIComponent(tag) } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params.tag as string;

  const articles = await getArticles(urlContentsSnippet);
  const articlesFilteredByTag = filterArticleByTag(articles, tag);
  const articlesSorted = sortArticlesByDateDesc(articlesFilteredByTag);

  return { props: { tag, articles: articlesSorted } as TagPageProps };
};
