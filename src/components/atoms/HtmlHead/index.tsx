import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { NextSeoProps } from 'next-seo/lib/types';

import { SITE_NAME, SITE_URL } from '../../../utils/env';

export type SeoProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};
type HtmlHeadProps = SeoProps;

export const defaultDescription =
  'A website created by Masahiko Kubara(suzukalight). Web engineering snippets, Horse Racing and Gaming blog';

export const HtmlHead: React.FC<HtmlHeadProps> = ({ title, description, url, image }) => {
  const seoProps: NextSeoProps = {
    title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
    description: description || defaultDescription,
    openGraph: {
      title,
      description,
    },
  };
  if (url) {
    seoProps.openGraph.url = new URL(url, SITE_URL).toString();
  }
  if (url && image) {
    seoProps.openGraph.images = [{ url: new URL(image, SITE_URL).toString() }];
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
