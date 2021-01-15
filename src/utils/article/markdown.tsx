/* eslint-disable react/display-name */

import React from 'react';
import nmrHydrate from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import remark from 'remark';
import strip from 'strip-markdown';

import { getContentsUrlWithSlug } from '../path/url';

import { Link } from '../../components/atoms/Link';
import { TwitterEmbed } from '../../components/atoms/TwitterEmbed';
import { NextImage } from '../../components/atoms/NextImage';

const MdImage = (srcBaseUrl: string) => ({ src, ...props }) => (
  <NextImage src={`${srcBaseUrl}/${src}`} {...props} />
);

const MdLink = ({ href, ...rest }) => <Link to={href} {...rest} />;

/**
 * mdx→JSX変換で使用するコンポーネントマップを返す
 * @param imgRootDir img markdown の src の root dir
 */
export const getDefaultComponents = (imgRootDir: string) => ({
  img: MdImage(imgRootDir),
  TwitterEmbed,
  a: MdLink,
});

type MdOptions = {
  components?: MdxRemote.Components;
};

/**
 * markdownをサーバでDOMレンダリングしたものについて、hydrateする
 * @param content renderToString で使用した content
 * @param slug
 * @param url
 * @param options mdx→JSX変換で使用するコンポーネントマップなど
 */
export const hydrate = (content: string, slug: string, url: string, options?: MdOptions) => {
  return nmrHydrate(content, {
    components: options?.components || getDefaultComponents(getContentsUrlWithSlug(slug, url)),
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
