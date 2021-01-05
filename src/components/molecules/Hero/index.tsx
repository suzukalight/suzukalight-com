import React from 'react';
import { Center, Flex, Image, Heading, Stack, Text, ChakraProps } from '@chakra-ui/react';

import { SNSLinks } from '../../atoms/SNSLinks';

type HeroProps = {
  title: string;
  subtitle: string;
  image: string;
  chakraProps?: ChakraProps;
};

export const Hero = ({ title, subtitle, image, chakraProps }: HeroProps) => (
  <Center>
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      wrap="nowrap"
      w={['100%', '100%', '100%', '100%']}
      minH={['70vh', '70vh', '60vh']}
      px={0}
      mb={[8, 8, 16]}
      {...chakraProps}
    >
      <Stack
        spacing={4}
        w={['100%', '100%', '45%']}
        pl={[0, 0, 8, 16, 24]}
        align={['center', 'center', 'flex-start']}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="teal.800"
          textAlign={['center', 'center', 'left']}
        >
          {title}
        </Heading>

        <Text
          as="em"
          size="md"
          color="teal.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left']}
        >
          {subtitle}
        </Text>

        <SNSLinks spacing={3} boxSize={6} />
      </Stack>

      <Image
        src={image}
        alt="hero image"
        fit="cover"
        w={['100%', '100%', '55%']}
        h={['12em', '16em', '20em']}
        mb={[12, 12, 0]}
        shadow="2xl"
      />
    </Flex>
  </Center>
);
