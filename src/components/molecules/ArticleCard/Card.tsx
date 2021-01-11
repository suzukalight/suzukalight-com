import React from 'react';
import { Center, Text, Img, StackProps } from '@chakra-ui/react';

import { Card } from '../../atoms/Card';
import { TagListPlainText } from '../TagList';

import { Article } from '../../../utils/article/entity';

type ArticleCardProps = {
  article: Article;
  urlContents: string;
  wrapProps?: StackProps;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, urlContents, wrapProps }) => {
  const { frontMatter, slug } = article;
  const { title, hero, emoji, tags } = frontMatter;

  return (
    <Card
      image={
        hero ? (
          <Img
            src={`${urlContents}/${slug}/${hero}`}
            alt={slug}
            w="100%"
            h={32}
            objectFit="cover"
          />
        ) : (
          <Center>
            <Text fontSize="64px">{emoji ?? '📝'}</Text>
          </Center>
        )
      }
      title={title}
      supplement={
        <TagListPlainText
          tags={tags}
          tagWrapProps={{ spacing: 0 }}
          tagItemProps={{ mr: 2, fontSize: 'sm' }}
        />
      }
      wrapProps={wrapProps}
    />
  );
};
