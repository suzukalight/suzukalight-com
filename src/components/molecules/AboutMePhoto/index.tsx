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

    <Text>
      Webエンジニア。CS系の修士号。高校在学中に競馬アプリの制作および販売を経験。大学ではGUI・ハードウェア・福祉工学を研究。就職後はテックリード、スクラムマスター、採用育成などを経験。趣味は競馬とゲーム。
    </Text>
  </VStack>
);
