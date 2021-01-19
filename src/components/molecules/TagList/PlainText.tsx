import React from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
import {
  Wrap,
  WrapItem,
  TextProps,
  LinkProps as ChakraLinkProps,
  WrapProps,
} from '@chakra-ui/react';

import { mergeUrlAndSlug } from '../../../utils/path/url';

import { Tag } from './Item';
import { Link } from '../../atoms/Link';

const plainTextTagStyle: TextProps = {
  display: 'inline-block',
  mr: 2,
  mb: 1,
  color: 'gray.600',
  fontSize: 'sm',
  lineHeight: 1,
  _hover: { textDecoration: 'underline' },
};

export const getPlainTextTagStyle = () => ({ ...plainTextTagStyle });

type TagListPlainTextProps = {
  tags: string[];
  tagBaseUrl?: string;
  tagLinkChakraProps?: ChakraLinkProps;
  tagLinkNextProps?: NextLinkProps;
  tagItemProps?: TextProps;
  tagWrapProps?: WrapProps;
};

export const TagListPlainText: React.FC<TagListPlainTextProps> = ({
  tags,
  tagBaseUrl,
  tagLinkChakraProps,
  tagLinkNextProps,
  tagItemProps,
  tagWrapProps,
}) => (
  <Wrap spacing={2} {...tagWrapProps}>
    {(tags || []).map((tag) => (
      <WrapItem key={tag}>
        {tagBaseUrl ? (
          <Link
            chakraProps={tagLinkChakraProps}
            nextProps={tagLinkNextProps}
            href={mergeUrlAndSlug(tag, tagBaseUrl)}
          >
            <Tag tag={tag} chakraProps={{ ...plainTextTagStyle, ...tagItemProps }} />
          </Link>
        ) : (
          <Tag key={tag} tag={tag} chakraProps={tagItemProps} />
        )}
      </WrapItem>
    ))}
  </Wrap>
);
