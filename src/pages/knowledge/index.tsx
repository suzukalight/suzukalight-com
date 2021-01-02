import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { ArticleExcerptItem } from '../../components/molecules/ArticleExcerptItem';
import { BackLinks } from '../../components/molecules/BackLinks';

import {
  urlKnowledgeRoot,
  urlKnowledgeTags,
  urlKnowledgePosts,
  urlContentsKnowledge,
} from '../url.json';
import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { renderToString } from '../../utils/article/markdown.server';

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
    <HtmlHead title="Knowledge" url={urlKnowledgeRoot} />

    <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
      {data.map((d) => (
        <ArticleExcerptItem
          key={d.article.slug}
          article={d.article}
          contentHtml={d.contentHtml}
          contentBaseUrl={`${urlContentsKnowledge}/${d.article.slug}`}
          tagBaseUrl={urlKnowledgeTags}
          postBaseUrl={urlKnowledgePosts}
          showContentLink
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
