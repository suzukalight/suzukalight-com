import React, { useRef } from 'react';
import { GetStaticProps } from 'next';
import { Box, Heading, SimpleGrid, GridItem, Text, VStack, Icon } from '@chakra-ui/react';

import { DefaultLayout } from '../components/templates/DefaultLayout';
import { HtmlHead } from '../components/molecules/HtmlHead';
import { Hero } from '../components/molecules/Hero';
import { CenterMaxW } from '../components/atoms/CenterMaxW';

import { Article } from '../utils/article/entity';
import { getArticles } from '../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../utils/article/sorter';
import { UrlTable } from '../utils/path/url';
import { AboutMePhoto } from '../components/molecules/AboutMePhoto';
import { AboutMeCards } from '../components/molecules/AboutMeCards';
import { CTAButton } from '../components/atoms/CTAButton';
import { ArticleUnorderedList } from '../components/molecules/ArticleUnorderedList';
import { FaCode, FaPencilAlt } from 'react-icons/fa';

type HomePageProps = {
  blogArticles: Article[];
  snippetArticles: Article[];
};

export const HomePage: React.FC<HomePageProps> = ({ blogArticles, snippetArticles }) => {
  const refAbout = useRef<HTMLDivElement>();

  return (
    <DefaultLayout>
      <HtmlHead />

      <Hero
        title="suzukalight.com"
        subtitle={`"なければ作ればいいじゃない"`}
        image="images/hero/01.webp"
        refElement={refAbout}
      />

      <Box backgroundColor="gray.50" minH="16em" px={[0, 8, 16, 24]} py={4} ref={refAbout}>
        <CenterMaxW maxWidth="60em">
          <VStack spacing={8} align="center">
            <Heading as="h1" fontSize="3xl" pb={4}>
              <Text as="span">About</Text>
            </Heading>

            <AboutMePhoto />

            <Box pt={8}>
              <AboutMeCards />
            </Box>

            <CTAButton to={UrlTable.about} label="READ MORE→" />
          </VStack>
        </CenterMaxW>
      </Box>

      <Box minH="16em" px={[0, 8, 16, 24]} py={4}>
        <CenterMaxW maxWidth="60em">
          <VStack spacing={8} align="center">
            <Heading as="h1" fontSize="3xl" pb={4}>
              <Text as="span">Writings</Text>
            </Heading>

            <SimpleGrid columns={[1, 1, 2, 2]} gap={24} pl={4}>
              <GridItem>
                <ArticleUnorderedList
                  image={<Icon as={FaPencilAlt} boxSize={12} />}
                  title="Blog"
                  articles={blogArticles}
                  urlPosts={UrlTable.blogPosts}
                  urlAllArticles={UrlTable.blog}
                  labelAllArticles="すべてのBlog →"
                />
              </GridItem>

              <GridItem>
                <ArticleUnorderedList
                  image={<Icon as={FaCode} boxSize={12} />}
                  title="Snippet"
                  articles={snippetArticles}
                  urlPosts={UrlTable.snippetPosts}
                  urlAllArticles={UrlTable.snippet}
                  labelAllArticles="すべてのSnippet →"
                />
              </GridItem>
            </SimpleGrid>
          </VStack>
        </CenterMaxW>
      </Box>
    </DefaultLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const snippetArticles = await getArticles(UrlTable.snippet);
  const snippetArticlesSorted = sortArticlesByDateDesc(snippetArticles).slice(0, 6);

  const blogArticles = await getArticles(UrlTable.blog);
  const blogArticlesSorted = sortArticlesByDateDesc(blogArticles).slice(0, 6);

  // const pickupArticles = await Promise.all(
  //   [
  //     '2020-12-31-2020-reflection',
  //     '2020-12-30-react-tech-stack',
  //     '2019-09-09-react-i18next',
  //     '2019-09-06-join-carrot-club',
  //     '2019-02-05-to-release-smartphone-app',
  //     '2018-12-08-frontend-technology-selection',
  //   ].map(async (slug) => await getArticle(slug, UrlTable.blog)),
  // );

  return {
    props: {
      // pickupArticles,
      blogArticles: blogArticlesSorted,
      snippetArticles: snippetArticlesSorted,
    } as HomePageProps,
  };
};
