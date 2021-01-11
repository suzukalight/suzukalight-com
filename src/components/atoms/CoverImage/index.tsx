import React from 'react';
import { Image, Center, Text } from '@chakra-ui/react';

type CoverImageProps = {
  imageSrc?: string;
  emoji?: string;
};

export const CoverImage: React.FC<CoverImageProps> = ({ imageSrc, emoji }) => (
  <Center>
    {imageSrc && (
      <Image
        src={imageSrc}
        alt="hero image"
        fit="cover"
        w="100%"
        h={['12em', '12em', '16em']}
        borderRadius={8}
      />
    )}
    {emoji && (
      <Center
        w="100%"
        h={['12em', '12em', '16em']}
        borderRadius={8}
        flexShrink={0}
        backgroundColor="gray.100"
      >
        <Text fontSize={['4em', '4em', '5em']}>{emoji}</Text>
      </Center>
    )}
  </Center>
);
