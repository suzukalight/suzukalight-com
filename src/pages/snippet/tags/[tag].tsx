import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Divider, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { ArticleListLayout } from '../../../components/templates/ArticleListLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { ArticleExcerptItem } from '../../../components/molecules/ArticleExcerptItem';
import { BackLinks } from '../../../components/molecules/BackLinks';

import { Article } from '../../../utils/article/entity';
import { getArticles } from '../../../utils/article/fs.server';
import { getTagsIncludedInArticles } from '../../../utils/article/tag';
import { filterArticleByTag } from '../../../utils/article/filter';
import { sortArticlesByDateDesc } from '../../../utils/article/sorter';
import { renderToString } from '../../../utils/article/markdown.server';
import { getContentsUrl, UrlTable } from '../../../utils/path/url';

type TagPageProps = {
  tag: string;
  data: {
    article: Article;
    contentHtml: string;
  }[];
};

export const TagPage: React.FC<TagPageProps> = ({ tag, data }) => {
  const title = `#${tag} タグの付いた Snippet`;
  const tagUrl = `${UrlTable.snippetTags}/${encodeURIComponent(tag)}`;

  return (
    <ArticleListLayout title={title}>
      <HtmlHead title={title} url={tagUrl} />

      <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
        {data.map((d) => (
          <ArticleExcerptItem
            key={d.article.slug}
            article={d.article}
            contentBaseUrl={`${getContentsUrl(UrlTable.snippet)}/${d.article.slug}`}
            tagBaseUrl={UrlTable.snippetTags}
            postBaseUrl={UrlTable.snippetPosts}
            contentHtml={d.contentHtml}
            showReadMore
          />
        ))}
      </VStack>

      <Divider mt={12} mb={8} />

      <BackLinks
        links={[
          { to: UrlTable.snippetTags, icon: FaPencilAlt, label: 'Back to TagList' },
          { to: UrlTable.snippet, icon: FaPencilAlt, label: 'Back to Snippet Index' },
          { to: '/', icon: FaHome, label: 'Back to Home' },
        ]}
      />
    </ArticleListLayout>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles(UrlTable.snippet);
  const tags = getTagsIncludedInArticles(articles);
  const paths = tags.map((tag) => ({ params: { tag: encodeURIComponent(tag) } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params.tag as string;

  const articles = await getArticles(UrlTable.snippet);
  const articlesFilteredByTag = filterArticleByTag(articles, tag);
  const data = await Promise.all(
    sortArticlesByDateDesc(articlesFilteredByTag).map(async ({ content, ...article }) => ({
      article,
      contentHtml: await renderToString(content, article.slug, getContentsUrl(UrlTable.snippet)),
    })),
  );

  return { props: { tag, data } as TagPageProps };
};
