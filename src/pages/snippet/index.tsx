import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { ArticleExcerptItem } from '../../components/molecules/ArticleExcerptItem';
import { BackLinks } from '../../components/molecules/BackLinks';

import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { MdxSource } from '../../utils/article/markdown';
import { renderToString } from '../../utils/article/markdown.server';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../utils/path/url';

type IndexPageProps = {
  data: {
    article: Article;
    contentSource: MdxSource;
  }[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ data }) => (
  <ArticleListLayout
    title="Snippet"
    subtitle="主に技術系の単発ネタを書き留めたメモ。同じところで悩む誰かの役に立てれば。"
  >
    <HtmlHead title="Snippet" url={UrlTable.snippet} />

    <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
      {data.map((d) => (
        <ArticleExcerptItem
          key={d.article.slug}
          article={d.article}
          urlRoot={UrlTable.snippet}
          urlTags={UrlTable.snippetTags}
          urlPosts={UrlTable.snippetPosts}
          contentSource={d.contentSource}
          showReadMore
        />
      ))}
    </VStack>

    <Divider mt={12} mb={8} />

    <BackLinks links={[{ href: UrlTable.home, label: 'ホームに戻る' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles(UrlTable.snippet, { withContent: true });
  const data = await Promise.all(
    sortArticlesByDateDesc(articles).map(async ({ content, ...article }) => ({
      article,
      contentSource: await renderToString(content, {
        baseImageUrl: getContentsUrlWithSlug(article.slug, UrlTable.snippet),
        baseHref: `${UrlTable.snippetPosts}/[slug]`,
        baseAs: mergeUrlAndSlug(article.slug, UrlTable.snippetPosts),
      }),
    })),
  );

  return { props: { data } as IndexPageProps };
};
