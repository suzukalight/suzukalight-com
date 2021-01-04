import React from 'react';
import { Icon } from '@chakra-ui/react';
import {
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton,
} from 'react-share';

import { SITE_URL, TWITTER_ID } from '../../../utils/env';
import { FaFacebook, FaGetPocket, FaLine, FaTwitter } from 'react-icons/fa';

type SocialLinksProps = {
  urlBlog: string;
  title: string;
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ urlBlog, title }) => {
  const url = new URL(urlBlog, SITE_URL).toString();

  return (
    <>
      <TwitterShareButton url={url} title={title} via={TWITTER_ID}>
        <Icon as={FaTwitter} boxSize={6} fill="gray.500" />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <Icon as={FaFacebook} boxSize={6} fill="gray.500" />
      </FacebookShareButton>
      <LineShareButton title={title} url={url}>
        <Icon as={FaLine} boxSize={6} fill="gray.500" />
      </LineShareButton>
      <PocketShareButton title={title} url={url}>
        <Icon as={FaGetPocket} boxSize={6} fill="gray.500" />
      </PocketShareButton>
      <HatenaShareButton title={title} url={url}>
        <HatenaIcon size={24} round bgStyle={{ fill: '#718096' }} iconFillColor="white" />
      </HatenaShareButton>
    </>
  );
};
