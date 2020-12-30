import React from 'react';
import { GetStaticProps } from 'next';
import { Box, Heading, Text, Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListItem } from '../../components/molecules/ArticleListItem';
import { DefaultLayout } from '../../components/templates/DefaultLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';

import { Article, ArticleDTO } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { renderToString } from '../../utils/article/markdown.server';
import { urlContentsKnowledge } from '../url.json';

type IndexPageProps = {
  data: {
    article: ArticleDTO;
    contentHtml: string;
  }[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ data }) => (
  <DefaultLayout>
    <HtmlHead title="Knowledge" />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="50em" mx="auto">
          <Heading as="h1" mb={2}>
            Knowledge
          </Heading>
          <Text as="p" fontSize="md" color="gray.500" mb={12}>
            主に技術系の単発ネタを書き留めたメモ。同じところで悩む誰かの役に立てれば。
          </Text>

          <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
            {data.map((d) => (
              <ArticleListItem
                key={d.article.slug}
                article={Article.fromDTO(d.article)}
                contentHtml={d.contentHtml}
                contentBaseUrl={`${urlContentsKnowledge}/${d.article.slug}`}
                showReadMore
              />
            ))}
          </VStack>

          <Divider mt={12} mb={8} />

          <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const articles = getArticles(urlContentsKnowledge);
  const data = await Promise.all(
    sortArticlesByDateDesc(articles).map(async (a) => ({
      article: a.toDTO(),
      contentHtml: await renderToString(a.getContent(), `${urlContentsKnowledge}/${a.getSlug()}`),
    })),
  );

  return { props: { data } };
};
