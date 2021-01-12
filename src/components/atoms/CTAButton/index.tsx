import React, { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

import { Link } from '../Link';

type CTAButtonProps = {
  label: ReactNode;
  to: string;
};

export const CTAButton: React.FC<CTAButtonProps> = ({ label, to }) => (
  <Link to={to} chakraProps={{ _hover: { textDecoration: 'none' } }}>
    <Button
      size="lg"
      borderRadius={24}
      backgroundColor="teal.600"
      color="white"
      shadow="md"
      _hover={{ backgroundColor: 'teal.500' }}
    >
      {label}
    </Button>
  </Link>
);
