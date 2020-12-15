import React from 'react';
import Link from 'next/link';
import {
  Flex,
  Center,
  Box,
  Heading,
  Link as ChakraLink,
  SimpleGrid,
  Divider,
  Text,
} from '@chakra-ui/react';

export const Footer: React.FC = () => (
  <Flex direction="column" alignItems="center" w="100%" backgroundColor="gray.100">
    <Box w="100%" maxW="1280px" mt={12}>
      <SimpleGrid columns={[1, 2, 3]} gap={12}>
        <Box textAlign="center">
          <Heading as="h4" size="sm">
            Writings
          </Heading>
          <Link href="/blog">
            <ChakraLink href="/blog">blog</ChakraLink>
          </Link>
        </Box>
        <Box textAlign="center">
          <Heading as="h4" size="sm">
            Outputs
          </Heading>
          <Link href="/products">
            <ChakraLink href="/products">products</ChakraLink>
          </Link>
        </Box>
        <Box textAlign="center">
          <Heading as="h4" size="sm">
            About
          </Heading>
          <Link href="/about">
            <ChakraLink href="/about">skill map</ChakraLink>
          </Link>
        </Box>
      </SimpleGrid>
    </Box>

    <Divider mt={8} mb={2} />

    <Center mb={8}>
      <Text color="gray.400">©︎ suzukalight</Text>
    </Center>
  </Flex>
);
