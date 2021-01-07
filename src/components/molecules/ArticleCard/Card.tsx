import React from 'react';
import { Center, Text, Img } from '@chakra-ui/react';

import { Article } from '../../../utils/article/entity';
import { Card } from '../../atoms/Card';
import { TagListPlainText } from '../TagList';

type ArticleCardProps = {
  article: Article;
  urlContents: string;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, urlContents }) => {
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
    />
  );
};
