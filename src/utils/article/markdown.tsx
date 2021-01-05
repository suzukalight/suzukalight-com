/* eslint-disable react/display-name */

import React from 'react';
import nmrHydrate from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import remark from 'remark';
import strip from 'strip-markdown';

import { Link } from '../../components/atoms/Link';

const MarkdownImg = (srcBaseUrl: string) => (props) => (
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

const TwitterEmbed = (props) => (
  <TwitterTweetEmbed tweetId={props.tweetId} options={props.options || { conversation: 'none' }} />
);

const LinkWithTargetBlank = ({ href, ...rest }) => <Link to={href} {...rest} />;

/**
 * mdx→JSX変換で使用するコンポーネントマップを返す
 * @param imgRootDir img markdown の src の root dir
 */
export const getDefaultComponents = (imgRootDir: string) => ({
  img: MarkdownImg(imgRootDir),
  TwitterEmbed,
  a: LinkWithTargetBlank,
});

type MdOptions = {
  components?: MdxRemote.Components;
};

/**
 * markdownをサーバでDOMレンダリングしたものについて、hydrateする
 * @param content renderToString で使用した content
 * @param imgRootDir img src の root dir
 * @param options mdx→JSX変換で使用するコンポーネントマップなど
 */
export const hydrate = (content: string, imgRootDir: string, options?: MdOptions) => {
  return nmrHydrate(content, {
    components: options?.components || getDefaultComponents(imgRootDir),
  });
};

/**
 * 対象のmarkdownからタグを取り除き、可読文字列のみを返す
 * @param content markdown から frontMatter を取り除いたもの
 */
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
