import RSS from 'rss';

import { SITE_URL } from '../../utils/env';
import { mergeUrlAndSlug } from '../../utils/path/url';
import { getArticles } from '../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../utils/article/sorter';
import { Article } from '../article/entity';

const siteUrl = SITE_URL.slice(0, -1);
const feedUrl = `${siteUrl}/rss/works.rss`;

export const genRssData = (a: Article, urlPost: string) => ({
  url: `${siteUrl}${mergeUrlAndSlug(a.slug, urlPost)}`,
  title: a.frontMatter.title,
  description: a.excerpt,
  date: new Date(a.frontMatter.date),
});

export const genRSSDataFromSlugs = async (urlBase: string, urlPost: string) => {
  const articles = await getArticles(urlBase);
  const articlesSorted = sortArticlesByDateDesc(articles);

  return articlesSorted.map((a) => genRssData(a, urlPost));
};

export const createRSSFeed = () => {
  return new RSS({
    title: 'suzukalight.com',
    description:
      'Masahiko Kubara(suzukalight)のWebサイト。フロントエンド中心のフルスタックエンジニア。技術共有、競馬、一口馬主、ゲームログなど',
    site_url: siteUrl,
    feed_url: feedUrl,
    language: 'ja',
  });
};
