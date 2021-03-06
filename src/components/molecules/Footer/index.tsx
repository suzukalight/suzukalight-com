import React from 'react';
import { Center, Box, SimpleGrid, StackDivider, Text, VStack, HStack } from '@chakra-ui/react';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';

import { Link } from '../../atoms/Link';
import { SNSLinkItem } from '../../atoms/SNSLinkItem';
import { SNSLinks } from '../SNSLinks';

import { mergeUrlAndSlug, UrlTable } from '../../../utils/path/url';

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
      <SimpleGrid columns={[2, 3, 4, 4]} gap={12}>
        <VStack>
          <Text size="sm" fontWeight="bold">
            Writings
          </Text>
          <Link href={UrlTable.blog}>blog</Link>
          <Link href={UrlTable.snippet}>snippet</Link>
          <Link href={UrlTable.course}>course</Link>
        </VStack>

        <VStack>
          <Link href={UrlTable.works}>
            <Text size="sm" fontWeight="bold">
              Works
            </Text>
          </Link>
          <Link href={mergeUrlAndSlug('wistant', UrlTable.worksDetail)}>Wistant</Link>
          <Link href={mergeUrlAndSlug('warasy', UrlTable.worksDetail)}>Warasy</Link>
          <Link href={mergeUrlAndSlug('shining-run', UrlTable.worksDetail)}>Shining Run</Link>
        </VStack>

        <VStack>
          <Link href={UrlTable.about}>
            <Text size="sm" fontWeight="bold">
              About
            </Text>
          </Link>
          <Link href={UrlTable.about}>skill map</Link>
          <Link href={UrlTable.about}>resume</Link>
          <Link href={UrlTable.about}>awards</Link>
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
        <Link href={UrlTable.home}>
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
