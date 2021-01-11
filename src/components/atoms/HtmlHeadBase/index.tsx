import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { NextSeoProps } from 'next-seo/lib/types';

type HtmlHeadBaseProps = {
  indexUrl: string;
  title: string;
  description?: string;
  url?: string;
  image?: string;
};

export const HtmlHeadBase: React.FC<HtmlHeadBaseProps> = ({
  indexUrl,
  title,
  description,
  url,
  image,
}) => {
  const seoProps: NextSeoProps = {
    title,
    description: description,
    openGraph: {
      title,
      description,
    },
  };
  if (url) {
    seoProps.openGraph.url = new URL(url, indexUrl).toString();
  }
  if (url && image) {
    seoProps.openGraph.images = [{ url: new URL(image, indexUrl).toString() }];
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
