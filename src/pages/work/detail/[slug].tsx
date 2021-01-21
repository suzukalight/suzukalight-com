import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { VStack, StackDivider } from '@chakra-ui/react';

import { SITE_URL, TWITTER_ID } from '../../../utils/env';
import { Article } from '../../../utils/article/entity';
import { getArticle, getAvailableSlugs } from '../../../utils/article/fs.server';
import { hydrate } from '../../../utils/article/markdown';
import { renderToString } from '../../../utils/article/markdown.server';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';

import { DefaultLayout } from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/molecules/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { ArticleDetail } from '../../../components/molecules/ArticleDetail';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';
import { ArticleHeader } from '../../../components/molecules/ArticleHeader';
import {
  ShareButtonsHorizontal,
  ShareButtonsLeftFixed,
} from '../../../components/atoms/ShareButtons';

type BlogPostProps = {
  work: Article;
  contentHtml: string;
};

export const BlogPost: React.FC<BlogPostProps> = ({ work, contentHtml }) => {
  const { slug } = work;
  const { title, hero } = work.frontMatter;
  const url = mergeUrlAndSlug(slug, UrlTable.workDetail);

  const content = hydrate(contentHtml, {
    baseImageUrl: getContentsUrlWithSlug(slug, UrlTable.work),
    baseHref: `${UrlTable.workDetail}/[slug]`,
    baseAs: url,
  });
  const ogImage = hero ? { image: `${getContentsUrlWithSlug(slug, UrlTable.work)}/${hero}` } : null;

  return (
    <DefaultLayout>
      <HtmlHead title={title} description={work.excerpt} url={url} {...ogImage} />

      <ShareButtonsLeftFixed url={url} title={title} indexUrl={SITE_URL} twitterId={TWITTER_ID} />

      <CenterMaxW maxWidth="40em">
        <VStack divider={<StackDivider />} spacing={12} align="left">
          <VStack spacing={8} align="left" w="100%">
            <ArticleHeader article={work} urlRoot={UrlTable.work} />
            <ArticleDetail contentHtml={content} />
            <ShareButtonsHorizontal
              url={url}
              title={title}
              indexUrl={SITE_URL}
              twitterId={TWITTER_ID}
            />
          </VStack>

          <BackLinks
            links={[
              { href: UrlTable.work, label: 'Works一覧に戻る' },
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
  const slugs = await getAvailableSlugs(UrlTable.work);
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  const { content, ...work } = await getArticle(slug, UrlTable.work, { withContent: true });

  const contentHtml = await renderToString(content, {
    baseImageUrl: getContentsUrlWithSlug(slug, UrlTable.work),
    baseHref: `${UrlTable.workDetail}/[slug]`,
    baseAs: mergeUrlAndSlug(slug, UrlTable.workDetail),
  });

  return {
    props: {
      work,
      contentHtml,
    },
  };
};
