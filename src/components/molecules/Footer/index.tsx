import React from 'react';
import {
  Center,
  Box,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
  Icon,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { FaTwitter, FaGithub } from 'react-icons/fa';

import { Link } from '../../atoms/Link';

export const Footer: React.FC = () => (
  <VStack
    spacing={8}
    divider={<StackDivider />}
    direction="column"
    alignItems="center"
    w="100%"
    pb={8}
    backgroundColor="gray.100"
  >
    <Box w="100%" maxW="80em" mt={12}>
      <SimpleGrid columns={[2, 2, 3]} gap={12}>
        <VStack>
          <Text size="sm" fontWeight="bold">
            Writings
          </Text>
          <Link to="/blog">blog</Link>
          <Link to="/snippet">snippet</Link>
        </VStack>

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
          <HStack spacing={4}>
            <Link to="https://twitter.com/intent/tweet?screen_name=suzukalight">
              <Tooltip
                label="@suzukalight にメッセージを送る"
                shouldWrapChildren
                hasArrow
                placement="top"
              >
                <Icon
                  as={FaTwitter}
                  boxSize={6}
                  _hover={{ color: 'teal.500' }}
                  xlinkTitle="create a mention for me on twitter"
                />
              </Tooltip>
            </Link>
            <Link to="https://github.com/suzukalight/suzukalight/issues">
              <Tooltip
                label="suzukalight にメッセージを送る"
                shouldWrapChildren
                hasArrow
                placement="top"
              >
                <Icon
                  as={FaGithub}
                  boxSize={6}
                  _hover={{ color: 'teal.500' }}
                  xlinkTitle="create an issue to contact me"
                />
              </Tooltip>
            </Link>
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>

    <Center mt={-6}>
      <HStack spacing={8} align="center">
        <Link to="/">
          <Text as="small" textDecoration="underline">
            Home
          </Text>
        </Link>
        <Text as="small" pt={1}>
          ©︎ suzukalight
        </Text>
      </HStack>
    </Center>
  </VStack>
);
