import React from 'react';
import { Center, Heading, StackProps, Text, VStack } from '@chakra-ui/react';

export type CardProps = {
  image: React.ReactNode;
  title: React.ReactNode;
  supplement: React.ReactNode;
  wrapProps?: StackProps;
};

export const Card: React.FC<CardProps> = ({ image, title, supplement, wrapProps }) => {
  return (
    <VStack
      spacing={0}
      overflow="hidden"
      h={64}
      borderWidth="1px"
      borderRadius="lg"
      shadow="md"
      {...wrapProps}
    >
      <Center flexShrink={0} w="100%" h={32} backgroundColor="gray.100">
        {image}
      </Center>

      <VStack spacing={2} align="left" backgroundColor="white" w="100%" h={32} p={4}>
        <Heading as="h2" overflow="hidden" h={10} fontSize="sm" lineHeight={1.5}>
          {title}
        </Heading>

        <Text as="div" overflow="hidden" maxH={10}>
          {supplement}
        </Text>
      </VStack>
    </VStack>
  );
};
