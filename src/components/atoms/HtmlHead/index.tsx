import React from 'react';
import Head from 'next/head';

type HtmlHeadProps = {
  title?: string;
  description?: string;
};

export const siteName = 'suzukalight.com';
export const defaultDescription =
  "suzukalight's website. blog, documents, my outputs, skill map and biography";

export const HtmlHead: React.FC<HtmlHeadProps> = ({ title, description }) => {
  const titleMerged = title ? `${title} - ${siteName}` : siteName;

  return (
    <Head>
      <title>{titleMerged}</title>
      <meta name="Description" content={description || defaultDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
