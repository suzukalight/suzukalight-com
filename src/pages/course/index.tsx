import React from 'react';
import { GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { CourseItem } from '../../components/molecules/CourseItem';
import { BackLinks } from '../../components/molecules/BackLinks';

import { Article } from '../../utils/article/entity';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { UrlTable } from '../../utils/path/url';

type IndexPageProps = {
  courses: Article[];
};

export const IndexPage: React.FC<IndexPageProps> = ({ courses }) => (
  <ArticleListLayout
    title="Course"
    subtitle="実践形式で学んでいくことができる、コース形式のドキュメントです。"
  >
    <HtmlHead title="Blog" url={UrlTable.blog} />

    <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
      {courses.map((a) => (
        <CourseItem key={a.slug} course={a} urlCourse={UrlTable.course} />
      ))}
    </VStack>

    <Divider mt={12} mb={8} />

    <BackLinks links={[{ to: UrlTable.home, icon: FaHome, label: 'Back to Home' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const courses = await getArticles(UrlTable.course);
  const coursesSorted = sortArticlesByDateDesc(courses);

  return { props: { courses: coursesSorted } as IndexPageProps };
};
