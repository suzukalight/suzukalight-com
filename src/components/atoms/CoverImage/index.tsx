import React from 'react';
import { Image, Center, Text } from '@chakra-ui/react';

type CoverImageProps = {
  hero?: string;
  emoji?: string;
  contentBaseUrl?: string;
};

export const CoverImage: React.FC<CoverImageProps> = ({ hero, emoji, contentBaseUrl }) => (
  <Center>
    {hero && (
      <Image
        src={`${contentBaseUrl}/${hero}`}
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
