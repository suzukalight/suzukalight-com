import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { ArticleListItem } from '../../components/molecules/ArticleListItem';
import { BackLinks } from '../../components/molecules/BackLinks';

import { urlBlogRoot, urlContentsBlog, urlBlogPosts, urlBlogTags } from '../url.json';
import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';

type IndexPageProps = {
  articles: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ articles }) => (
  <ArticleListLayout
    title="Blog"
    subtitle="技術調査や素振り、競馬や一口馬主、ほかに旅行やゲームの話など。"
  >
    <HtmlHead title="Blog" url={urlBlogRoot} />

    <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
      {articles.map((a) => (
        <ArticleListItem
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

    <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles(urlContentsBlog);
  const articlesSorted = sortArticlesByDateDesc(articles);

  return { props: { articles: articlesSorted } as IndexPageProps };
};
