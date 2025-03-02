import React from 'react';
import { Icon, IconProps, Placement, Tooltip } from '@chakra-ui/react';
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton,
} from 'react-share';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaGetPocket } from '@react-icons/all-files/fa/FaGetPocket';
import { FaLine } from '@react-icons/all-files/fa/FaLine';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { SiHatenabookmark } from '@react-icons/all-files/si/SiHatenabookmark';

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
      <TwitterShareButton url={url} title={title} via={twitterId} style={{}} aria-label="Twitter">
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
      <FacebookShareButton url={url} style={{}} aria-label="Facebook">
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
      <LineShareButton url={url} title={title} style={{}} aria-label="Line">
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
      <PocketShareButton url={url} title={title} style={{}} aria-label="Pocket">
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
      <HatenaShareButton url={url} title={title} style={{}} aria-label="Hatena">
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
