---
title: Next.jsサイトにsitemapを実装する
date: '2021-01-18T01:00:00'
category: Snippet
tags: ['sitemap', 'nextjs', 'ssr']
status: 'published'
---

```tsx:/pages/sitemap.xml.tsx
import React from 'react';
import { GetServerSideProps } from 'next';

import { SITE_URL } from '../utils/env';
import { mergeUrlAndSlug, UrlTable } from '../utils/path/url';
import { getAvailableSlugs } from '../utils/article/fs.server';

const FIXED_URLS = [UrlTable.root, UrlTable.about, UrlTable.blog];
const siteUrl = SITE_URL.slice(0, -1);

const genUrl = (url: string) => `<url><loc>${siteUrl + url}</loc></url>`;
const genFromSlugs = async (urlBase: string, urlPost: string) => {
  const slugs = await getAvailableSlugs(urlBase);
  return slugs.map((slug) => genUrl(mergeUrlAndSlug(slug, urlPost)));
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const smFixed = FIXED_URLS.map((url) => genUrl(url));
  const smBlogPosts = await genFromSlugs(UrlTable.blog, UrlTable.blogPosts);

  const sitemap = [...smFixed, ...smBlogPosts].join('');

  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap}
    </urlset>`);
    res.end();
  }

  return {
    props: {},
  };
};

const Sitemap: React.FC = () => null;

export default Sitemap;
```

**sitemap も pages でレンダリングする**。コツはファイル名を `/pages/sitemap.xml.tsx` として XML を返すことを明示することと、SSR(getServerSideProps) の `res.setHeader` で `text/xml` として返すこと。

- SSG のページは、固定の URL テーブルを作成して、それを返す。
- slug などの dynamic route を使っているページは、**getStaticPaths で利用している関数をそのまま sitemap.xml.tsx でも利用すればよい**

### references

- https://stackoverflow.com/questions/64936872/next-js-is-there-any-way-to-render-an-xml-file
