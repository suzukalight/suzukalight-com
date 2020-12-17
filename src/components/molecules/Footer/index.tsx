import React from 'react';
import { Flex, Center, Box, SimpleGrid, Divider, Text } from '@chakra-ui/react';
import { Link } from '../../atoms/Link';

export const Footer: React.FC = () => (
  <Flex direction="column" alignItems="center" w="100%" backgroundColor="gray.100">
    <Box w="100%" maxW="80em" mt={12}>
      <SimpleGrid columns={[1, 2, 3]} gap={12}>
        <Box textAlign="center">
          <Text size="sm" fontWeight="bold">
            Writings
          </Text>
          <Link to="/blog">blog</Link>
        </Box>

        <Box textAlign="center">
          <Text size="sm" fontWeight="bold">
            Outputs
          </Text>
          <Link to="/products">products</Link>
        </Box>

        <Box textAlign="center">
          <Text size="sm" fontWeight="bold">
            About
          </Text>
          <Link to="/about">skill map</Link>
        </Box>
      </SimpleGrid>
    </Box>

    <Divider mt={8} mb={2} />

    <Center mb={8}>
      <Text as="small">©︎ suzukalight</Text>
    </Center>
  </Flex>
);
