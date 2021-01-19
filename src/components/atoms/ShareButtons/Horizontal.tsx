import React from 'react';
import { HStack, IconProps } from '@chakra-ui/react';

import { ShareButtons } from './Buttons';

export type ShareButtonsHorizontalProps = {
  url: string;
  title: string;
  indexUrl: string;
  twitterId?: string;
  iconProps?: Omit<IconProps, 'css'>;
};

export const ShareButtonsHorizontal: React.FC<ShareButtonsHorizontalProps> = ({
  title,
  url,
  indexUrl,
  twitterId,
  iconProps,
}) => (
  <HStack spacing={4}>
    <ShareButtons
      url={url}
      title={title}
      tooltipPlacement="top"
      indexUrl={indexUrl}
      twitterId={twitterId}
      iconProps={iconProps}
    />
  </HStack>
);
