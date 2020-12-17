import React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import {
  ComponentWithAs,
  LinkProps as ChakraLinkProps,
  Link as ChakraLink,
} from '@chakra-ui/react';

type LinkProps = {
  to: string;
  chakraProps?: ComponentWithAs<'a', ChakraLinkProps>;
  nextProps?: React.PropsWithChildren<NextLinkProps>;
};

export const Link: React.FC<LinkProps> = ({ children, to, chakraProps, nextProps }) => (
  <ChakraLink href={to} {...chakraProps}>
    <NextLink href={to} {...nextProps}>
      {children}
    </NextLink>
  </ChakraLink>
);
