import React, { useCallback } from 'react';
import {
  Center,
  Flex,
  Box,
  Image,
  Heading,
  Stack,
  Text,
  SlideFade,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { FaArrowDown } from '@react-icons/all-files/fa/FaArrowDown';

import { SNSLinks } from '../SNSLinks';

type HeroProps = {
  title: string;
  subtitle: string;
  image: string;
  refElement: React.MutableRefObject<HTMLDivElement>;
};

export const Hero = ({ title, subtitle, image, refElement }: HeroProps) => {
  const scrollToBlogHeader = useCallback(() => {
    refElement.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [refElement]);

  return (
    <VStack w="100%" minH="calc(100vh - 64px)">
      <Center flexGrow={1} w="100%">
        <Flex
          align="center"
          justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
          direction={{ base: 'column-reverse', md: 'row' }}
          wrap="nowrap"
          w="100%"
          px={0}
          mb={[8, 8, 16]}
        >
          <Box w={['100%', '100%', '45%']} pl={[0, 0, 8, 16, 24]}>
            <SlideFade in offsetX="-4em" offsetY={0}>
              <Stack spacing={4} align={['center', 'center', 'flex-start']}>
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
            </SlideFade>
          </Box>

          <Box
            w={['100%', '100%', '55%']}
            h={['12em', '16em', '20em']}
            mb={[12, 12, 0]}
            shadow="2xl"
            transformOrigin={['none', 'none', '0 100%']}
            overflow="hidden"
            transform={['none', 'none', 'skew(-15deg)']}
          >
            <SlideFade in offsetX="4em" offsetY={0}>
              <Image
                src={image}
                alt="hero image"
                fit="cover"
                w="100%"
                h={['12em', '16em', '20em']}
                fallback={
                  <Box w="100%" h={['12em', '16em', '20em']} backgroundColor="yellow.100" />
                }
                transformOrigin={['none', 'none', '0 100%']}
                overflow="hidden"
                transform={['none', 'none', 'skew(15deg)']}
              />
            </SlideFade>
          </Box>
        </Flex>
      </Center>

      <Center h={16} pb={16}>
        <IconButton
          aria-label="Scroll to Blog section"
          icon={<FaArrowDown />}
          fontSize="2em"
          onClick={scrollToBlogHeader}
        />
      </Center>
    </VStack>
  );
};
