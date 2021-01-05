import React from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
import { ChakraProps, Wrap, WrapItem, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

import { Tag } from './Item';
import { Link } from '../../atoms/Link';

const roundBoxTagStyle: ChakraProps = {
  display: 'inline-block',
  borderRadius: 8,
  px: 2,
  backgroundColor: 'gray.100',
  fontSize: 'sm',
  lineHeight: 2,
  _hover: { textDecoration: 'underline' },
};

export const getRoundBoxTagStyle = () => ({ ...roundBoxTagStyle });

type TagListRoundBoxProps = {
  tags: string[];
  tagBaseUrl?: string;
  tagLinkChakraProps?: ChakraLinkProps;
  tagLinkNextProps?: NextLinkProps;
  tagItemProps?: ChakraProps;
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
            to={`${tagBaseUrl}/${encodeURIComponent(tag)}`}
          >
            <Tag tag={tag} chakraProps={{ ...roundBoxTagStyle, ...tagItemProps }} />
          </Link>
        ) : (
          <Tag key={tag} tag={tag} chakraProps={tagItemProps} />
        )}
      </WrapItem>
    ))}
  </Wrap>
);
