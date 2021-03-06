import React from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
import { TextProps, Wrap, WrapItem, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

import { TagAndCount } from '../../../utils/article/tag';
import { mergeUrlAndSlug } from '../../../utils/path/url';

import { Tag } from './Item';
import { Link } from '../../atoms/Link';

const withCountTagStyle: TextProps = {
  display: 'inline-block',
  mr: 2,
  mb: 1,
  color: 'gray.600',
  fontSize: 'md',
  lineHeight: 1.25,
};

const withCountTagWithLinkStyle: TextProps = {
  ...withCountTagStyle,
  lineHeight: 1,
  _hover: { textDecoration: 'underline' },
};

export const getWithCountTagStyle = () => ({ ...withCountTagStyle });

export type TagListWithCountProps = {
  tagAndCounts: TagAndCount[];
  tagBaseUrl?: string;
  tagLinkChakraProps?: ChakraLinkProps;
  tagLinkNextProps?: NextLinkProps;
  tagItemProps?: TextProps;
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
            href={mergeUrlAndSlug(tag, tagBaseUrl)}
          >
            <Tag
              tag={`${tag} (${count})`}
              chakraProps={{ ...withCountTagWithLinkStyle, ...tagItemProps }}
            />
          </Link>
        ) : (
          <Tag
            key={tag}
            tag={`${tag} (${count})`}
            chakraProps={{ ...withCountTagStyle, ...tagItemProps }}
          />
        )}
      </WrapItem>
    ))}
  </Wrap>
);
