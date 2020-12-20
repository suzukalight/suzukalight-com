import React from 'react';
import { Flex, Box, Heading, Divider, Text } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import {
  ArticleData,
  comparatorTagCount,
  comparatorTagName,
  getArrayOfTagAndCountFromTable,
  getMdxDataAndContent,
  getTableWithTagAndCountIncludedInArticles,
  TagAndCount,
} from '../../../utils/article';
import { getDirNamesThatHaveMdx, getMdxSource } from '../../../utils/article-fs';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { Link } from '../../../components/atoms/Link';

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
            {sortByName.map((tagAndCount) => (
              <Box key={tagAndCount.tag} mr={4}>
                <Link to={`/blog/tags/${tagAndCount.tag}`}>
                  <Text as="span">{`#${tagAndCount.tag} (${tagAndCount.count})`}</Text>
                </Link>
              </Box>
            ))}
          </Flex>

          <Heading as="h2" fontSize="2xl" my={8}>
            by Count
          </Heading>

          <Flex direction={['column', 'row']} w="100%" flexWrap="wrap">
            {sortByCount.map((tagAndCount) => (
              <Box key={tagAndCount.tag} mr={4}>
                <Link to={`/blog/tags/${tagAndCount.tag}`}>
                  <Text as="span">{`#${tagAndCount.tag} (${tagAndCount.count})`}</Text>
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

export async function getStaticProps() {
  const mdxDirs = getDirNamesThatHaveMdx();
  const articles = mdxDirs.map((slug) => {
    const source = getMdxSource(slug);
    const { data, content } = getMdxDataAndContent(source);

    return {
      slug,
      excerpt: content.substr(0, 128),
      ...data,
    } as ArticleData;
  });

  const tagAndCountTable = getTableWithTagAndCountIncludedInArticles(articles);
  const sortByName = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagName);
  const sortByCount = getArrayOfTagAndCountFromTable(tagAndCountTable, comparatorTagCount);

  return { props: { sortByName, sortByCount } };
}
