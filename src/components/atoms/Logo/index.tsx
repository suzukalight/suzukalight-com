import React from 'react';
import Image from 'next/image';
import { Box, HStack, VStack, Flex, Center, Text } from '@chakra-ui/react';

import styles from './index.module.scss';

type LogoProps = {
  imageSrc: string;
  name: string;
  supplement?: string;
};

export const Logo: React.FC<LogoProps> = ({ imageSrc, name, supplement }) => (
  <Box w={48} h={12}>
    <HStack spacing={2}>
      <Flex position="relative" justifyContent="center" alignItems="center">
        <Center w={12} h={12} borderRadius={9999} backgroundColor="orange.400">
          <Image
            src={imageSrc}
            alt="Cover image"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </Center>
      </Flex>
      <VStack spacing={1} align="left">
        <Text fontSize="lg" fontWeight="600" lineHeight={1}>
          {name}
        </Text>
        {supplement && (
          <Text fontSize="sm" lineHeight={1} color="gray.400">
            {supplement}
          </Text>
        )}
      </VStack>
    </HStack>
  </Box>
);
