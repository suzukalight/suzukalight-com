import React from 'react';
import { GetStaticProps } from 'next';
import { Divider } from '@chakra-ui/react';

import { ArticleListLayout } from '../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../components/molecules/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';
import { CourseList } from '../../components/molecules/Course/List';

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
    <HtmlHead title="Course" url={UrlTable.course} />

    <CourseList courses={courses} />

    <Divider mt={12} mb={8} />

    <BackLinks links={[{ href: UrlTable.home, label: 'ホームに戻る' }]} />
  </ArticleListLayout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const courses = await getArticles(UrlTable.course);
  const coursesSorted = sortArticlesByDateDesc(courses);

  return { props: { courses: coursesSorted } as IndexPageProps };
};
