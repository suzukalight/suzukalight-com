import React from 'react';
import { Icon, IconProps, Placement, Tooltip } from '@chakra-ui/react';
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton,
} from 'react-share';
import { FaFacebook, FaGetPocket, FaLine, FaTwitter } from 'react-icons/fa';
import { SiHatenabookmark } from 'react-icons/si';

type ShareButtonsProps = {
  url: string;
  title: string;
  tooltipPlacement: Placement;
  indexUrl: string;
  twitterId?: string;
  iconProps?: Omit<IconProps, 'css'>;
};

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  url: _url,
  title,
  tooltipPlacement,
  indexUrl,
  twitterId,
  iconProps,
}) => {
  const url = new URL(_url, indexUrl).toString();

  return (
    <>
      <TwitterShareButton url={url} title={title} via={twitterId}>
        <Tooltip label="Twitterでシェア" shouldWrapChildren hasArrow placement={tooltipPlacement}>
          <Icon
            as={FaTwitter}
            boxSize={6}
            fill="gray.400"
            _hover={{ fill: 'teal.500' }}
            {...iconProps}
          />
        </Tooltip>
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <Tooltip label="Facebookでシェア" shouldWrapChildren hasArrow placement={tooltipPlacement}>
          <Icon
            as={FaFacebook}
            boxSize={6}
            fill="gray.400"
            _hover={{ fill: 'teal.500' }}
            {...iconProps}
          />
        </Tooltip>
      </FacebookShareButton>
      <LineShareButton url={url} title={title}>
        <Tooltip label="LINEでシェア" shouldWrapChildren hasArrow placement={tooltipPlacement}>
          <Icon
            as={FaLine}
            boxSize={6}
            fill="gray.400"
            _hover={{ fill: 'teal.500' }}
            {...iconProps}
          />
        </Tooltip>
      </LineShareButton>
      <PocketShareButton url={url} title={title}>
        <Tooltip label="Pocketに保存" shouldWrapChildren hasArrow placement={tooltipPlacement}>
          <Icon
            as={FaGetPocket}
            boxSize={6}
            fill="gray.400"
            _hover={{ fill: 'teal.500' }}
            {...iconProps}
          />
        </Tooltip>
      </PocketShareButton>
      <HatenaShareButton url={url} title={title}>
        <Tooltip
          label="はてなブックマークでシェア"
          shouldWrapChildren
          hasArrow
          placement={tooltipPlacement}
        >
          <Icon
            as={SiHatenabookmark}
            boxSize={6}
            fill="gray.400"
            _hover={{ fill: 'teal.500' }}
            {...iconProps}
          />
        </Tooltip>
      </HatenaShareButton>
    </>
  );
};
