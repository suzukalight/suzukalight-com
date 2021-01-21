import React from 'react';
import { Center, Text, StackProps } from '@chakra-ui/react';

import { Article } from '../../../utils/article/entity';

import { Card } from '../../atoms/Card';
import { TagListPlainText } from '../TagList';
import { NextImageOrEmoji } from '../../atoms/NextImage/ImageOrEmoji';

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
          <NextImageOrEmoji
            src={`${urlContents}/${slug}/${hero}`}
            width="100%"
            height="8em"
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
