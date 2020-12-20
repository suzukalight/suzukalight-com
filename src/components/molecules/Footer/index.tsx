import React from 'react';
import { Flex, Center, Box, SimpleGrid, Divider, Text, VStack } from '@chakra-ui/react';
import { Link } from '../../atoms/Link';

export const Footer: React.FC = () => (
  <Flex direction="column" alignItems="center" w="100%" backgroundColor="gray.100">
    <Box w="100%" maxW="80em" mt={12}>
      <SimpleGrid columns={[1, 2, 3]} gap={12}>
        <VStack>
          <Text size="sm" fontWeight="bold">
            Writings
          </Text>
          <Link to="/blog">blog</Link>
          <Link to="/blog">textbook</Link>
        </VStack>

        <VStack>
          <Text size="sm" fontWeight="bold">
            Outputs
          </Text>
          <Link to="/outputs">products</Link>
          <Link to="/outputs">examples</Link>
          <Link to="/outputs">knowledge</Link>
        </VStack>

        <VStack>
          <Text size="sm" fontWeight="bold">
            About
          </Text>
          <Link to="/about">skill map</Link>
          <Link to="/about">resume</Link>
          <Link to="/about">awards</Link>
        </VStack>
      </SimpleGrid>
    </Box>

    <Divider mt={8} mb={2} />

    <Center mb={8}>
      <Text as="small">©︎ suzukalight</Text>
    </Center>
  </Flex>
);
