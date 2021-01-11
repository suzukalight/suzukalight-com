import React from 'react';
import { GetStaticProps } from 'next';
import { StackDivider, Avatar, VStack, HStack, Box, Text } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';
import { ArticleDetail } from '../../components/molecules/ArticleDetail';
import { SNSLinks } from '../../components/molecules/SNSLinks';

import { getArticle } from '../../utils/article/fs.server';
import { hydrate } from '../../utils/article/markdown';
import { renderToString } from '../../utils/article/markdown.server';
import { UrlTable } from '../../utils/path/url';

type IndexPageProps = {
  contentHtml: string;
};

export const IndexPage: React.FC<IndexPageProps> = ({ contentHtml }) => {
  const content = hydrate(contentHtml, 'index', UrlTable.about);

  return (
    <ArticleListLayout title="About">
      <HtmlHead title="About" url="/about" />

      <VStack spacing={8} align="left" divider={<StackDivider borderColor="gray.200" />}>
        <VStack spacing={2} align="left">
          <HStack justifyContent="center" align="center" w="100%" spacing={8} mb={8}>
            <Avatar src="/images/masahiko_kubara.jpg" name="suzukalight" size="xl" />
            <Avatar src="/images/tarako.jpg" name="suzukalight" size="xl" />
          </HStack>

          <HStack spacing={4}>
            <Text display="inline-block" fontWeight="bold">
              Masahiko Kubara (suzukalight)
            </Text>

            <SNSLinks spacing={3} boxSize={4} color="gray.800" />
          </HStack>

          <Text>
            テックリード・スクラムマスター・フロントエンドエンジニア。修士（メディア科学）。
          </Text>
        </VStack>

        <Box mt={-8}>
          <ArticleDetail contentHtml={content} />
        </Box>

        <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
      </VStack>
    </ArticleListLayout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const { content, ...article } = await getArticle('index', UrlTable.about);
  const contentHtml = await renderToString(content, 'index', UrlTable.about);

  return { props: { article, contentHtml } as IndexPageProps };
};
