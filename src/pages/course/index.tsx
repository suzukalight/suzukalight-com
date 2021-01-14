import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, VStack, StackDivider, Text } from '@chakra-ui/react';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { CourseItem } from '../../components/molecules/CourseItem';
import { BackLinks } from '../../components/molecules/BackLinks';
import { Link } from '../../components/atoms/Link';

import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { mergeUrlAndSlug, UrlTable } from '../../utils/path/url';

type IndexPageProps = {
  courses: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ courses }) => (
  <ArticleListLayout
    title="Course"
    subtitle="実践形式で学んでいくことができる、コース形式のドキュメントです。"
  >
    <HtmlHead title="Course" url={UrlTable.course} />

    <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
      {courses.map((a) => (
        <CourseItem
          key={a.slug}
          course={a}
          urlCourse={UrlTable.course}
          cta={
            <Link to={mergeUrlAndSlug(a.slug, UrlTable.course)}>
              <Text fontSize="md" textDecoration="underline" _hover={{ color: 'teal.500' }}>
                コースを読む→
              </Text>
            </Link>
          }
          hasTitleLink
        />
      ))}
    </VStack>

    <Divider mt={12} mb={8} />

    <BackLinks links={[{ to: UrlTable.home, label: 'ホームに戻る' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const courses = await getArticles(UrlTable.course);
  const coursesSorted = sortArticlesByDateDesc(courses);

  return { props: { courses: coursesSorted } as IndexPageProps };
};
