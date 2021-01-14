import path from 'path';
import fs from 'fs';

import { Article, getArticleFromMdxSource, isPublished } from './entity';
import { getContentsDir, getContentsRootDir } from '../path/file.server';

type GetArticleOption = {
  includesDraft?: boolean;
};

const canRead = (article: Article, options?: GetArticleOption) =>
  isPublished(article) || options?.includesDraft;

/**
 * url配下の、指定したslugにマッチするMDXファイルの内容を返す
 * @param slug
 * @param url コンテンツのURL
 */
export const getMdxSource = (slug: string, url: string) => {
  const contentsDir = getContentsDir(slug, url);

  if (fs.existsSync(`${contentsDir}/index.md`)) {
    return fs.readFileSync(`${contentsDir}/index.md`, 'utf8');
  }
  if (fs.existsSync(`${contentsDir}/index.mdx`)) {
    return fs.readFileSync(`${contentsDir}/index.mdx`, 'utf8');
  }
  return '';
};

/**
 * url配下の、指定したslugにマッチするMDXファイルの内容を Article にして返す
 * @param slug
 * @param url コンテンツのURL
 * @param options
 */
export const getArticle = async (slug: string, url: string, options?: GetArticleOption) => {
  const source = getMdxSource(slug, url);
  const article = await getArticleFromMdxSource(source, slug);

  if (!canRead(article, options)) return null;
  return article;
};

/**
 * url/{$1}/index.mdx? にマッチするMDXを探して、それが格納されているディレクトリ一覧を返す
 * @param url コンテンツのURL
 */
export const getSlugs = (url: string) => {
  const contentsRootDir = getContentsRootDir(url);
  const dirNames = fs.readdirSync(contentsRootDir);
  const dirNamesThatHaveMdx = dirNames.filter(
    (dir) =>
      fs.existsSync(path.join(contentsRootDir, dir, 'index.md')) ||
      fs.existsSync(path.join(contentsRootDir, dir, 'index.mdx')),
  );
  const paths = dirNamesThatHaveMdx.map((dir) => dir.replace(/\.mdx?/, ''));

  return paths;
};

/**
 * url配下の、指定したslug群にある記事のうち、公開されているもののみを返す
 * @param url コンテンツのURL
 * @param slugs コンテンツのslug
 * @param options
 */
export const getArticlesFromDirs = async (
  url: string,
  slugs: string[],
  options?: GetArticleOption,
) => {
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const source = getMdxSource(slug, url);
      const article = await getArticleFromMdxSource(source, slug);

      if (!canRead(article, options)) return null;
      return article;
    }),
  );

  return articles.filter((a) => a);
};

/**
 * url配下の記事のうち、公開されているもののみを返す
 * @param url コンテンツのURL
 * @param options
 */
export const getArticles = async (url: string, options?: GetArticleOption) => {
  const slugs = getSlugs(url);
  return getArticlesFromDirs(url, slugs, options);
};

/**
 * url配下の記事のうち、公開されているもののみを選び、そのslugを返す
 * @param url コンテンツのURL
 */
export const getAvailableSlugs = async (url: string) => {
  const articles = await getArticles(url);
  return articles.map((a) => a.slug);
};
