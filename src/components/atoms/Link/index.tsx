import React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { LinkProps as ChakraLinkProps, Link as ChakraLink } from '@chakra-ui/react';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  chakraProps?: ChakraLinkProps;
  nextProps?: NextLinkProps;
};

export const Link: React.FC<LinkProps> = ({ children, href, chakraProps, nextProps }) => (
  <NextLink href={href} {...nextProps} passHref legacyBehavior>
    <ChakraLink {...chakraProps} isExternal={href.startsWith('http') || href.startsWith('mailto')}>
      {children}
    </ChakraLink>
  </NextLink>
);
