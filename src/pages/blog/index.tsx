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
import { UrlTable } from '../../utils/path/url';

type IndexPageProps = {
  articles: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ articles }) => (
  <ArticleListLayout
    title="Blog"
    subtitle="技術調査や素振り、競馬や一口馬主、ほかに旅行やゲームの話など。"
  >
    <HtmlHead title="Blog" url={UrlTable.blog} />

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

    <BackLinks links={[{ href: UrlTable.home, label: 'ホームに戻る' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles(UrlTable.blog);
  const articlesSorted = sortArticlesByDateDesc(articles);

  return { props: { articles: articlesSorted } as IndexPageProps, revalidate: 30 };
};
