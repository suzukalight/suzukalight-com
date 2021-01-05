import React from 'react';
import { Icon, Placement, Tooltip } from '@chakra-ui/react';
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton,
} from 'react-share';
import { FaFacebook, FaGetPocket, FaLine, FaTwitter } from 'react-icons/fa';
import { SiHatenabookmark } from 'react-icons/si';

import { SITE_URL, TWITTER_ID } from '../../../utils/env';

type ShareButtonsProps = {
  urlBlog: string;
  title: string;
  tooltipPlacement: Placement;
};

export const ShareButtons: React.FC<ShareButtonsProps> = ({ urlBlog, title, tooltipPlacement }) => {
  const url = new URL(urlBlog, SITE_URL).toString();

  return (
    <>
      <TwitterShareButton url={url} title={title} via={TWITTER_ID}>
        <Tooltip label="Twitterでシェア" shouldWrapChildren hasArrow placement={tooltipPlacement}>
          <Icon as={FaTwitter} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
        </Tooltip>
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <Tooltip label="Facebookでシェア" shouldWrapChildren hasArrow placement={tooltipPlacement}>
          <Icon as={FaFacebook} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
        </Tooltip>
      </FacebookShareButton>
      <LineShareButton title={title} url={url}>
        <Tooltip label="LINEでシェア" shouldWrapChildren hasArrow placement={tooltipPlacement}>
          <Icon as={FaLine} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
        </Tooltip>
      </LineShareButton>
      <PocketShareButton title={title} url={url}>
        <Tooltip label="Pocketに保存" shouldWrapChildren hasArrow placement={tooltipPlacement}>
          <Icon as={FaGetPocket} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
        </Tooltip>
      </PocketShareButton>
      <HatenaShareButton title={title} url={url}>
        <Tooltip
          label="はてなブックマークでシェア"
          shouldWrapChildren
          hasArrow
          placement={tooltipPlacement}
        >
          <Icon as={SiHatenabookmark} boxSize={6} fill="gray.400" _hover={{ fill: 'teal.500' }} />
        </Tooltip>
      </HatenaShareButton>
    </>
  );
};
