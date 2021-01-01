import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Heading, Box, Text, VStack, StackDivider } from '@chakra-ui/react';
import { FaHome, FaPencilAlt } from 'react-icons/fa';

import { Article, ArticleDTO } from '../../../utils/article/entity';
import { urlContentsBlog, urlBlogPosts, urlBlogTags } from '../../url.json';
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

type BlogPostProps = {
  articleDTO: ArticleDTO;
  contentHtml: string;
  relatedArticlesDTO: ArticleDTO[];
  prevArticleDTO?: ArticleDTO;
  nextArticleDTO?: ArticleDTO;
};

export const BlogPost: React.FC<BlogPostProps> = ({
  articleDTO,
  contentHtml,
  relatedArticlesDTO,
  prevArticleDTO,
  nextArticleDTO,
}) => {
  const article = Article.fromDTO(articleDTO);
  const slug = article.getSlug();
  const { title, tags, hero, emoji } = article.getFrontMatter();
  const contentBaseUrl = `${urlContentsBlog}/${slug}`;

  const content = hydrate(contentHtml, contentBaseUrl);

  return (
    <DefaultLayout>
      <HtmlHead title={title} />

      <Box>
        <Box m="1em">
          <Box maxW="40em" mx="auto">
            <VStack divider={<StackDivider />} spacing={12} align="left">
              <Box w="100%">
                <CoverImage hero={hero} emoji={emoji} contentBaseUrl={contentBaseUrl} />

                <Heading as="h1" fontSize={['2xl', '2xl', '3xl']} mt={8} mb={2}>
                  {title}
                </Heading>

                <TagList
                  tags={tags}
                  tagBaseUrl={urlBlogTags}
                  tagItemProps={getInlineTextTagStyle()}
                />

                <Text fontSize="sm" color="gray.600" mt={1} mb={8}>
                  {article.getDateFormatted()}
                </Text>

                <ArticleDetail contentHtml={content} />
              </Box>

              <RelatedArticles
                tags={tags}
                relatedArticlesDTO={relatedArticlesDTO}
                prevArticleDTO={prevArticleDTO}
                nextArticleDTO={nextArticleDTO}
                urlContentsBlog={urlContentsBlog}
                urlBlogPosts={urlBlogPosts}
                urlBlogTags={urlBlogTags}
              />

              <BackLinks
                links={[
                  { to: '/blog', icon: FaPencilAlt, label: 'Back to Blog List' },
                  { to: '/', icon: FaHome, label: 'Back to Home' },
                ]}
              />
            </VStack>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const dirNamesThatHaveMdx = getDirNamesThatHaveMdx(urlContentsBlog);
  const paths = dirNamesThatHaveMdx.map((dir) => ({ params: { slug: dir.replace(/\.mdx?/, '') } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  const source = getMdxSource(urlContentsBlog, slug);
  const article = Article.fromMdxSource(source, slug);

  const contentHtml = await renderToString(
    article.getContent(),
    `${urlContentsBlog}/${params.slug}`,
  );

  const articles = getArticles(urlContentsBlog);

  const relatedArticles = getRelatedArticles(article, articles);
  const relatedArticlesDTO = relatedArticles.map((a) => a.toDTO());

  const { prevArticle, nextArticle } = getPrevAndNextArticle(article, articles);

  return {
    props: {
      articleDTO: article.toDTO(),
      contentHtml,
      relatedArticlesDTO,
      prevArticleDTO: prevArticle?.toDTO() ?? null,
      nextArticleDTO: nextArticle?.toDTO() ?? null,
    },
  };
};
