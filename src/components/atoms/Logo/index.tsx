import { Box, Avatar, Text } from '@chakra-ui/react';
import React from 'react';

export const Logo: React.FC = () => (
  <Box>
    <Text fontSize="lg">
      <Avatar borderRadius="full" boxSize={8} src="tarako.jpg" name="suzukalight" mr={3} />
      suzukalight
    </Text>
  </Box>
);

export default Logo;
