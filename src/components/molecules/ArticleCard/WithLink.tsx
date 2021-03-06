import React from 'react';
import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

import { ArticleCard } from './Card';

import { Article } from '../../../utils/article/entity';
import { mergeUrlAndSlug } from '../../../utils/path/url';

export type ArticleCardWithLinkProps = {
  article: Article;
  urlContent: string;
  urlPosts: string;
};

export const ArticleCardWithLink: React.FC<ArticleCardWithLinkProps> = ({
  article,
  urlContent,
  urlPosts,
}) => (
  <Link href={`${urlPosts}/[slug]`} as={mergeUrlAndSlug(article.slug, urlPosts)}>
    <ChakraLink
      overflow="hidden"
      href={mergeUrlAndSlug(article.slug, urlPosts)}
      _hover={{ textDecoration: 'none' }}
    >
      <ArticleCard
        article={article}
        urlContent={urlContent}
        wrapProps={{ _hover: { borderColor: 'teal.300' } }}
      />
    </ChakraLink>
  </Link>
);
