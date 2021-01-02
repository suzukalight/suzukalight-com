import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { ArticleListItem } from '../../components/molecules/ArticleListItem';
import { BackLinks } from '../../components/molecules/BackLinks';

import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { renderToString } from '../../utils/article/markdown.server';
import { urlContentsKnowledge } from '../url.json';

type IndexPageProps = {
  data: {
    article: Article;
    contentHtml: string;
  }[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ data }) => (
  <ArticleListLayout
    title="Knowledge"
    subtitle="主に技術系の単発ネタを書き留めたメモ。同じところで悩む誰かの役に立てれば。"
  >
    <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
      {data.map((d) => (
        <ArticleListItem
          key={d.article.slug}
          article={d.article}
          contentHtml={d.contentHtml}
          contentBaseUrl={`${urlContentsKnowledge}/${d.article.slug}`}
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
  const articles = await getArticles(urlContentsKnowledge);
  const data = await Promise.all(
    sortArticlesByDateDesc(articles).map(async ({ content, ...article }) => ({
      article,
      contentHtml: await renderToString(content, `${urlContentsKnowledge}/${article.slug}`),
    })),
  );

  return { props: { data } as IndexPageProps };
};
