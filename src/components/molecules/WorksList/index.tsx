import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';

import { CardCatalog } from '../../atoms/Card/Catalog';
import { NextImageOrEmoji } from '../../atoms/NextImage/ImageOrEmoji';
import { Link } from '../../atoms/Link';

import { Article } from '../../../utils/article/entity';
import { getContentsUrlWithSlug, mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';

export type WorksListProps = {
  works: Article[];
};

export const WorksList: React.FC<WorksListProps> = ({ works }) => (
  <SimpleGrid columns={[1, 1, 2, 3]} columnGap={4} rowGap={16} w="100%">
    {works.map(({ frontMatter, slug }) => (
      <Link key={slug} href={mergeUrlAndSlug(slug, UrlTable.worksDetail)}>
        <Box w="100%">
          <CardCatalog
            image={
              <NextImageOrEmoji
                src={mergeUrlAndSlug(
                  frontMatter.hero,
                  getContentsUrlWithSlug(slug, UrlTable.works),
                )}
                emoji={frontMatter.emoji}
                height="12em"
                width="100%"
              />
            }
            title={frontMatter.title}
            supplement={frontMatter.supplement}
            wrapProps={{ justifySelf: 'center', alignSelf: 'center', width: '100%' }}
          />
        </Box>
      </Link>
    ))}
  </SimpleGrid>
);
