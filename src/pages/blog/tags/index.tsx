import React from 'react';
import { GetStaticProps } from 'next';
import { Heading, Divider } from '@chakra-ui/react';

import { ArticleListLayout } from '../../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../../components/molecules/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { TagListWithCount } from '../../../components/molecules/TagList/WithCount';

import { getArticles } from '../../../utils/article/fs.server';
import {
  comparatorTagCount,
  comparatorTagName,
  getArrayOfTagAndCountFromTable,
  getTableWithTagAndCountIncludedInArticles,
  TagAndCount,
} from '../../../utils/article/tag';
import { UrlTable } from '../../../utils/path/url';

type IndexPageProps = {
  orderByName: TagAndCount[];
  orderByCount: TagAndCount[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ orderByName, orderByCount }) => (
  <ArticleListLayout title="Tags">
    <HtmlHead title="Tags" url={UrlTable.blogTags} />

    <Heading as="h2" fontSize="2xl" mb={4}>
      by Name
    </Heading>

    <TagListWithCount tagAndCounts={orderByName} tagBaseUrl={UrlTable.blogTags} />

    <Heading as="h2" fontSize="2xl" mt={12} mb={4}>
      by Count
    </Heading>

    <TagListWithCount tagAndCounts={orderByCount} tagBaseUrl={UrlTable.blogTags} />

    <Divider mt={12} mb={8} />

    <BackLinks
      links={[
        { href: UrlTable.blog, label: 'ブログ一覧に戻る' },
        { href: UrlTable.home, label: 'ホームに戻る' },
      ]}
    />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles(UrlTable.blog);
  const tagAndCountTable = getTableWithTagAndCountIncludedInArticles(articles);
  const orderByName = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagName);
  const orderByCount = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagCount);

  return { props: { orderByName, orderByCount } as IndexPageProps };
};
