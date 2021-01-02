import React from 'react';
import { GetStaticProps } from 'next';
import { Flex, Box, Heading, Divider, Text } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleListLayout } from '../../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { Link } from '../../../components/atoms/Link';

import { urlContentsKnowledge, urlKnowledgeTags, urlKnowledgeRoot } from '../../url.json';
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
    <HtmlHead title="Tags" url={urlKnowledgeTags} />

    <Heading as="h2" fontSize="2xl" mb={8}>
      by Name
    </Heading>

    <Flex direction={['column', 'row']} w="100%" flexWrap="wrap">
      {orderByName.map(({ tag, count }) => (
        <Box key={tag} mr={4}>
          <Link to={`${urlKnowledgeTags}/${encodeURIComponent(tag)}`}>
            <Text as="span">{`#${tag} (${count})`}</Text>
          </Link>
        </Box>
      ))}
    </Flex>

    <Heading as="h2" fontSize="2xl" my={8}>
      by Count
    </Heading>

    <Flex direction={['column', 'row']} w="100%" flexWrap="wrap">
      {orderByCount.map(({ tag, count }) => (
        <Box key={tag} mr={4}>
          <Link to={`${urlKnowledgeTags}/${encodeURIComponent(tag)}`}>
            <Text as="span">{`#${tag} (${count})`}</Text>
          </Link>
        </Box>
      ))}
    </Flex>

    <Divider mt={12} mb={8} />

    <BackLinks
      links={[
        { to: urlKnowledgeRoot, icon: FaPencilAlt, label: 'Back to Knowledge Index' },
        { to: '/', icon: FaHome, label: 'Back to Home' },
      ]}
    />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles(urlContentsKnowledge);
  const tagAndCountTable = getTableWithTagAndCountIncludedInArticles(articles);
  const orderByName = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagName);
  const orderByCount = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagCount);

  return { props: { orderByName, orderByCount } as IndexPageProps };
};