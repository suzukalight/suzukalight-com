import React from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
import { ChakraProps, Wrap, WrapItem, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

import { TagAndCount } from '../../../utils/article/tag';

import { Tag } from './Item';
import { Link } from '../../atoms/Link';

const withCountTagStyle: ChakraProps = {
  display: 'inline-block',
  mr: 2,
  mb: 1,
  color: 'gray.600',
  fontSize: 'md',
  lineHeight: 1,
  _hover: { textDecoration: 'underline' },
};

export const getWithCountTagStyle = () => ({ ...withCountTagStyle });

type TagListWithCountProps = {
  tagAndCounts: TagAndCount[];
  tagBaseUrl?: string;
  tagLinkChakraProps?: ChakraLinkProps;
  tagLinkNextProps?: NextLinkProps;
  tagItemProps?: ChakraProps;
};

export const TagListWithCount: React.FC<TagListWithCountProps> = ({
  tagAndCounts,
  tagBaseUrl,
  tagLinkChakraProps,
  tagLinkNextProps,
  tagItemProps,
}) => (
  <Wrap spacing={2}>
    {(tagAndCounts || []).map(({ tag, count }) => (
      <WrapItem key={tag}>
        {tagBaseUrl ? (
          <Link
            chakraProps={tagLinkChakraProps}
            nextProps={tagLinkNextProps}
            href={`${tagBaseUrl}/${encodeURIComponent(tag)}`}
          >
            <Tag
              tag={`${tag} (${count})`}
              chakraProps={{ ...withCountTagStyle, ...tagItemProps }}
            />
          </Link>
        ) : (
          <Tag key={tag} tag={`${tag} (${count})`} chakraProps={tagItemProps} />
        )}
      </WrapItem>
    ))}
  </Wrap>
);
