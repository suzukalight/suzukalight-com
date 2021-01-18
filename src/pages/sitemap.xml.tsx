import React from 'react';
import { GetServerSideProps } from 'next';

import { SITE_URL } from '../utils/env';
import { mergeUrlAndSlug, UrlTable } from '../utils/path/url';
import { getArticles, getAvailableSlugs } from '../utils/article/fs.server';
import { getTagsIncludedInArticles } from '../utils/article/tag';

const siteUrl = SITE_URL.slice(0, -1);

const genUrl = (url: string) => `<url><loc>${siteUrl + url}</loc></url>`;

const genFromSlugs = async (urlBase: string, urlPost: string) => {
  const slugs = await getAvailableSlugs(urlBase);
  return slugs.map((slug) => genUrl(mergeUrlAndSlug(slug, urlPost)));
};

const genFromTags = async (urlBase: string, urlPost: string) => {
  const articles = await getArticles(urlBase);
  const tags = getTagsIncludedInArticles(articles);
  return tags.map((tag) => genUrl(mergeUrlAndSlug(tag, urlPost)));
};

const genFromChapters = async (urlBase: string) => {
  const titles = await getAvailableSlugs(urlBase);
  const _paths = await Promise.all(
    titles.map(async (title) => {
      const slugs = await getAvailableSlugs(mergeUrlAndSlug(title, urlBase));
      return slugs.map((chapter) => ({ title, chapter }));
    }),
  );
  const paths = _paths.flat();
  return paths.map((path) => {
    const urlCourse = mergeUrlAndSlug(path.title, urlBase);
    const urlChapter = mergeUrlAndSlug(path.chapter, urlCourse);

    return genUrl(urlChapter);
  });
};

const FIXED_URLS = [
  UrlTable.root,
  UrlTable.about,
  UrlTable.blog,
  UrlTable.blogTags,
  UrlTable.course,
  UrlTable.snippet,
  UrlTable.snippetTags,
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const smFixed = FIXED_URLS.map((url) => genUrl(url));
  const smBlogPosts = await genFromSlugs(UrlTable.blog, UrlTable.blogPosts);
  const smBlogTags = await genFromTags(UrlTable.blog, UrlTable.blogTags);
  const smSnippetPosts = await genFromSlugs(UrlTable.snippet, UrlTable.snippetPosts);
  const smSnippetTags = await genFromTags(UrlTable.snippet, UrlTable.snippetTags);
  const smCourseTitles = await genFromSlugs(UrlTable.course, UrlTable.course);
  const smCourseChapters = await genFromChapters(UrlTable.course);

  const sitemap = [
    ...smFixed,
    ...smBlogPosts,
    ...smBlogTags,
    ...smSnippetPosts,
    ...smSnippetTags,
    ...smCourseTitles,
    ...smCourseChapters,
  ].join('');

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
