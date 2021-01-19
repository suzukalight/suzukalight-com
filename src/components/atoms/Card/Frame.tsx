import React from 'react';
import { Center, Heading, StackProps, Text, VStack } from '@chakra-ui/react';

export type CardFrameProps = {
  image: React.ReactNode;
  title: React.ReactNode;
  supplement: React.ReactNode;
  wrapProps?: StackProps;
};

export const CardFrame: React.FC<CardFrameProps> = ({ image, title, supplement, wrapProps }) => {
  return (
    <VStack spacing={4} overflow="hidden" maxW={80} maxH={72} {...wrapProps}>
      <Center flexShrink={0} w="100%" h={20} overflow="hidden">
        {image}
      </Center>

      <VStack spacing={2} align="center" w="100%" maxH={48} overflow="hidden">
        <Heading
          as="h2"
          h={8}
          overflow="hidden"
          wordBreak="break-all"
          fontSize="xl"
          lineHeight={1.5}
        >
          {title}
        </Heading>

        <Text maxH={36} wordBreak="break-word" fontSize="sm" lineHeight={1.75}>
          {supplement}
        </Text>
      </VStack>
    </VStack>
  );
};
