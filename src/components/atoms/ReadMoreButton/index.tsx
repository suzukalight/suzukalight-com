import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type ReadMoreButtonProps = {
  show: boolean;
  onToggle: () => void;
};

export const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({ show, onToggle }) => {
  return show ? (
    <Button
      size="sm"
      mt={2}
      leftIcon={<FaChevronUp />}
      colorScheme="black"
      variant="link"
      onClick={onToggle}
    >
      閉じる
    </Button>
  ) : (
    <Button
      size="sm"
      mt={2}
      leftIcon={<FaChevronDown />}
      colorScheme="black"
      variant="link"
      onClick={onToggle}
    >
      全文を表示
    </Button>
  );
};
