import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import {
  urlContentsSnippet,
  urlSnippetRoot,
  urlSnippetPosts,
  urlSnippetTags,
} from '../../url.json';
import { Article, stripContent } from '../../../utils/article/entity';
import { getArticle, getArticles, getDirNamesThatHaveMdx } from '../../../utils/article/fs.server';
import { hydrate } from '../../../utils/article/markdown';
import { renderToString } from '../../../utils/article/markdown.server';
import { getPrevAndNextArticle, getRelatedArticles } from '../../../utils/article/related';

import { DefaultLayout } from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { ArticleDetail } from '../../../components/molecules/ArticleDetail';
import { RelatedArticles } from '../../../components/organisms/RelatedArticles';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';
import { ArticleHeader } from '../../../components/molecules/ArticleHeader';
import {
  ShareButtonsHorizontal,
  ShareButtonsLeftFixed,
} from '../../../components/atoms/ShareButtons';

type SnippetPostProps = {
  article: Article;
  contentHtml: string;
  relatedArticles: Article[];
  prevArticle?: Article;
  nextArticle?: Article;
};

export const SnippetPost: React.FC<SnippetPostProps> = ({
  article,
  contentHtml,
  relatedArticles,
  prevArticle,
  nextArticle,
}) => {
  const { slug } = article;
  const { title, tags, hero } = article.frontMatter;
  const snippetUrl = `${urlSnippetPosts}/${slug}`;
  const contentBaseUrl = `${urlContentsSnippet}/${slug}`;

  const content = hydrate(contentHtml, contentBaseUrl);
  const ogImage = hero ? { image: `${contentBaseUrl}/${hero}` } : null;

  return (
    <DefaultLayout>
      <HtmlHead title={title} description={article.excerpt} url={snippetUrl} {...ogImage} />

      <ShareButtonsLeftFixed urlBlog={snippetUrl} title={title} />

      <CenterMaxW maxWidth="40em">
        <VStack divider={<StackDivider />} spacing={12} align="left">
          <VStack spacing={8} align="left" w="100%">
            <ArticleHeader
              article={article}
              urlContent={urlContentsSnippet}
              urlTags={urlSnippetTags}
            />
            <ArticleDetail contentHtml={content} />
            <ShareButtonsHorizontal urlBlog={snippetUrl} title={title} />
          </VStack>

          <RelatedArticles
            tags={tags}
            relatedArticles={relatedArticles}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
            urlContentsBlog={urlContentsSnippet}
            urlBlogPosts={urlSnippetPosts}
            urlBlogTags={urlSnippetTags}
          />

          <BackLinks
            links={[
              { to: urlSnippetRoot, icon: FaPencilAlt, label: 'Back to Snippet List' },
              { to: '/', icon: FaHome, label: 'Back to Home' },
            ]}
          />
        </VStack>
      </CenterMaxW>
    </DefaultLayout>
  );
};

export default SnippetPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const dirNamesThatHaveMdx = getDirNamesThatHaveMdx(urlContentsSnippet);
  const paths = dirNamesThatHaveMdx.map((dir) => ({ params: { slug: dir.replace(/\.mdx?/, '') } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  const { content, ...article } = await getArticle(slug, urlContentsSnippet);

  const contentHtml = await renderToString(content, `${urlContentsSnippet}/${params.slug}`);

  const articles = await getArticles(urlContentsSnippet);
  const _relatedArticles = getRelatedArticles(article, articles);
  const relatedArticles = _relatedArticles.map((r) => stripContent(r));

  const { prevArticle, nextArticle } = getPrevAndNextArticle(article, articles);

  return {
    props: {
      article,
      contentHtml,
      relatedArticles,
      prevArticle,
      nextArticle,
    },
  };
};
