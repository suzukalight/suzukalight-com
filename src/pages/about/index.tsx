import React from 'react';
import { GetStaticProps } from 'next';
import { StackDivider, Avatar, Icon, VStack, HStack, Box, Text } from '@chakra-ui/react';
import { FaHome, FaTwitter, FaGithub, FaFacebookF } from 'react-icons/fa';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { Link } from '../../components/atoms/Link';
import { BackLinks } from '../../components/molecules/BackLinks';
import { ArticleDetail } from '../../components/molecules/ArticleDetail';

import { urlContentsAbout } from '../url.json';
import { getArticleFromMdxSource } from '../../utils/article/entity';
import { getMdxSource } from '../../utils/article/fs.server';
import { hydrate } from '../../utils/article/markdown';
import { renderToString } from '../../utils/article/markdown.server';

type IndexPageProps = {
  contentHtml: string;
};

export const IndexPage: React.FC<IndexPageProps> = ({ contentHtml }) => {
  const contentBaseUrl = `${urlContentsAbout}/index`;
  const content = hydrate(contentHtml, contentBaseUrl);

  return (
    <ArticleListLayout title="About">
      <HtmlHead title="About" url="/about" />

      <VStack spacing={8} align="left" divider={<StackDivider borderColor="gray.200" />}>
        <VStack spacing={2} align="left">
          <HStack justifyContent="center" align="center" w="100%" spacing={8} mb={8}>
            <Avatar src="/images/masahiko_kubara.jpg" name="suzukalight" size="xl" />
            <Avatar src="/images/tarako.jpg" name="suzukalight" size="xl" />
          </HStack>

          <Box>
            <Text mr={4} display="inline-block" fontWeight="bold">
              Masahiko Kubara (suzukalight)
            </Text>

            <HStack spacing={3} display="inline-block">
              <Link to="https://twitter.com/suzukalight">
                <Icon
                  as={FaTwitter}
                  boxSize={4}
                  color="teal.800"
                  _hover={{ color: 'teal.500' }}
                  xlinkTitle="Twitter"
                />
              </Link>
              <Link to="https://www.facebook.com/masahiko.kubara/">
                <Icon
                  as={FaFacebookF}
                  boxSize={4}
                  color="teal.800"
                  _hover={{ color: 'teal.500' }}
                  xlinkTitle="Facebook"
                />
              </Link>
              <Link to="https://github.com/suzukalight">
                <Icon
                  as={FaGithub}
                  boxSize={4}
                  color="teal.800"
                  _hover={{ color: 'teal.500' }}
                  xlinkTitle="GitHub"
                />
              </Link>
            </HStack>
          </Box>

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
  const source = getMdxSource(urlContentsAbout, 'index');
  const { content, ...article } = await getArticleFromMdxSource(source, 'index');
  const contentHtml = await renderToString(content, `${urlContentsAbout}/index`);

  return { props: { article, contentHtml } as IndexPageProps };
};
