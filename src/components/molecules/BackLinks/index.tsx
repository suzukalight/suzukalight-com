import React from 'react';
import { Text, Icon, VStack } from '@chakra-ui/react';

import { Link } from '../../atoms/Link';

type BackLinksProps = {
  links: Array<{
    to: string;
    label: string;
    icon?: React.ElementType;
  }>;
};

export const BackLinks: React.FC<BackLinksProps> = ({ links }) => (
  <VStack spacing={4} alignItems="flex-start">
    {links.map((link, index) => (
      <Link key={index} to={link.to}>
        <Text>
          ← {link.icon && <Icon as={link.icon!} boxSize={4} />} {link.label}
        </Text>
      </Link>
    ))}
  </VStack>
);
