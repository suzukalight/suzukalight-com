import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

import { Header } from '../../molecules/Header';
import { Footer } from '../../molecules/Footer';

type DefaultLayoutProps = {
  [key: string]: any;
};

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, ...props }) => (
  <Flex direction="column" align="center" m="0 auto" {...props}>
    <Header />

    <Box w="100%" maxW="80em" mt={[16, 16, 0, 0]}>
      {children}
    </Box>

    <Footer />
  </Flex>
);

export default DefaultLayout;
