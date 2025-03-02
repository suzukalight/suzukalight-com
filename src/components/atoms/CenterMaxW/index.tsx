import React from 'react';
import { Box, SpaceProps, LayoutProps } from '@chakra-ui/react';

type CenterMaxWProps = {
  children: React.ReactNode;
  margin?: SpaceProps['m'];
  maxWidth?: LayoutProps['maxW'];
};

export const CenterMaxW: React.FC<CenterMaxWProps> = ({ children, margin, maxWidth }) => (
  <Box py={8}>
    <Box m={margin ?? '1em'}>
      <Box maxW={maxWidth ?? '40em'} mx="auto">
        {children}
      </Box>
    </Box>
  </Box>
);
