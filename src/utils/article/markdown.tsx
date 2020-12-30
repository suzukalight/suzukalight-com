/* eslint-disable react/display-name */

import React from 'react';
import nmrHydrate from 'next-mdx-remote/hydrate';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export const MarkdownImg = (srcBaseUrl: string) => (props) => (
  <span
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7fafc',
    }}
  >
    <img
      {...props}
      src={`${srcBaseUrl}/${props.src}`}
      alt={props.alt || props.src}
      style={{ objectFit: 'contain', width: '100%', height: '16em' }}
    />
  </span>
);

export const TwitterEmbed = (props) => (
  <TwitterTweetEmbed tweetId={props.tweetId} options={props.options || { conversation: 'none' }} />
);

export const getDefaultComponents = (imgRootDir: string) => ({
  img: MarkdownImg(imgRootDir),
  TwitterEmbed,
});

export type MdOptions = {
  components?: any;
  mdxOptions?: any;
};

export const hydrate = (content: string, imgRootDir: string, options?: MdOptions) => {
  return nmrHydrate(content, {
    components: options?.components || getDefaultComponents(imgRootDir),
  });
};