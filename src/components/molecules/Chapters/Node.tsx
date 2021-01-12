import React, { ReactNode } from 'react';
import { Box, Text, Heading, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaCircle } from 'react-icons/fa';

type MarkProps = { icon: IconType };

const Mark: React.FC<MarkProps> = ({ icon }) => (
  <>
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
  </>
);

type ChapterNodeProps = {
  icon?: IconType;
  title?: ReactNode;
  supplement?: ReactNode;
  left?: ReactNode;
  isLast?: boolean;
};

export const ChapterNode: React.FC<ChapterNodeProps> = ({
  icon,
  title,
  supplement,
  left,
  isLast,
}) => (
  <Box
    _before={
      !isLast && {
        content: '""',
        position: 'absolute',
        left: ['-25px', '-25px', '-37px'],
        top: '12px',
        bottom: '-12px',
        width: '2px',
        background: '#CBD5E0',
      }
    }
    position="relative"
    ml={[10, 10, 24]}
    pb={4}
  >
    <Mark icon={icon} />

    <Box
      color="gray.600"
      fontWeight="600"
      position={['relative', 'relative', 'absolute']}
      display="block"
      top={['auto', 'auto', 0]}
      left={['auto', 'auto', '-144px']}
      width={['auto', 'auto', '84px']}
      textAlign={['left', 'left', 'right']}
    >
      {left}
    </Box>

    {title && (
      <Heading as="h2" fontSize={['md', 'md', 'lg']} pb={[0, 0, 2]}>
        {title}
      </Heading>
    )}

    {supplement && <Text fontSize="md">{supplement}</Text>}
  </Box>
);
