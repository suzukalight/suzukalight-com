import React, { ReactNode } from 'react';
import { Center, Box, Heading, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';

import { Link } from '../../atoms/Link';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { mergeUrlAndSlug } from '../../../utils/path/url';
import { CTAButton } from '../../atoms/CTAButton';

type HomePageProps = {
  image: ReactNode;
  title: string;
  articles: Article[];
  urlPosts: string;
  urlAllArticles: string;
  labelAllArticles: string;
};

export const ArticleUnorderedList: React.FC<HomePageProps> = ({
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

    <UnorderedList listStyleType="disc">
      {articles.map((a) => (
        <ListItem key={a.slug} mb={2}>
          <Link to={mergeUrlAndSlug(a.slug, urlPosts)}>
            <Text>
              <Text as="span" textDecoration="underline solid #1A202C60">
                {a.frontMatter.title}
              </Text>
              <Text as="small" color="gray.500" fontWeight="normal">{` - ${getDateFormatted(
                a,
              )}`}</Text>
            </Text>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>

    <Box>
      <CTAButton to={urlAllArticles} label={labelAllArticles} />
    </Box>
  </VStack>
);
