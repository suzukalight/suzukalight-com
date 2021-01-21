import React from 'react';
import { GetStaticProps } from 'next';
import { Divider } from '@chakra-ui/react';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { WorksList } from '../../components/molecules/WorksList';
import { BackLinks } from '../../components/molecules/BackLinks';

import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { UrlTable } from '../../utils/path/url';

type IndexPageProps = {
  works: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ works }) => (
  <ArticleListLayout title="Works" boxProps={{ maxW: '60em' }}>
    <HtmlHead title="Works" url={UrlTable.works} />

    <WorksList works={works} />

    <Divider mt={12} mb={8} />

    <BackLinks links={[{ href: UrlTable.home, label: 'ホームに戻る' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const works = await getArticles(UrlTable.works);
  const worksSorted = sortArticlesByDateDesc(works);

  return { props: { works: worksSorted } as IndexPageProps };
};
