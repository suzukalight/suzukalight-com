import React, { ReactNode } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

import { formatJpYYYYM } from '../../../utils/date/format';

export type TimelineCardData = {
  title: string;
  image?: ReactNode;
  url?: string;
  description?: string;
  period?: {
    from?: Date;
    to?: Date;
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
    maxH={['128px', '128px', '192px']}
    overflow="hidden"
    p={4}
    borderRadius={3}
    backgroundColor="gray.100"
  >
    <Heading as="h3" flexShrink={0} fontSize={['md', 'md', 'lg']} color="gray.800">
      {title}
    </Heading>

    {description && (
      <Text
        flexGrow={1}
        mt={2}
        fontSize="sm"
        color="gray.500"
        overflowY="hidden"
        whiteSpace="pre-wrap"
      >
        {description}
      </Text>
    )}

    {period && (
      <Box flexShrink={0} color="gray.400">
        {period?.from && (
          <Text as="small" fontSize="sm">
            {formatJpYYYYM(period.from)}
          </Text>
        )}
        {period?.from && period?.to && (
          <Text as="small" fontSize="sm">
            {' - '}
          </Text>
        )}
        {period?.to && (
          <Text as="small" fontSize="sm">
            {formatJpYYYYM(period.to)}
          </Text>
        )}
      </Box>
    )}
  </Flex>
);
