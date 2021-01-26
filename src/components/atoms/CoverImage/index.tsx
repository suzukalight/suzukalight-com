import React from 'react';
import Image from 'next/image';
import { Center, Flex, Text } from '@chakra-ui/react';

import styles from './index.module.scss';

export type CoverImageProps = {
  imageSrc?: string;
  emoji?: string;
};

export const CoverImage: React.FC<CoverImageProps> = ({ imageSrc, emoji }) =>
  !imageSrc && !emoji ? null : (
    <Flex position="relative" justifyContent="center" alignItems="center">
      <Center
        w="100%"
        h={['12em', '12em', '16em']}
        borderRadius={8}
        flexShrink={0}
        backgroundColor="gray.100"
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Cover image"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        )}
        {emoji && <Text fontSize={['4em', '4em', '5em']}>{emoji}</Text>}
      </Center>
    </Flex>
  );
