import React from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
import {
  ChakraProps,
  Wrap,
  WrapItem,
  LinkProps as ChakraLinkProps,
  WrapProps,
} from '@chakra-ui/react';

import { Tag } from './Item';
import { Link } from '../../atoms/Link';

const plainTextTagStyle: ChakraProps = {
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
  tagItemProps?: ChakraProps;
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
            to={`${tagBaseUrl}/${encodeURIComponent(tag)}`}
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
