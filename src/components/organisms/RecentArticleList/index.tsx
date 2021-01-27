import React, { ReactNode } from 'react';
import { Center, Box, Heading, VStack } from '@chakra-ui/react';

import { CTAButton } from '../../atoms/CTAButton';
import { ArticleUnorderedList } from '../../molecules/ArticleUnorderedList';

import { Article } from '../../../utils/article/entity';

type RecentArticleListProps = {
  image: ReactNode;
  title: string;
  articles: Article[];
  urlPosts: string;
  urlAllArticles: string;
  labelAllArticles: string;
};

export const RecentArticleList: React.FC<RecentArticleListProps> = ({
  image,
  title,
  articles,
  urlPosts,
  urlAllArticles,
  labelAllArticles,
}) => (
  <VStack spacing={4} align="center" w="100%">
    <Center w="100%">{image}</Center>

    <Heading as="h2" fontSize="2xl">
      {title}
    </Heading>

    <ArticleUnorderedList articles={articles} urlPosts={urlPosts} />

    <Box>
      <CTAButton href={urlAllArticles} label={labelAllArticles} />
    </Box>
  </VStack>
);
