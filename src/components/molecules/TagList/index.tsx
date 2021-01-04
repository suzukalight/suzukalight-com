import React from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
import { ChakraProps, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

import { Link } from '../../atoms/Link';

const defaultTagStyle: ChakraProps = {
  display: 'inline-block',
  mb: [2, 2, 0],
  mr: [0, 0, 2],
  borderRadius: 8,
  px: 2,
  backgroundColor: 'gray.100',
  fontSize: 'sm',
  lineHeight: 2,
  _hover: { textDecoration: 'underline' },
};
const inlineTextTagStyle: ChakraProps = {
  display: 'inline-block',
  mr: 2,
  mb: 1,
  color: 'gray.600',
  fontSize: 'sm',
  lineHeight: 1,
  _hover: { textDecoration: 'underline' },
};

export const getDefaultTagStyle = () => ({ ...defaultTagStyle });
export const getInlineTextTagStyle = () => ({ ...inlineTextTagStyle });

type TagItemProps = {
  tag: string;
  chakraProps?: ChakraProps;
};

const Tag: React.FC<TagItemProps> = ({ tag, chakraProps }) => (
  <Text as="span" {...(chakraProps || defaultTagStyle)}>{`#${tag}`}</Text>
);

type TagListProps = {
  tags: string[];
  tagBaseUrl?: string;
  tagLinkChakraProps?: ChakraLinkProps;
  tagLinkNextProps?: NextLinkProps;
  tagItemProps?: ChakraProps;
};

export const TagList: React.FC<TagListProps> = ({
  tags,
  tagBaseUrl,
  tagLinkChakraProps,
  tagLinkNextProps,
  tagItemProps,
}) => (
  <>
    {(tags || []).map((tag) =>
      tagBaseUrl ? (
        <Link
          key={tag}
          chakraProps={tagLinkChakraProps}
          nextProps={tagLinkNextProps}
          to={`${tagBaseUrl}/${encodeURIComponent(tag)}`}
        >
          <Tag tag={tag} chakraProps={tagItemProps} />
        </Link>
      ) : (
        <Tag key={tag} tag={tag} chakraProps={tagItemProps} />
      ),
    )}
  </>
);
