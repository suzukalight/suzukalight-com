/* eslint-disable react/display-name */

import React from 'react';
import nmrHydrate from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import remark from 'remark';
import strip from 'strip-markdown';

import { Link } from '../../components/atoms/Link';
import { TwitterEmbed } from '../../components/atoms/TwitterEmbed';
import { NextImageArticle } from '../../components/atoms/NextImage/Article';

// カスタムコンポーネント型を定義
export type CustomComponents = {
  img: React.ComponentType<{ src: unknown }>;
  TwitterEmbed: React.ComponentType<unknown>;
  a: React.ComponentType<unknown>;
};

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
export const getDefaultComponents = (
  baseImageUrl: string,
  baseHref?: string,
  baseAs?: string,
): CustomComponents => ({
  img: MdImage(baseImageUrl),
  TwitterEmbed,
  a: MdLink(baseHref, baseAs),
});

// MdxRemote.Sourceの代わりに直接型を定義
export type MdxSource = {
  compiledSource: string;
  renderedOutput: string;
  scope?: Record<string, unknown>;
};

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
  const customComponents = getDefaultComponents(
    options.baseImageUrl,
    options?.baseHref,
    options?.baseAs,
  );

  // 型の不一致を解決するために、any型を使用
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components = options?.components || (customComponents as any);

  return nmrHydrate(content, { components });
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
