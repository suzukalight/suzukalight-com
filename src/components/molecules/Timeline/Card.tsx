import React, { ReactNode } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

export type TimelineCardData = {
  title: string;
  image?: ReactNode;
  url?: string;
  description?: string;
  period?: {
    from?: string;
    to?: string;
  };
};

type TimelineCardProps = {
  data: TimelineCardData;
};

export const TimelineCard: React.FC<TimelineCardProps> = ({
  data: { title, period, description },
}) => (
  <Flex
    direction="column"
    minW={['208px', '208px', '312px']}
    maxW={['208px', '208px', '312px']}
    minH={['128px', '128px', '192px']}
    p={4}
    borderRadius={3}
    backgroundColor="teal.500"
  >
    <Heading as="h3" flexShrink={0} fontSize={['md', 'md', 'lg']} color="white">
      {title}
    </Heading>

    {description && (
      <Text flexGrow={1} mt={2} fontSize="sm" color="white">
        {description}
      </Text>
    )}

    {period && (
      <Box flexShrink={0} color="gray.100">
        {period?.from && (
          <Text as="small" fontSize="sm">
            {period.from}
          </Text>
        )}
        {(period?.from || period?.to) && (
          <Text as="small" fontSize="sm">
            {' - '}
          </Text>
        )}
        {period?.to && (
          <Text as="small" fontSize="sm">
            {period.to}
          </Text>
        )}
      </Box>
    )}
  </Flex>
);
