import React from 'react';
import { Avatar, VStack, HStack, Stack, Text } from '@chakra-ui/react';

import { SNSLinks } from '../../molecules/SNSLinks';

export const AboutMePhoto: React.FC = () => (
  <VStack spacing={2} align="left">
    <HStack justifyContent="center" align="center" spacing={8} mb={8}>
      <Avatar src="/images/masahiko_kubara.jpg" name="suzukalight" size="xl" />
      <Avatar src="/images/tarako.jpg" name="suzukalight" size="xl" />
    </HStack>

    <Stack direction={['column', 'row']} spacing={[0, 4]} alignSelf="center" align="center">
      <Text display="inline-block" fontSize="lg" fontWeight="bold">
        Masahiko Kubara (suzukalight)
      </Text>

      <SNSLinks spacing={3} boxSize={4} color="gray.800" />
    </Stack>

    <Text>
      Webエンジニア。CS系の修士号。高校在学中に自作の競馬アプリを制作および販売。大学ではGUI・ハードウェア・福祉工学を研究。就職後はテックリード、スクラムマスター、採用育成などを経験。趣味は競馬とゲーム。
    </Text>
  </VStack>
);
