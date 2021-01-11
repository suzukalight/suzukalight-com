import React from 'react';
import { HStack, SystemProps, LayoutProps, ColorProps } from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaFacebookF } from 'react-icons/fa';

import { SNSLinkItem } from '../../atoms/SNSLinkItem';

type SNSLinksProps = {
  spacing: SystemProps['margin'];
  boxSize: LayoutProps['boxSize'];
  color?: ColorProps['color'];
};

export const SNSLinks: React.FC<SNSLinksProps> = ({ spacing, boxSize, color }) => (
  <HStack spacing={spacing} display="inline-block">
    <SNSLinkItem
      url="https://twitter.com/suzukalight"
      label="@suzukalight"
      icon={FaTwitter}
      boxSize={boxSize}
      color={color ?? 'teal.800'}
      ariaLabel="Twitter"
    />
    <SNSLinkItem
      url="https://www.facebook.com/masahiko.kubara/"
      label="masahiko.kubara"
      icon={FaFacebookF}
      boxSize={boxSize}
      color={color ?? 'teal.800'}
      ariaLabel="Facebook"
    />
    <SNSLinkItem
      url="https://github.com/suzukalight"
      label="suzukalight"
      icon={FaGithub}
      boxSize={boxSize}
      color={color ?? 'teal.800'}
      ariaLabel="GitHub"
    />
  </HStack>
);
