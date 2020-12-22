import React from 'react';
import { GetStaticProps } from 'next';
import { Flex, Box, Heading, Divider, Text } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { Link } from '../../../components/atoms/Link';

import { getArticles } from '../../../utils/article/file-system.server';
import {
  comparatorTagCount,
  comparatorTagName,
  getArrayOfTagAndCountFromTable,
  getTableWithTagAndCountIncludedInArticles,
  TagAndCount,
} from '../../../utils/article/tag';

type IndexPageProps = {
  sortByName: TagAndCount[];
  sortByCount: TagAndCount[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ sortByName, sortByCount }) => (
  <DefaultLayout backgroundColor="gray.50">
    <HtmlHead title="Blog" />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="64em" mx="auto">
          <Heading as="h1" mb={8}>
            Tags
          </Heading>

          <Heading as="h2" fontSize="2xl" mb={8}>
            by Name
          </Heading>

          <Flex direction={['column', 'row']} w="100%" flexWrap="wrap">
            {sortByName.map(({ tag, count }) => (
              <Box key={tag} mr={4}>
                <Link to={`/blog/tags/${encodeURIComponent(tag)}`}>
                  <Text as="span">{`#${tag} (${count})`}</Text>
                </Link>
              </Box>
            ))}
          </Flex>

          <Heading as="h2" fontSize="2xl" my={8}>
            by Count
          </Heading>

          <Flex direction={['column', 'row']} w="100%" flexWrap="wrap">
            {sortByCount.map(({ tag, count }) => (
              <Box key={tag} mr={4}>
                <Link to={`/blog/tags/${encodeURIComponent(tag)}`}>
                  <Text as="span">{`#${tag} (${count})`}</Text>
                </Link>
              </Box>
            ))}
          </Flex>

          <Divider mt={12} mb={8} />

          <BackLinks
            links={[
              { to: '/blog', icon: FaPencilAlt, label: 'Back to Blog Index' },
              { to: '/', icon: FaHome, label: 'Back to Home' },
            ]}
          />
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = getArticles();
  const tagAndCountTable = getTableWithTagAndCountIncludedInArticles(articles);
  const sortByName = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagName);
  const sortByCount = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagCount);

  return { props: { sortByName, sortByCount } as IndexPageProps };
};
