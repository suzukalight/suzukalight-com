import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Heading, Box, Text, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import {
  Article,
  getArticleFromMdxSource,
  getDateFormatted,
  stripContent,
} from '../../../utils/article/entity';
import { urlContentsKnowledge, urlKnowledgePosts, urlKnowledgeTags } from '../../url.json';
import {
  getArticles,
  getDirNamesThatHaveMdx,
  getMdxSource,
} from '../../../utils/article/fs.server';
import { hydrate } from '../../../utils/article/markdown';
import { renderToString } from '../../../utils/article/markdown.server';
import { getPrevAndNextArticle, getRelatedArticles } from '../../../utils/article/related';
import DefaultLayout from '../../../components/templates/DefaultLayout';
import { HtmlHead } from '../../../components/atoms/HtmlHead';
import { BackLinks } from '../../../components/molecules/BackLinks';
import { ArticleDetail } from '../../../components/molecules/ArticleDetail';
import { RelatedArticles } from '../../../components/organisms/RelatedArticles';
import { getInlineTextTagStyle, TagList } from '../../../components/molecules/TagList';
import { CoverImage } from '../../../components/atoms/CoverImage';
import { CenterMaxW } from '../../../components/atoms/CenterMaxW';

type KnowledgePostProps = {
  article: Article;
  contentHtml: string;
  relatedArticles: Article[];
  prevArticle?: Article;
  nextArticle?: Article;
};

export const KnowledgePost: React.FC<KnowledgePostProps> = ({
  article,
  contentHtml,
  relatedArticles,
  prevArticle,
  nextArticle,
}) => {
  const { slug } = article;
  const { title, tags, hero, emoji } = article.frontMatter;
  const KnowledgeUrl = `${urlKnowledgePosts}/${slug}`;
  const contentBaseUrl = `${urlContentsKnowledge}/${slug}`;

  const content = hydrate(contentHtml, contentBaseUrl);
  const ogImage = hero ? { image: `${contentBaseUrl}/${hero}` } : null;

  return (
    <DefaultLayout>
      <HtmlHead title={title} description={article.excerpt} url={KnowledgeUrl} {...ogImage} />

      <CenterMaxW maxWidth="40em">
        <VStack divider={<StackDivider />} spacing={12} align="left">
          <Box w="100%">
            <CoverImage hero={hero} emoji={emoji} contentBaseUrl={contentBaseUrl} />

            <Heading as="h1" fontSize={['2xl', '2xl', '3xl']} mt={8} mb={2}>
              {title}
            </Heading>

            <TagList
              tags={tags}
              tagBaseUrl={urlKnowledgeTags}
              tagItemProps={getInlineTextTagStyle()}
            />

            <Text fontSize="sm" color="gray.600" mt={1} mb={8}>
              {getDateFormatted(article)}
            </Text>

            <ArticleDetail contentHtml={content} />
          </Box>

          <RelatedArticles
            tags={tags}
            relatedArticles={relatedArticles}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
            urlContentsBlog={urlContentsKnowledge}
            urlBlogPosts={urlKnowledgePosts}
            urlBlogTags={urlKnowledgeTags}
          />

          <BackLinks
            links={[
              { to: '/Knowledge', icon: FaPencilAlt, label: 'Back to Knowledge List' },
              { to: '/', icon: FaHome, label: 'Back to Home' },
            ]}
          />
        </VStack>
      </CenterMaxW>
    </DefaultLayout>
  );
};

export default KnowledgePost;

export const getStaticPaths: GetStaticPaths = async () => {
  const dirNamesThatHaveMdx = getDirNamesThatHaveMdx(urlContentsKnowledge);
  const paths = dirNamesThatHaveMdx.map((dir) => ({ params: { slug: dir.replace(/\.mdx?/, '') } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  const source = getMdxSource(urlContentsKnowledge, slug);
  const { content, ...article } = await getArticleFromMdxSource(source, slug);

  const contentHtml = await renderToString(content, `${urlContentsKnowledge}/${params.slug}`);

  const articles = await getArticles(urlContentsKnowledge);
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
