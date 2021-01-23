import React from 'react';
import { Button, Box, ButtonProps } from '@chakra-ui/react';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaChevronUp } from '@react-icons/all-files/fa/FaChevronUp';

export type ReadMoreButtonProps = {
  show: boolean;
  onToggle: () => void;
};

const defaultButtonStyle: ButtonProps = {
  size: 'sm',
  mt: 2,
  colorScheme: 'black',
  variant: 'link',
};

export const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({ show, onToggle }) => {
  return (
    <Box
      position="relative"
      zIndex={1}
      h={12}
      top={-8}
      mb={-8}
      bgGradient="linear(to-b, transparent, white 25%, white)"
    >
      <Box position="relative" top={4}>
        {show ? (
          <Button {...defaultButtonStyle} leftIcon={<FaChevronUp />} onClick={onToggle}>
            閉じる
          </Button>
        ) : (
          <Button {...defaultButtonStyle} leftIcon={<FaChevronDown />} onClick={onToggle}>
            全文を表示
          </Button>
        )}
      </Box>
    </Box>
  );
};
