import React from 'react';
import { Center, Flex, Image, Heading, Stack, Text, Icon } from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaFacebookF } from 'react-icons/fa';

type HeroProps = {
  title: string;
  subtitle: string;
  image: string;
  ctaLink: string;
  ctaText: string;

  [key: string]: any;
};

export const Hero = ({ title, subtitle, image, ...rest }: HeroProps) => (
  <Center>
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      wrap="nowrap"
      w={['100%', '100%', '100%', '90%']}
      h="70vh"
      px={8}
      mt={[8, 8, 0]}
      mb={16}
      {...rest}
    >
      <Stack
        spacing={4}
        w={['100%', '100%', '50%']}
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

        {/* 
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
      */}

        <Text>
          <Icon as={FaTwitter} boxSize={6} color="teal.500" mr={3} />
          <Icon as={FaFacebookF} boxSize={6} color="teal.500" mr={3} />
          <Icon as={FaGithub} boxSize={6} color="teal.500" />
        </Text>
      </Stack>
      <Image
        src={image}
        alt="hero image"
        fit="cover"
        w={['100%', '100%', '50%']}
        h={['16em', '16em', '20em']}
        mb={{ base: 12, md: 0 }}
        rounded={{ base: '0.5em', md: '1rem' }}
        shadow="2xl"
      />
    </Flex>
  </Center>
);
