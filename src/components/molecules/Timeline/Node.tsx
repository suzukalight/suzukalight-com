import React from 'react';
import { Badge, Box, Text, Heading, Icon, HStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaCircle } from '@react-icons/all-files/fa/FaCircle';

import { TimelineCardData, TimelineCard } from './Card';
import { formatJpYYYYM } from '../../../utils/date/format';

type TimelineNodeProps = {
  icon?: IconType;
  name?: string;
  role?: string;
  period: {
    from?: Date;
    to?: Date;
  };
  isNow?: boolean;
  isLast?: boolean;
  cards?: TimelineCardData[];
};

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  icon,
  name,
  role,
  period,
  isNow,
  isLast,
  cards,
}) => (
  <Box
    _before={
      !isLast && {
        content: '""',
        position: 'absolute',
        left: ['-25px', '-25px', '-37px'],
        top: 0,
        bottom: 0,
        width: '2px',
        background: '#CBD5E0',
      }
    }
    position="relative"
    ml={[10, 10, '164px']}
    pb={6}
  >
    {icon ? (
      <Icon
        as={icon}
        boxSize={[6, 6, 8]}
        position="absolute"
        left={['-36px', '-36px', '-52px']}
        backgroundColor="white"
        color="gray.700"
      />
    ) : (
      <Icon
        as={FaCircle}
        boxSize={3}
        position="absolute"
        left={['-30px', '-30px', '-42px']}
        top="6px"
        backgroundColor="white"
      />
    )}

    {name && (
      <Heading as="h1" fontSize={['lg', 'lg', '2xl']} pb={[0, 0, 2]}>
        {name}
      </Heading>
    )}

    {role && <Text fontSize="md">{role}</Text>}

    <Box
      color="gray.600"
      position={['relative', 'relative', 'absolute']}
      display="block"
      top={['auto', 'auto', 0]}
      left={['auto', 'auto', '-160px']}
      width={['auto', 'auto', '84px']}
      textAlign={['left', 'left', 'right']}
    >
      {period?.from && (
        <Text as="small" fontSize="sm">
          {formatJpYYYYM(period.from)}
        </Text>
      )}
      {(period?.from || period?.to) && (
        <Text as="small" fontSize="sm">
          {' - '}
        </Text>
      )}
      {period?.to && (
        <Text as="small" fontSize="sm">
          {formatJpYYYYM(period.to)}
        </Text>
      )}
      {isNow && (
        <Badge color="teal.500" backgroundColor="teal.50">
          現在
        </Badge>
      )}
    </Box>

    <HStack my={4} spacing={4} alignItems="flex-start" minW="100%" overflowX="auto">
      {cards?.map((card, index) => (
        <TimelineCard key={index} data={card} />
      ))}
    </HStack>
  </Box>
);
