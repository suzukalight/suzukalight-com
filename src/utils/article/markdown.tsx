/* eslint-disable react/display-name */

import React from 'react';
import nmrHydrate from 'next-mdx-remote/hydrate';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import remark from 'remark';
import strip from 'strip-markdown';

import { Link } from '../../components/atoms/Link';

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

export const LinkWithTargetBlank = (props) => {
  const { href, ...rest } = props;
  if (href.match('http'))
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />;

  return <Link to={href} {...rest} />;
};

export const getDefaultComponents = (imgRootDir: string) => ({
  img: MarkdownImg(imgRootDir),
  TwitterEmbed,
  a: LinkWithTargetBlank,
});

export type MdOptions = {
  components?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  mdxOptions?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const hydrate = (content: string, imgRootDir: string, options?: MdOptions) => {
  return nmrHydrate(content, {
    components: options?.components || getDefaultComponents(imgRootDir),
  });
};

export const stripMarkdown = (content: string) => {
  return new Promise<string>((resolve, reject) => {
    remark()
      .use(strip)
      .process(content, (err, file) => {
        if (err) reject(err);
        return resolve(file.toString());
      });
  });
};
