/* eslint-disable react/display-name */

import React from 'react';
import nmrHydrate from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import remark from 'remark';
import strip from 'strip-markdown';

import { Link } from '../../components/atoms/Link';
import { TwitterEmbed } from '../../components/atoms/TwitterEmbed';
import { NextImageArticle } from '../../components/atoms/NextImage/Article';

const MdImage =
  (baseImageUrl: string) =>
  ({ src }) =>
    <NextImageArticle src={`${baseImageUrl}/${src}`} />;

const MdLink = (baseHref?: string, baseAs?: string) => (props) => {
  if (
    baseHref &&
    !props.href.startsWith('http') &&
    !props.href.startsWith('/') &&
    !props.href.startsWith('mailto')
  ) {
    const href = `${baseHref}/${props.href}`;
    const as = `${baseAs}/${props.href}`;
    return <Link {...props} href={href} nextProps={{ as }} />;
  }

  return <Link {...props} />;
};

/**
 * mdx→JSX変換で使用するコンポーネントマップを返す
 * @param imgRootDir img markdown の src の root dir
 */
export const getDefaultComponents: MdxRemote.Components = (
  baseImageUrl: string,
  baseHref?: string,
  baseAs?: string,
) => ({
  img: MdImage(baseImageUrl),
  TwitterEmbed,
  a: MdLink(baseHref, baseAs),
});

export type MdxSource = MdxRemote.Source;

export type MdOptions = {
  baseImageUrl: string;
  baseHref?: string;
  baseAs?: string;
  components?: MdxRemote.Components;
};

/**
 * markdownをサーバでDOMレンダリングしたものについて、hydrateする
 * @param content renderToString で使用した content
 * @param slug
 * @param url
 * @param options mdx→JSX変換で使用するコンポーネントマップなど
 */
export const hydrate = (content: MdxSource, options: MdOptions) => {
  return nmrHydrate(content, {
    components:
      options?.components ||
      getDefaultComponents(options.baseImageUrl, options?.baseHref, options?.baseAs),
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
