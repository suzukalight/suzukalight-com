import React from 'react';
import {
  Flex,
  Center,
  Box,
  SimpleGrid,
  Divider,
  Text,
  VStack,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FaTwitter, FaGithub } from 'react-icons/fa';

import { Link } from '../../atoms/Link';

export const Footer: React.FC = () => (
  <Flex direction="column" alignItems="center" w="100%" backgroundColor="gray.100">
    <Box w="100%" maxW="80em" mt={12}>
      <SimpleGrid columns={[2, 2, 3]} gap={12}>
        <VStack>
          <Text size="sm" fontWeight="bold">
            Writings
          </Text>
          <Link to="/blog">blog</Link>
          {/* <Link to="/blog">textbook</Link> */}
          <Link to="/knowledge">knowledge</Link>
        </VStack>
        {/* <VStack>
          <Text size="sm" fontWeight="bold">
            Outputs
          </Text>
          <Link to="/outputs">products</Link>
          <Link to="/outputs">examples</Link>
        </VStack> */}
        <VStack>
          <Link to="/about">
            <Text size="sm" fontWeight="bold">
              About
            </Text>
          </Link>
          <Link to="/about">skill map</Link>
          <Link to="/about">resume</Link>
          <Link to="/about">awards</Link>
        </VStack>
        <VStack>
          <Text size="sm" fontWeight="bold">
            Contact
          </Text>
          <HStack spacing={2}>
            <Link to="https://twitter.com/suzukalight" chakraProps={{ isExternal: true }}>
              <Icon as={FaTwitter} boxSize={4} _hover={{ color: 'teal.500' }} />
            </Link>
            <Link to="https://github.com/suzukalight">
              <Icon as={FaGithub} boxSize={4} _hover={{ color: 'teal.500' }} />
            </Link>
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>

    <Divider mt={8} mb={2} />

    <Center mb={8}>
      <HStack spacing={8} align="center">
        <Link to="/">
          <Text as="small" textDecoration="underline">
            Home
          </Text>
        </Link>
        <Text as="small" mt={1}>
          ©︎ suzukalight
        </Text>
      </HStack>
    </Center>
  </Flex>
);
