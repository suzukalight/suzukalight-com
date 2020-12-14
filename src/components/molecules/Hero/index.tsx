import React from 'react';
import Link from 'next/link';
import { Box, Button, Flex, Image, Heading, Stack, Text, Icon } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { FaTwitter, FaGithub } from 'react-icons/fa';

type HeroProps = {
  title: string;
  subtitle: string;
  image: string;
  ctaLink: string;
  ctaText: string;

  [key: string]: any;
};

export const Hero = ({ title, subtitle, image, ctaLink, ctaText, ...rest }: HeroProps) => (
  <Flex
    align="center"
    justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
    direction={{ base: 'column-reverse', md: 'row' }}
    wrap="nowrap"
    minH="70vh"
    px={8}
    mb={16}
    {...rest}
  >
    <Stack
      spacing={4}
      w={{ base: '80%', md: '40%' }}
      align={['center', 'center', 'flex-start', 'flex-start']}
    >
      <Heading
        as="h1"
        size="xl"
        fontWeight="bold"
        color="teal.800"
        textAlign={['center', 'center', 'left', 'left']}
      >
        {title}
      </Heading>

      <Heading
        as="h2"
        size="md"
        color="teal.800"
        opacity="0.8"
        fontWeight="normal"
        lineHeight={1.5}
        textAlign={['center', 'center', 'left', 'left']}
      >
        {subtitle}
      </Heading>

      <Link href={ctaLink}>
        <Button
          size="md"
          rounded="md"
          color={['teal.500', 'teal.500', 'white', 'white']}
          bg={['white', 'white', 'teal.500', 'teal.500']}
          _hover={{
            bg: ['teal.100', 'teal.100', 'teal.600', 'teal.600'],
          }}
          rightIcon={<ArrowRightIcon />}
        >
          {ctaText}
        </Button>
      </Link>

      <Text>
        <Icon as={FaTwitter} boxSize={8} color="teal.500" />
        <Icon as={FaGithub} boxSize={8} />
      </Text>
    </Stack>

    <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
      <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
    </Box>
  </Flex>
);
