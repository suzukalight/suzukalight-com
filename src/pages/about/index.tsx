import React from 'react';
import { GetStaticProps } from 'next';
import { StackDivider, VStack, Box, SimpleGrid, Heading } from '@chakra-ui/react';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';
import { AboutMePhoto } from '../../components/molecules/AboutMePhoto';
import { AboutMeCards } from '../../components/molecules/AboutMeCards';
import { ArticleDetail } from '../../components/molecules/ArticleDetail';
import { Link } from '../../components/atoms/Link';
import { NextImageOrEmoji } from '../../components/atoms/NextImage';
import { CardCatalog } from '../../components/atoms/Card/Catalog';
import { WorksList } from '../../components/molecules/WorksList';

import { getArticle } from '../../utils/article/fs.server';
import { hydrate, MdxSource } from '../../utils/article/markdown';
import { renderToString } from '../../utils/article/markdown.server';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../utils/path/url';
import { Article } from '../../utils/article/entity';

const MorePrivates = () => (
  <VStack spacing={8} align="left">
    <Heading as="h1" fontSize="2xl">
      掘り下げ記事
    </Heading>

    <SimpleGrid columns={[1, 1, 2, 3]} columnGap={4} rowGap={16} w="100%">
      <Link href={mergeUrlAndSlug('2021-01-23-played-board-games', UrlTable.blogPosts)}>
        <Box w="100%" maxH="20em">
          <CardCatalog
            image={<NextImageOrEmoji src="/images/sankt.jpg" height="12em" />}
            title="プレイしたボードゲーム"
            supplement=""
          />
        </Box>
      </Link>
      <Link href="https://note.com/suzukalight/n/ne0ede6e0394f">
        <Box w="100%" maxH="20em">
          <CardCatalog
            image={<NextImageOrEmoji src="/images/intj.png" height="12em" />}
            title="生い立ち～就職まで @note"
            supplement=""
          />
        </Box>
      </Link>
      <Link href={mergeUrlAndSlug('2019-09-06-join-carrot-club', UrlTable.blogPosts)}>
        <Box w="100%" maxH="20em">
          <CardCatalog
            image={<NextImageOrEmoji src="/images/paddock.jpg" height="12em" />}
            title="一口馬主になるまで"
            supplement=""
          />
        </Box>
      </Link>
    </SimpleGrid>
  </VStack>
);

type IndexPageProps = {
  contentSource: MdxSource;
  pickupWorks: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ contentSource, pickupWorks }) => {
  const content = hydrate(contentSource, {
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
          <ArticleDetail content={content} />
        </Box>

        <MorePrivates />

        <VStack spacing={8} w="100%" align="left">
          <Heading as="h1" fontSize="2xl">
            ポートフォリオピックアップ
          </Heading>

          <WorksList works={pickupWorks} />
        </VStack>

        <BackLinks links={[{ href: UrlTable.home, label: 'ホームに戻る' }]} />
      </VStack>
    </ArticleListLayout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const { content } = await getArticle('index', UrlTable.about, { withContent: true });
  const contentSource = await renderToString(content, {
    baseImageUrl: getContentsUrlWithSlug('index', UrlTable.about),
    baseHref: `${UrlTable.about}/index`,
    baseAs: `${UrlTable.about}/index`,
  });

  const pickupWorks = await Promise.all(
    ['wistant', 'warasy', 'shining-run'].map(
      async (slug) => await getArticle(slug, UrlTable.works),
    ),
  );

  return { props: { contentSource, pickupWorks } as IndexPageProps };
};
