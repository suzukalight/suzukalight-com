import React from 'react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleList } from '../../../components/molecules/ArticleList';
import {
  ArticleData,
  blogContentsUrl,
  blogRootUrl,
  filterArticleByTag,
  getMdxDataAndContent,
  getTagsIncludedInArticles,
  sortArticlesByDateDesc,
} from '../../../utils/article';
import { getDirNamesThatHaveMdx, getMdxSource } from '../../../utils/article-fs';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';

type IndexPageProps = {
  tag: string;
  articles: ArticleData[];
};

export const TagPage: React.FC<IndexPageProps> = ({ tag, articles }) => {
  const title = `"${tag}"に関する記事一覧`;

  return (
    <DefaultLayout backgroundColor="gray.50">
      <HtmlHead title={title} />

      <Box py={8}>
        <Box m="1em">
          <Box maxW="64em" mx="auto">
            <Heading as="h1" mb={12}>
              {title}
            </Heading>

            <Box mb={8}>
              <ArticleList
                articles={articles}
                blogRootUrl={blogRootUrl}
                blogContentsUrl={blogContentsUrl}
              />
            </Box>

            <Divider mt={12} mb={8} />

            <BackLinks
              links={[
                { to: '/blog/tags', icon: FaPencilAlt, label: 'Back to TagList' },
                { to: '/blog', icon: FaPencilAlt, label: 'Back to Blog Index' },
                { to: '/', icon: FaHome, label: 'Back to Home' },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default TagPage;

export async function getStaticPaths() {
  const dirNamesThatHaveMdx = getDirNamesThatHaveMdx();
  const articles = dirNamesThatHaveMdx.map((slug) => {
    const source = getMdxSource(slug);
    const { data, content } = getMdxDataAndContent(source);

    return {
      slug,
      excerpt: content.substr(0, 128),
      ...data,
    } as ArticleData;
  });
  const tags = getTagsIncludedInArticles(articles);
  const paths = tags.map((tag) => ({ params: { tag } }));

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const mdxDirs = getDirNamesThatHaveMdx();
  const articles = mdxDirs.map((slug) => {
    const source = getMdxSource(slug);
    const { data, content } = getMdxDataAndContent(source);

    return {
      slug,
      excerpt: content.substr(0, 128),
      ...data,
    } as ArticleData;
  });

  const { tag } = params;
  const articlesFilteredByTag = filterArticleByTag(articles, tag);
  return { props: { tag, articles: sortArticlesByDateDesc(articlesFilteredByTag) } };
}
