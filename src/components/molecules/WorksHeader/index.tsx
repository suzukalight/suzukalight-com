import React from 'react';
import { Heading, ListItem, UnorderedList, Text, VStack } from '@chakra-ui/react';

import { Article } from '../../../utils/article/entity';
import { getContentsUrlWithSlug } from '../../../utils/path/url';

import { CoverImage } from '../../atoms/CoverImage';
import { formatJpYYYYM } from '../../../utils/date/format';

type GenPeriodTextProps = {
  periodFrom?: string;
  periodTo?: string;
  isNow?: string;
};

const genPeriodText = ({ periodFrom, periodTo, isNow }: GenPeriodTextProps) => {
  if (!periodFrom && !periodTo && !isNow) return '';

  let periodText = '';
  if (periodFrom) periodText += formatJpYYYYM(new Date(periodFrom));
  if (periodFrom || periodTo || isNow) periodText += ' - ';
  if (periodTo) periodText += formatJpYYYYM(new Date(periodTo));
  if (isNow) periodText += '現任';

  return periodText;
};

export type WorksHeaderProps = {
  work: Article;
  urlRoot: string;
};

export const WorksHeader: React.FC<WorksHeaderProps> = ({ work, urlRoot }) => {
  const { slug } = work;
  const { title, supplement, hero, emoji, periodFrom, periodTo, isNow, types, roles } =
    work.frontMatter;
  const imageSrc = `${getContentsUrlWithSlug(slug, urlRoot)}/${hero}`;

  return (
    <VStack spacing={8} align="left" w="100%">
      <CoverImage imageSrc={hero ? imageSrc : null} emoji={emoji} />

      <VStack spacing={2} align="left">
        <Heading as="h1" fontSize={['2xl', '2xl', '3xl']}>
          {title}
        </Heading>

        <Text fontSize="sm" color="gray.600">
          {supplement}
        </Text>
      </VStack>

      <UnorderedList spacing={2}>
        <ListItem fontSize="sm" color="gray.600" ml={6}>
          {`期間 : ${genPeriodText({ periodFrom, periodTo, isNow })}`}
        </ListItem>

        <ListItem fontSize="sm" color="gray.600" ml={6}>
          {`所属 : ${types.join('，')}`}
        </ListItem>

        <ListItem fontSize="sm" color="gray.600" ml={6}>
          {`役割 : ${roles.join('，')}`}
        </ListItem>
      </UnorderedList>
    </VStack>
  );
};
