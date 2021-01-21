import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, Box, SimpleGrid } from '@chakra-ui/react';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { CardCatalog } from '../../components/atoms/Card/Catalog';
import { NextImageOrEmoji } from '../../components/atoms/NextImage/ImageOrEmoji';
import { BackLinks } from '../../components/molecules/BackLinks';

import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../utils/path/url';
import { Link } from '../../components/atoms/Link';

type IndexPageProps = {
  works: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ works }) => (
  <ArticleListLayout title="Works" boxProps={{ maxW: '60em' }}>
    <HtmlHead title="Works" url={UrlTable.work} />

    <SimpleGrid columns={[1, 1, 2, 3]} columnGap={4} rowGap={16}>
      {works.map(({ frontMatter, slug }) => (
        <Link key={slug} href={mergeUrlAndSlug(slug, UrlTable.workDetail)}>
          <Box w="100%" maxH="20em">
            <CardCatalog
              image={
                <NextImageOrEmoji
                  src={mergeUrlAndSlug(
                    frontMatter.hero,
                    getContentsUrlWithSlug(slug, UrlTable.work),
                  )}
                  emoji={frontMatter.emoji}
                  width="100%"
                  height="12em"
                  objectFit="cover"
                  divStyle={{ marginBottom: 0 }}
                />
              }
              title={frontMatter.title}
              supplement={frontMatter.supplement}
              wrapProps={{ justifySelf: 'center', alignSelf: 'center' }}
            />
          </Box>
        </Link>
      ))}
    </SimpleGrid>

    <Divider mt={12} mb={8} />

    <BackLinks links={[{ href: UrlTable.home, label: 'ホームに戻る' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const works = await getArticles(UrlTable.work);
  const worksSorted = sortArticlesByDateDesc(works);

  return { props: { works: worksSorted } as IndexPageProps };
};
