import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { ArticleListItem } from '../../components/molecules/ArticleListItem';
import { BackLinks } from '../../components/molecules/BackLinks';

import { urlContentsBlog, urlBlogPosts, urlBlogTags } from '../url.json';
import { Article, ArticleDTO } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { stripMarkdown } from '../../utils/article/markdown';

type IndexPageProps = {
  data: {
    article: ArticleDTO;
    contentText: string;
  }[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ data }) => (
  <ArticleListLayout
    title="Blog"
    subtitle="技術調査や素振り、競馬や一口馬主、ほかに旅行やゲームの話など。"
  >
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

    <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = getArticles(urlContentsBlog);
  const data = await Promise.all(
    sortArticlesByDateDesc(articles).map(async (a) => ({
      article: a.toDTO(),
      contentText: await stripMarkdown(a.getContent()),
    })),
  );

  return { props: { data } };
};
