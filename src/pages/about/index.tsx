import React from 'react';
import { GetStaticProps } from 'next';
import { StackDivider, VStack, Box } from '@chakra-ui/react';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';
import { AboutMePhoto } from '../../components/molecules/AboutMePhoto';
import { AboutMeCards } from '../../components/molecules/AboutMeCards';
import { ArticleDetail } from '../../components/molecules/ArticleDetail';

import { getArticle } from '../../utils/article/fs.server';
import { hydrate } from '../../utils/article/markdown';
import { renderToString } from '../../utils/article/markdown.server';
import { getContentsUrlWithSlug, UrlTable } from '../../utils/path/url';

type IndexPageProps = {
  contentHtml: string;
};

export const IndexPage: React.FC<IndexPageProps> = ({ contentHtml }) => {
  const content = hydrate(contentHtml, {
    baseImageUrl: getContentsUrlWithSlug('index', UrlTable.about),
    baseHref: `${UrlTable.about}/index`,
    baseAs: `${UrlTable.about}/index`,
  });

  return (
    <ArticleListLayout title="About">
      <HtmlHead title="About" url="/about" />

      <VStack spacing={8} align="left" divider={<StackDivider borderColor="gray.200" />}>
        <AboutMePhoto />
        <AboutMeCards />

        <Box mt={-8}>
          <ArticleDetail contentHtml={content} />
        </Box>

        <BackLinks links={[{ href: UrlTable.home, label: 'ホームに戻る' }]} />
      </VStack>
    </ArticleListLayout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const { content, ...article } = await getArticle('index', UrlTable.about, { withContent: true });
  const contentHtml = await renderToString(content, {
    baseImageUrl: getContentsUrlWithSlug('index', UrlTable.about),
    baseHref: `${UrlTable.about}/index`,
    baseAs: `${UrlTable.about}/index`,
  });

  return { props: { article, contentHtml } as IndexPageProps };
};
