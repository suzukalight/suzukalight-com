import { Box, Stack, Avatar, Text } from '@chakra-ui/react';
import React from 'react';

export const Logo: React.FC = () => (
  <Box w={40} h={8}>
    <Stack direction="row">
      <Avatar src="/tarako.jpg" name="suzukalight" size="sm" />
      <Text fontSize="lg">suzukalight</Text>
    </Stack>
  </Box>
);

export default Logo;
