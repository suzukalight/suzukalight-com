import React from 'react';
import { GetStaticProps } from 'next';
import { Heading, Divider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleListLayout } from '../../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { TagListWithCount } from '../../../components/molecules/TagList/WithCount';

import { urlContentsBlog, urlBlogRoot, urlBlogTags } from '../../url.json';
import { getArticles } from '../../../utils/article/fs.server';
import {
  comparatorTagCount,
  comparatorTagName,
  getArrayOfTagAndCountFromTable,
  getTableWithTagAndCountIncludedInArticles,
  TagAndCount,
} from '../../../utils/article/tag';

type IndexPageProps = {
  orderByName: TagAndCount[];
  orderByCount: TagAndCount[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ orderByName, orderByCount }) => (
  <ArticleListLayout title="Tags">
    <HtmlHead title="Tags" url={urlBlogTags} />

    <Heading as="h2" fontSize="2xl" mb={4}>
      by Name
    </Heading>

    <TagListWithCount tagAndCounts={orderByName} tagBaseUrl={urlBlogTags} />

    <Heading as="h2" fontSize="2xl" mt={12} mb={4}>
      by Count
    </Heading>

    <TagListWithCount tagAndCounts={orderByCount} tagBaseUrl={urlBlogTags} />

    <Divider mt={12} mb={8} />

    <BackLinks
      links={[
        { to: urlBlogRoot, icon: FaPencilAlt, label: 'Back to Blog Index' },
        { to: '/', icon: FaHome, label: 'Back to Home' },
      ]}
    />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles(urlContentsBlog);
  const tagAndCountTable = getTableWithTagAndCountIncludedInArticles(articles);
  const orderByName = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagName);
  const orderByCount = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagCount);

  return { props: { orderByName, orderByCount } as IndexPageProps };
};
