/* eslint-disable react/display-name */

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import {
  Heading,
  Text,
  Box,
  Link,
  Code,
  ListItem,
  OrderedList,
  UnorderedList,
  Table,
  Tr,
  Td,
  Th,
} from '@chakra-ui/react';

export function MdxComponentProvider(props) {
  const state = {
    h1: (props) => <Heading as="h1" mt="6em" mb="1.5em" fontSize="1.75em" {...props} />,
    h2: (props) => (
      <Heading as="h2" mt="2em" mb="1.5em" fontSize="1.375em" lineHeight="1" {...props} />
    ),
    h3: (props) => <Heading as="h3" {...props} />,
    h4: (props) => <Heading as="h4" {...props} />,
    p: (props) => <Text as="p" fontSize="1.125em" mb="2em" lineHeight="2" {...props} />,
    a: (props) => <Link as="a" color="teal.500" textDecoration="underline" {...props} />,
    code: (props) => <Code w="100%" p="1em" overflowX="auto" {...props} />,
    ul: (props) => <UnorderedList {...props} />,
    ol: (props) => <OrderedList {...props} />,
    li: (props) => <ListItem fontSize="1.125em" lineHeight="2em" ml="1em" mb="0.25em" {...props} />,
    table: (props) => <Table mb="2em" p="0" fontSize="1em" lineHeight="1em" {...props} />,
    tr: (props) => <Tr px="0" py="0.5em" {...props} />,
    th: (props) => (
      <Th p="0.5em" fontSize="0.75em" lineHeight="2em" backgroundColor="gray.50" {...props} />
    ),
    td: (props) => <Td p="0.5em" {...props} />,
  };

  return (
    <MDXProvider components={state}>
      <Box {...props} />
    </MDXProvider>
  );
}
