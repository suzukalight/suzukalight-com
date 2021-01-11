import React from 'react';
import { Icon, LayoutProps, Tooltip, ColorProps, Placement } from '@chakra-ui/react';
import { IconType } from 'react-icons';

import { Link } from '../Link';

type SNSLinkItemProps = {
  url: string;
  label: string;
  icon: IconType;
  boxSize: LayoutProps['boxSize'];
  ariaLabel: string;
  color?: ColorProps['color'];
  colorHover?: ColorProps['color'];
  placement?: Placement;
};

export const SNSLinkItem: React.FC<SNSLinkItemProps> = ({
  url,
  label,
  icon,
  boxSize,
  ariaLabel,
  color,
  colorHover,
  placement,
}) => (
  <Link to={url}>
    <Tooltip label={label} shouldWrapChildren hasArrow placement={placement ?? 'top'}>
      <Icon
        as={icon}
        boxSize={boxSize}
        color={color ?? 'teal.800'}
        _hover={{ color: colorHover ?? 'teal.500' }}
        aria-label={ariaLabel}
      />
    </Tooltip>
  </Link>
);
