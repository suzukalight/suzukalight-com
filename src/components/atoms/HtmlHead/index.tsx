import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { NextSeoProps } from 'next-seo/lib/types';

export type SeoProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};
type HtmlHeadProps = SeoProps;

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'website';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com/';
export const defaultDescription =
  'A website created by Masahiko Kubara(suzukalight). Web engineering snippets, Horse Racing and Gaming blog';

export const HtmlHead: React.FC<HtmlHeadProps> = ({ title, description, url, image }) => {
  const seoProps: NextSeoProps = {
    title: title ? `${title} | ${siteName}` : siteName,
    description: description || defaultDescription,
    openGraph: {
      title,
      description,
    },
  };
  if (url) {
    seoProps.openGraph.url = new URL(url, siteUrl).toString();
  }
  if (url && image) {
    seoProps.openGraph.images = [{ url: new URL(image, siteUrl).toString() }];
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo {...seoProps} />
    </>
  );
};
