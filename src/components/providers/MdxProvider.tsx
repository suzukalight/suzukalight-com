/* eslint-disable react/display-name */

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Heading, Text, Box, Link, Code } from '@chakra-ui/react';

export function MdxComponentProvider(props) {
  const state = {
    h1: (props) => <Heading as="h1" mt={3} mb={2} {...props} />,
    h2: (props) => <Heading as="h2" mt={3} mb={2} {...props} />,
    h3: (props) => <Heading as="h3" mt={3} mb={2} {...props} />,
    h4: (props) => <Heading as="h4" mt={3} mb={2} {...props} />,
    p: (props) => <Text as="p" mb={2} lineHeight={2} {...props} />,
    a: (props) => <Link as="a" color="teal.500" {...props} />,
    code: (props) => <Code {...props} />,
  };

  return (
    <MDXProvider components={state}>
      <Box {...props} />
    </MDXProvider>
  );
}
