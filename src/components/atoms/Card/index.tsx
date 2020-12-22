import React from 'react';
import { Box, Flex, Center, Heading, Text } from '@chakra-ui/react';

type CardProps = {
  image: React.ReactNode;
  title: string;
  description: string;
};

export const Card: React.FC<CardProps> = ({ image, title, description }) => (
  <Flex
    direction={['row', 'column']}
    overflowX="hidden"
    minH="100%"
    borderWidth="1px"
    borderRadius="lg"
    p={4}
  >
    <Center flexShrink={0} w={[16, '100%']} minH={['100%', '180px']}>
      {image}
    </Center>

    <Box flexGrow={1}>
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
  </Flex>
);
