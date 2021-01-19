import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Flex, Box, VStack, Divider, Button, ButtonProps, Stack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import { Article, stripContent } from '../../../utils/article/entity';
import { getArticle, getArticles, getAvailableSlugs } from '../../../utils/article/fs.server';
import { hydrate } from '../../../utils/article/markdown';
import { renderToString } from '../../../utils/article/markdown.server';
import { getPrevAndNextArticle } from '../../../utils/article/related';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';
import { comparatorSlugAsc, sortArticles } from '../../../utils/article/sorter';

import { Header } from '../../../components/molecules/Header';
import { HtmlHead } from '../../../components/molecules/HtmlHead';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';
import { ArticleHeader } from '../../../components/molecules/ArticleHeader';
import { ArticleDetail } from '../../../components/molecules/ArticleDetail';
import { Link } from '../../../components/atoms/Link';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { ChapterMenu } from '../../../components/molecules/Chapters/Menu';

const prevNextButtonStyle: ButtonProps = {
  isFullWidth: true,
  px: 4,
  py: 8,
  variant: 'outline',
  color: 'teal.600',
  borderColor: 'teal.600',
  backgroundColor: 'transparent',
  _hover: { backgroundColor: 'teal.50' },
};

type CourseChapterProps = {
  course: Article;
  chapter: Article;
  contentHtml: string;
  chapters: Article[];
  prevArticle?: Article;
  nextArticle?: Article;
};

export const CourseChapter: React.FC<CourseChapterProps> = ({
  course,
  chapter,
  contentHtml,
  chapters,
  prevArticle,
  nextArticle,
}) => {
  const { hero } = course.frontMatter;
  const { slug } = chapter;
  const { title } = chapter.frontMatter;
  const urlCourse = mergeUrlAndSlug(course.slug, UrlTable.course);
  const urlChapter = mergeUrlAndSlug(slug, urlCourse);
  const courseHeroUrl = `${getContentsUrlWithSlug(course.slug, UrlTable.course)}/${hero}`;

  const content = hydrate(contentHtml, {
    baseImageUrl: getContentsUrlWithSlug(slug, urlCourse),
    baseHref: `${UrlTable.course}/[title]/[chapter]`,
    baseAs: urlChapter,
  });
  const ogImage = hero ? { image: courseHeroUrl } : null;

  return (
    <Flex direction="column" align="center" w="100%" minH="100vh" m="0 auto" overflowX="hidden">
      <Header />
      <HtmlHead title={title} description={chapter.excerpt} url={urlChapter} {...ogImage} />

      <Box
        as="aside"
        display={['none', 'none', 'none', 'block']}
        flexShrink={0}
        position="fixed"
        overflowY="auto"
        left={0}
        top={0}
        w="15em"
        h="100vh"
        px={4}
        pt={4}
        shadow="md"
      >
        <ChapterMenu course={course} chapters={chapters} selectedChapter={chapter} />
      </Box>

      <Box ml={[0, 0, 0, '15em']} mt="4em">
        <CenterMaxW maxWidth="40em">
          <VStack spacing={8} align="left">
            <ArticleHeader article={chapter} urlRoot={UrlTable.course} course={course} />
            <ArticleDetail contentHtml={content} />
            <Box>
              <Stack direction={['column', 'column', 'row-reverse']} w="100%" spacing={[4, 4, 0]}>
                <Box w={['100%', '100%', '50%']} pl={[0, 0, 2]}>
                  {nextArticle ? (
                    <Link href={mergeUrlAndSlug(nextArticle.slug, urlCourse)}>
                      <Button {...prevNextButtonStyle} rightIcon={<ArrowForwardIcon />}>
                        {nextArticle.frontMatter.title}
                      </Button>
                    </Link>
                  ) : null}
                </Box>

                <Box w={['100%', '100%', '50%']} pr={[0, 0, 2]}>
                  {prevArticle ? (
                    <Link href={mergeUrlAndSlug(prevArticle.slug, urlCourse)}>
                      <Button {...prevNextButtonStyle} leftIcon={<ArrowBackIcon />}>
                        {prevArticle.frontMatter.title}
                      </Button>
                    </Link>
                  ) : null}
                </Box>
              </Stack>
            </Box>
            <Divider mt={12} mb={4} />
            <Box>
              <BackLinks
                links={[
                  { href: urlCourse, label: '表紙に戻る' },
                  { href: UrlTable.course, label: 'コース一覧に戻る' },
                  { href: UrlTable.home, label: 'ホームに戻る' },
                ]}
              />
            </Box>
          </VStack>
        </CenterMaxW>
      </Box>
    </Flex>
  );
};

export default CourseChapter;

export const getStaticPaths: GetStaticPaths = async () => {
  const titles = await getAvailableSlugs(UrlTable.course);
  const _paths = await Promise.all(
    titles.map(async (title) => {
      const slugs = await getAvailableSlugs(mergeUrlAndSlug(title, UrlTable.course));
      return slugs.map((chapter) => ({ params: { title, chapter } }));
    }),
  );

  return {
    fallback: false,
    paths: _paths.flat(),
  };
};

export const getStaticProps: GetStaticProps<CourseChapterProps> = async ({ params }) => {
  const courseSlug = params.title as string;
  const slug = params.chapter as string;
  const urlCourse = mergeUrlAndSlug(courseSlug, UrlTable.course);

  const { content, ...chapter } = await getArticle(slug, urlCourse, { withContent: true });
  const contentHtml = await renderToString(content, {
    baseImageUrl: getContentsUrlWithSlug(slug, urlCourse),
    baseHref: `${UrlTable.course}/[title]/[chapter]`,
    baseAs: mergeUrlAndSlug(slug, urlCourse),
  });

  const _chapters = await getArticles(urlCourse);
  const chapters = sortArticles(_chapters, comparatorSlugAsc);
  const { prevArticle, nextArticle } = getPrevAndNextArticle(chapter, chapters, comparatorSlugAsc);

  const course = await getArticle(courseSlug, UrlTable.course);

  return {
    props: {
      course: stripContent(course),
      chapter,
      contentHtml,
      chapters,
      prevArticle,
      nextArticle,
    },
  };
};
