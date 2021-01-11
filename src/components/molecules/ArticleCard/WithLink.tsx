import React from 'react';
import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

import { ArticleCard } from './Card';

import { Article } from '../../../utils/article/entity';

type ArticleCardWithLinkProps = {
  article: Article;
  urlContents: string;
  urlPosts: string;
};

export const ArticleCardWithLink: React.FC<ArticleCardWithLinkProps> = ({
  article,
  urlContents,
  urlPosts,
}) => (
  <Link href={`${urlPosts}/[slug]`} as={`${urlPosts}/${article.slug}`}>
    <ChakraLink
      overflow="hidden"
      href={`${urlPosts}/${article.slug}`}
      _hover={{ textDecoration: 'none' }}
    >
      <ArticleCard
        article={article}
        urlContents={urlContents}
        wrapProps={{ _hover: { borderColor: 'teal.300' } }}
      />
    </ChakraLink>
  </Link>
);