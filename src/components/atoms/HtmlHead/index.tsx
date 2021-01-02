import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';

type HtmlHeadProps = {
  title?: string;
  description?: string;
  image?: string;
};

export const siteName = 'suzukalight.com';
export const defaultDescription =
  "suzukalight's website. blog, documents, my outputs, skill map and biography";

export const HtmlHead: React.FC<HtmlHeadProps> = ({ title, description, image }) => {
  const titleMerged = title ? `${title} | ${siteName}` : siteName;
  const openGraph: OpenGraph = image ? { images: [{ url: image }] } : null;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo title={titleMerged} description={description || defaultDescription} {...openGraph} />
    </>
  );
};
