import React from 'react';
import { ListItem, Text, UnorderedList } from '@chakra-ui/react';

import { Link } from '../../atoms/Link';

import { Article, getDateFormatted } from '../../../utils/article/entity';
import { mergeUrlAndSlug } from '../../../utils/path/url';

export type ArticleUnorderedListProps = {
  articles: Article[];
  urlPosts: string;
};

export const ArticleUnorderedList: React.FC<ArticleUnorderedListProps> = ({
  articles,
  urlPosts,
}) => (
  <UnorderedList listStyleType="disc">
    {articles.map((a) => (
      <ListItem key={a.slug} mb={2}>
        <Link href={mergeUrlAndSlug(a.slug, urlPosts)}>
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
);
