import React from 'react';
import { Flex, Box, ChakraProps } from '@chakra-ui/react';

import { Header } from '../../molecules/Header';
import { Footer } from '../../molecules/Footer';

type DefaultLayoutProps = ChakraProps;

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, ...props }) => (
  <Flex direction="column" align="center" minH="100vh" m="0 auto" {...props}>
    <Header />

    <Box flexGrow={1} w="100%" mt={16} overflowX="hidden">
      <Box m="0 auto">{children}</Box>
    </Box>

    <Footer />
  </Flex>
);

export default DefaultLayout;
