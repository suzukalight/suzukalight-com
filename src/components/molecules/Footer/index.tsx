import React from 'react';
import Link from 'next/link';
import { Flex, Center, Box, Link as ChakraLink, SimpleGrid, Divider, Text } from '@chakra-ui/react';

export const Footer: React.FC = () => (
  <Flex direction="column" alignItems="center" w="100%" backgroundColor="gray.100">
    <Box w="100%" maxW="80em" mt={12}>
      <SimpleGrid columns={[1, 2, 3]} gap={12}>
        <Box textAlign="center">
          <Text size="sm" fontWeight="bold">
            Writings
          </Text>
          <Link href="/blog">
            <ChakraLink href="/blog">blog</ChakraLink>
          </Link>
        </Box>

        <Box textAlign="center">
          <Text size="sm" fontWeight="bold">
            Outputs
          </Text>
          <Link href="/products">
            <ChakraLink href="/products">products</ChakraLink>
          </Link>
        </Box>

        <Box textAlign="center">
          <Text size="sm" fontWeight="bold">
            About
          </Text>
          <Link href="/about">
            <ChakraLink href="/about">skill map</ChakraLink>
          </Link>
        </Box>
      </SimpleGrid>
    </Box>

    <Divider mt={8} mb={2} />

    <Center mb={8}>
      <Text as="small">©︎ suzukalight</Text>
    </Center>
  </Flex>
);
