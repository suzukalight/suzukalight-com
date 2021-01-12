import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Heading, Text, VStack, Stack, Img, Center, Divider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { getArticle, getArticles, getSlugs } from '../../../utils/article/fs.server';
import { sortArticlesByDateAsc } from '../../../utils/article/sorter';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';
import { renderToString } from '../../../utils/article/markdown.server';

import { HtmlHead } from '../../../components/molecules/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { DefaultLayout } from '../../../components/templates/DefaultLayout';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';
import { ArticleDetail } from '../../../components/molecules/ArticleDetail';
import { CTAButton } from '../../../components/atoms/CTAButton';
import { ChapterNode } from '../../../components/molecules/Chapters/Node';
import { Link } from '../../../components/atoms/Link';

type IndexPageProps = {
  course: Article;
  contentHtml: string;
  chapters: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ course, chapters }) => {
  const { slug, excerpt, frontMatter } = course;
  const { title, hero, emoji } = frontMatter;
  const baseUrl = mergeUrlAndSlug(course.slug, UrlTable.course);
  const imageSrc = `${getContentsUrlWithSlug(slug, UrlTable.course)}/${hero}`;

  return (
    <DefaultLayout>
      <HtmlHead title="Blog" url={UrlTable.blog} />

      <CenterMaxW maxWidth="50em">
        <VStack spacing={16} align="left" w="100%">
          <Stack direction={['column', 'column', 'row-reverse']} spacing={[2, 2, 0]} w="100%">
            <Box flexShrink={0} w={['100%', '100%', 48]} ml={[0, 0, 8]}>
              {hero ? (
                <Img
                  src={imageSrc}
                  alt={slug}
                  w="100%"
                  h={48}
                  objectFit="cover"
                  borderRadius={12}
                />
              ) : (
                <Center>
                  <Text fontSize="64px">{emoji ?? '📝'}</Text>
                </Center>
              )}
            </Box>

            <VStack flexGrow={1} align="left">
              <Heading as="h1" fontSize="2xl" lineHeight={1.5}>
                {`"${title}"`}
              </Heading>

              <Box>
                <ArticleDetail contentHtml={excerpt} />
              </Box>

              <Text fontSize="sm" color="gray.600" mt={1} mb={8}>
                {getDateFormatted(course)}
              </Text>

              <CTAButton
                to={mergeUrlAndSlug(chapters[0].slug, baseUrl)}
                label="コースをはじめる→"
              />
            </VStack>
          </Stack>

          <VStack spacing={8} align="left">
            <Heading as="h1" fontSize={['xl', 'xl', '2xl']} borderBottom="sm">
              Chapters
            </Heading>

            <Box>
              {chapters.map((c, index) => (
                <ChapterNode
                  key={c.slug}
                  title={<Link to={mergeUrlAndSlug(c.slug, baseUrl)}>{c.frontMatter.title}</Link>}
                  left={`#${index + 1}`}
                  isLast={index === chapters.length - 1}
                />
              ))}
            </Box>
          </VStack>
        </VStack>

        <Divider mt={12} mb={8} />

        <BackLinks
          links={[
            { to: UrlTable.course, icon: FaPencilAlt, label: 'Back to Course list' },
            { to: UrlTable.home, icon: FaHome, label: 'Back to Home' },
          ]}
        />
      </CenterMaxW>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = getSlugs(UrlTable.course);
  const paths = courses.map((title) => ({ params: { title } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const title = params.title as string;
  const { content, ...course } = await getArticle(title, UrlTable.course);

  const contentHtml = await renderToString(content, title, UrlTable.snippet);

  const chapters = await getArticles(mergeUrlAndSlug(title, UrlTable.course));
  const chaptersSorted = sortArticlesByDateAsc(chapters);

  return { props: { course, contentHtml, chapters: chaptersSorted } as IndexPageProps };
};
