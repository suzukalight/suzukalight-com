import React from 'react';
import { Center, Heading, StackProps, Text, VStack } from '@chakra-ui/react';

type CardFrameProps = {
  image: React.ReactNode;
  title: React.ReactNode;
  supplement: React.ReactNode;
  wrapProps?: StackProps;
};

export const CardFrame: React.FC<CardFrameProps> = ({ image, title, supplement, wrapProps }) => {
  return (
    <VStack spacing={4} overflow="hidden" maxW={80} h={64} {...wrapProps}>
      <Center flexShrink={0} w="100%" h={20}>
        {image}
      </Center>

      <VStack spacing={2} align="center" w="100%" h={44} overflow="hidden">
        <Heading as="h2" overflow="hidden" h={8} fontSize="xl" lineHeight={1.5}>
          {title}
        </Heading>

        <Text maxH={32} wordBreak="break-word" fontSize="sm">
          {supplement}
        </Text>
      </VStack>
    </VStack>
  );
};
