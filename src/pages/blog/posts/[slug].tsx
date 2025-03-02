import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { VStack, StackDivider } from '@chakra-ui/react';

import { SITE_URL, TWITTER_ID } from '../../../utils/env';
import { Article, stripContent } from '../../../utils/article/entity';
import { getArticle, getArticles, getAvailableSlugs } from '../../../utils/article/fs.server';
import { hydrate, MdxSource } from '../../../utils/article/markdown';
import { renderToString } from '../../../utils/article/markdown.server';
import { getPrevAndNextArticle, getRelatedArticles } from '../../../utils/article/related';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';

import { DefaultLayout } from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/molecules/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { ArticleDetail } from '../../../components/molecules/ArticleDetail';
import { RelatedArticles } from '../../../components/organisms/RelatedArticles';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';
import { ArticleHeader } from '../../../components/molecules/ArticleHeader';
import {
  ShareButtonsHorizontal,
  ShareButtonsLeftFixed,
} from '../../../components/atoms/ShareButtons';

type BlogPostProps = {
  article: Article;
  contentSource: MdxSource;
  relatedArticles: Article[];
  prevArticle?: Article;
  nextArticle?: Article;
};

export const BlogPost: React.FC<BlogPostProps> = ({
  article,
  contentSource,
  relatedArticles,
  prevArticle,
  nextArticle,
}) => {
  const { slug } = article;
  const { title, tags, hero } = article.frontMatter;
  const url = mergeUrlAndSlug(slug, UrlTable.blogPosts);

  const content = hydrate(contentSource, {
    baseImageUrl: getContentsUrlWithSlug(slug, UrlTable.blog),
    baseHref: `${UrlTable.blogPosts}/[slug]`,
    baseAs: url,
  });
  const ogImage = hero ? { image: `/contents${UrlTable.blog}/${slug}/${hero}` } : null;

  return (
    <DefaultLayout>
      <HtmlHead title={title} description={article.excerpt} url={url} {...ogImage} />

      <ShareButtonsLeftFixed url={url} title={title} indexUrl={SITE_URL} twitterId={TWITTER_ID} />

      <CenterMaxW maxWidth="40em">
        <VStack divider={<StackDivider />} spacing={12} align="left">
          <VStack spacing={8} align="left" w="100%">
            <ArticleHeader article={article} urlRoot={UrlTable.blog} urlTags={UrlTable.blogTags} />
            <ArticleDetail content={content} />
            <ShareButtonsHorizontal
              url={url}
              title={title}
              indexUrl={SITE_URL}
              twitterId={TWITTER_ID}
            />
          </VStack>

          <RelatedArticles
            tags={tags}
            relatedArticles={relatedArticles}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
            urlPosts={UrlTable.blogPosts}
            urlTags={UrlTable.blogTags}
          />

          <BackLinks
            links={[
              { href: UrlTable.blog, label: 'ブログ一覧に戻る' },
              { href: UrlTable.home, label: 'ホームに戻る' },
            ]}
          />
        </VStack>
      </CenterMaxW>
    </DefaultLayout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAvailableSlugs(UrlTable.blog);
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  const { content, ...article } = await getArticle(slug, UrlTable.blog, { withContent: true });

  const contentSource = await renderToString(content, {
    baseImageUrl: `/contents${UrlTable.blog}/${slug}`,
    baseHref: `${UrlTable.blogPosts}/[slug]`,
    baseAs: mergeUrlAndSlug(slug, UrlTable.blogPosts),
  });

  const articles = await getArticles(UrlTable.blog);
  const _relatedArticles = getRelatedArticles(article, articles);
  const relatedArticles = _relatedArticles.map((r) => stripContent(r));

  const { prevArticle, nextArticle } = getPrevAndNextArticle(article, articles);

  return {
    props: {
      article,
      contentSource,
      relatedArticles,
      prevArticle,
      nextArticle,
    },
  };
};
