import React from 'react';
import { Icon, HStack, SystemProps, LayoutProps, Tooltip, ColorProps } from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaFacebookF } from 'react-icons/fa';

import { Link } from '../Link';

type SNSLinksProps = {
  spacing: SystemProps['margin'];
  boxSize: LayoutProps['boxSize'];
  color?: ColorProps['color'];
};

export const SNSLinks: React.FC<SNSLinksProps> = ({ spacing, boxSize, color }) => (
  <HStack spacing={spacing} display="inline-block">
    <Link to="https://twitter.com/suzukalight">
      <Tooltip label="@suzukalight" shouldWrapChildren hasArrow placement="top">
        <Icon
          as={FaTwitter}
          boxSize={boxSize}
          color={color ?? 'teal.800'}
          _hover={{ color: 'teal.500' }}
          aria-label="Twitter"
        />
      </Tooltip>
    </Link>
    <Link to="https://www.facebook.com/masahiko.kubara/">
      <Tooltip label="masahiko.kubara" shouldWrapChildren hasArrow placement="top">
        <Icon
          as={FaFacebookF}
          boxSize={boxSize}
          color={color ?? 'teal.800'}
          _hover={{ color: 'teal.500' }}
          aria-label="Facebook"
        />
      </Tooltip>
    </Link>
    <Link to="https://github.com/suzukalight">
      <Tooltip label="suzukalight" shouldWrapChildren hasArrow placement="top">
        <Icon
          as={FaGithub}
          boxSize={boxSize}
          color={color ?? 'teal.800'}
          _hover={{ color: 'teal.500' }}
          aria-label="GitHub"
        />
      </Tooltip>
    </Link>
  </HStack>
);
