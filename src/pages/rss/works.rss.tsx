import React from 'react';
import { GetServerSideProps } from 'next';

import { UrlTable } from '../../utils/path/url';
import { createRSSFeed, genRSSDataFromSlugs } from '../../utils/rss';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const rssWorks = await genRSSDataFromSlugs(UrlTable.works, UrlTable.worksDetail);
  const rssData = [...rssWorks];

  const feed = createRSSFeed();
  rssData?.forEach((r) => feed.item(r));

  if (res) {
    res.statusCode = 200;
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間キャッシュする
    res.setHeader('Content-Type', 'text/xml');
    res.end(feed.xml());
  }

  return {
    props: {},
  };
};

const Sitemap: React.FC = () => null;

export default Sitemap;
