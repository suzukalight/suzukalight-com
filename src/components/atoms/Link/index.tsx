import React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { LinkProps as ChakraLinkProps, Link as ChakraLink } from '@chakra-ui/react';

type LinkProps = {
  to: string;
  as?: string;
  chakraProps?: ChakraLinkProps;
  nextProps?: NextLinkProps;
};

export const Link: React.FC<LinkProps> = ({ children, to, as, chakraProps, nextProps }) => (
  <ChakraLink href={to} {...chakraProps}>
    <NextLink href={to} as={as} {...nextProps}>
      {children}
    </NextLink>
  </ChakraLink>
);
