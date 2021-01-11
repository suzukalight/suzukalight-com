import React from 'react';
import { Box, HStack, VStack, Avatar, Text } from '@chakra-ui/react';

type LogoProps = {
  imageSrc: string;
  name: string;
  supplement?: string;
};

export const Logo: React.FC<LogoProps> = ({ imageSrc, name, supplement }) => (
  <Box w={48} h={12}>
    <HStack spacing={2}>
      <Avatar src={imageSrc} name={name} size="md" />
      <VStack spacing={1} align="left">
        <Text fontSize="lg" fontWeight="600" lineHeight={1}>
          {name}
        </Text>
        {supplement && (
          <Text fontSize="sm" lineHeight={1} color="gray.400">
            {supplement}
          </Text>
        )}
      </VStack>
    </HStack>
  </Box>
);
