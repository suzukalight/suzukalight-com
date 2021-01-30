import React from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
import { TextProps, Wrap, WrapItem, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

import { mergeUrlAndSlug } from '../../../utils/path/url';

import { Tag } from './Item';
import { Link } from '../../atoms/Link';

const roundBoxTagStyle: TextProps = {
  display: 'inline-block',
  borderRadius: 8,
  px: 2,
  backgroundColor: 'gray.100',
  fontSize: 'sm',
  lineHeight: 2,
};

const roundBoxTagWithLinkStyle: TextProps = {
  ...roundBoxTagStyle,
  _hover: { textDecoration: 'underline' },
};

export const getRoundBoxTagStyle = () => ({ ...roundBoxTagStyle });

export type TagListRoundBoxProps = {
  tags: string[];
  tagBaseUrl?: string;
  tagLinkChakraProps?: ChakraLinkProps;
  tagLinkNextProps?: NextLinkProps;
  tagItemProps?: TextProps;
};

export const TagListRoundBox: React.FC<TagListRoundBoxProps> = ({
  tags,
  tagBaseUrl,
  tagLinkChakraProps,
  tagLinkNextProps,
  tagItemProps,
}) => (
  <Wrap spacing={1}>
    {(tags || []).map((tag) => (
      <WrapItem key={tag}>
        {tagBaseUrl ? (
          <Link
            chakraProps={tagLinkChakraProps}
            nextProps={tagLinkNextProps}
            href={mergeUrlAndSlug(tag, tagBaseUrl)}
          >
            <Tag tag={tag} chakraProps={{ ...roundBoxTagWithLinkStyle, ...tagItemProps }} />
          </Link>
        ) : (
          <Tag key={tag} tag={tag} chakraProps={{ ...roundBoxTagStyle, ...tagItemProps }} />
        )}
      </WrapItem>
    ))}
  </Wrap>
);
