import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { VStack, Divider } from '@chakra-ui/react';

import { Article } from '../../../utils/article/entity';
import { getArticle, getArticles, getAvailableSlugs } from '../../../utils/article/fs.server';
import { comparatorSlugAsc, sortArticles } from '../../../utils/article/sorter';
import { mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';

import { HtmlHead } from '../../../components/molecules/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { DefaultLayout } from '../../../components/templates/DefaultLayout';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';
import { CTAButton } from '../../../components/atoms/CTAButton';
import { CourseItem } from '../../../components/molecules/CourseItem/Item';
import { Chapters } from '../../../components/molecules/Chapters/Chapters';

type IndexPageProps = {
  course: Article;
  chapters: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ course, chapters }) => {
  const baseUrl = mergeUrlAndSlug(course.slug, UrlTable.course);

  return (
    <DefaultLayout>
      <HtmlHead title={course.frontMatter.title} url={baseUrl} />

      <CenterMaxW maxWidth="50em">
        <VStack spacing={16} align="left" w="100%">
          <CourseItem
            course={course}
            urlCourse={UrlTable.course}
            cta={
              <CTAButton
                href={mergeUrlAndSlug(chapters[0].slug, baseUrl)}
                label="コースをはじめる→"
              />
            }
          />

          <Chapters urlCourse={baseUrl} chapters={chapters} />
        </VStack>

        <Divider mt={12} mb={8} />

        <BackLinks
          links={[
            { href: UrlTable.course, label: 'コース一覧に戻る' },
            { href: UrlTable.home, label: 'ホームに戻る' },
          ]}
        />
      </CenterMaxW>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await getAvailableSlugs(UrlTable.course);
  const paths = courses.map((title) => ({ params: { title } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const title = params.title as string;
  const course = await getArticle(title, UrlTable.course);

  const chapters = await getArticles(mergeUrlAndSlug(title, UrlTable.course));
  const chaptersSorted = sortArticles(chapters, comparatorSlugAsc);

  return { props: { course, chapters: chaptersSorted } as IndexPageProps };
};
