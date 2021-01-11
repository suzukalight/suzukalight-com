import React from 'react';
import { Center, Box, SimpleGrid, StackDivider, Text, VStack, HStack } from '@chakra-ui/react';
import { FaTwitter, FaGithub } from 'react-icons/fa';

import { Link } from '../../atoms/Link';
import { SNSLinkItem } from '../../atoms/SNSLinkItem';
import { SNSLinks } from '../../molecules/SNSLinks';

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
            <SNSLinkItem
              url="https://twitter.com/intent/tweet?screen_name=suzukalight"
              label="@suzukalight にメッセージを送る"
              icon={FaTwitter}
              boxSize={6}
              color="gray.800"
              ariaLabel="Twitter で @suzukalight にメッセージを送る"
            />

            <SNSLinkItem
              url="https://github.com/suzukalight/suzukalight/issues"
              label="suzukalight にメッセージを送る"
              icon={FaGithub}
              boxSize={6}
              color="gray.800"
              ariaLabel="GitHub で suzukalight にメッセージの Issue を立てる"
            />
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>

    <Center mt={-6}>
      <HStack spacing={4} align="center">
        <Link to="/">
          <Text as="small" textDecoration="underline">
            Home
          </Text>
        </Link>

        <Text as="small" pt={1}>
          ©︎ suzukalight
        </Text>

        <SNSLinks spacing={3} boxSize={3} color="gray.500" />
      </HStack>
    </Center>
  </VStack>
);
