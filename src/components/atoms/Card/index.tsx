import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';

type CardProps = {
  image: React.ReactNode;
  title: string;
  description: string;
};

export const Card: React.FC<CardProps> = ({ image, title, description }) => (
  <Box borderWidth="1px" borderRadius="lg" overflowX="hidden">
    <Center w="100%" h="180px">
      {image}
    </Center>

    <Box p={6}>
      <Heading as="h3" size="md" textAlign="center">
        {title}
      </Heading>

      <Text
        as="p"
        size="md"
        color="teal.800"
        opacity="0.8"
        fontWeight="normal"
        lineHeight={1.5}
        textAlign="center"
      >
        {description}
      </Text>
    </Box>
  </Box>
);
