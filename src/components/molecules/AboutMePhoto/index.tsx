import React from 'react';
import { Avatar, VStack, HStack, Text } from '@chakra-ui/react';

import { SNSLinks } from '../../molecules/SNSLinks';

export const AboutMePhoto: React.FC = () => (
  <VStack spacing={2} align="left">
    <HStack justifyContent="center" align="center" spacing={8} mb={8}>
      <Avatar src="/images/masahiko_kubara.jpg" name="suzukalight" size="xl" />
      <Avatar src="/images/tarako.jpg" name="suzukalight" size="xl" />
    </HStack>

    <HStack spacing={4}>
      <Text display="inline-block" fontWeight="bold">
        Masahiko Kubara (suzukalight)
      </Text>

      <SNSLinks spacing={3} boxSize={4} color="gray.800" />
    </HStack>

    <Text>テックリード・スクラムマスター・フロントエンドエンジニア。修士（メディア科学）。</Text>
  </VStack>
);
