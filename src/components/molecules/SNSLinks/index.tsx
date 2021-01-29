import React from 'react';
import { HStack, SystemProps, LayoutProps, ColorProps } from '@chakra-ui/react';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';

import { SNSLinkItem } from '../../atoms/SNSLinkItem';

export type SNSLinksProps = {
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
