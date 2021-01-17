import React from 'react';
import { Text, Icon, VStack } from '@chakra-ui/react';

import { Link } from '../../atoms/Link';

type BackLinksProps = {
  links: Array<{
    href: string;
    label: string;
    icon?: React.ElementType;
  }>;
};

export const BackLinks: React.FC<BackLinksProps> = ({ links }) => (
  <VStack spacing={2} alignItems="flex-start">
    {links.map((link, index) => (
      <Link key={index} href={link.href}>
        <Text>
          ← {link.icon && <Icon as={link.icon!} boxSize={4} />} {link.label}
        </Text>
      </Link>
    ))}
  </VStack>
);
