import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { ArticleExcerptItem } from '../../components/molecules/ArticleExcerptItem';
import { BackLinks } from '../../components/molecules/BackLinks';

import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { renderToString } from '../../utils/article/markdown.server';
import { getContentsUrl, UrlTable } from '../../utils/path/url';

type IndexPageProps = {
  data: {
    article: Article;
    contentHtml: string;
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
          contentHtml={d.contentHtml}
          showReadMore
        />
      ))}
    </VStack>

    <Divider mt={12} mb={8} />

    <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles(UrlTable.snippet);
  const data = await Promise.all(
    sortArticlesByDateDesc(articles).map(async ({ content, ...article }) => ({
      article,
      contentHtml: await renderToString(content, article.slug, getContentsUrl(UrlTable.snippet)),
    })),
  );

  return { props: { data } as IndexPageProps };
};
