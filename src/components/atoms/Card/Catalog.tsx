import React from 'react';
import { Center, ChakraProps, Heading, StackProps, Text, VStack } from '@chakra-ui/react';

export type CardCatalogProps = {
  image: React.ReactNode;
  title: React.ReactNode;
  supplement: React.ReactNode;
  wrapProps?: StackProps;
  imageWrapProps?: Omit<ChakraProps, 'css'>;
};

export const CardCatalog: React.FC<CardCatalogProps> = ({
  image,
  title,
  supplement,
  wrapProps,
  imageWrapProps,
}) => {
  return (
    <VStack spacing={4} overflow="hidden" {...wrapProps}>
      <Center flexShrink={0} w="100%" h="12em" overflow="hidden" {...imageWrapProps}>
        {image}
      </Center>

      <VStack spacing={2} align="center" w="100%" maxH={48} overflow="hidden">
        <Heading
          as="h2"
          overflow="hidden"
          wordBreak="break-all"
          fontSize="lg"
          fontWeight="600"
          lineHeight={1.125}
        >
          {title}
        </Heading>

        <Text maxH={36} wordBreak="break-word" fontSize="sm" lineHeight={1.125} color="gray.600">
          {supplement}
        </Text>
      </VStack>
    </VStack>
  );
};
