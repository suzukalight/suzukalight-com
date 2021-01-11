import path from 'path';
import fs from 'fs';

import { getArticleFromMdxSource, isPublished } from './entity';
import { getContentsDir, getContentsRootDir } from '../path/file.server';

/**
 * url/{$1}/index.mdx? にマッチするMDXを探して、そのディレクトリ一覧を返す
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
 * 指定した slug にマッチするMDXファイルの内容を返す
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
 * 指定した slug にマッチするMDXファイルの内容を Article にして返す
 * @param slug
 * @param url コンテンツのURL
 */
export const getArticle = async (slug: string, url: string) => {
  const source = getMdxSource(slug, url);
  return await getArticleFromMdxSource(source, slug);
};

type GetArticlesFromDirOption = {
  includesDraft?: boolean;
};

/**
 * 指定したコンテンツURLに格納されているMDX?ファイルをすべて返す
 * @param url コンテンツのURL
 * @param slugs コンテンツのslug
 * @param options
 */
export const getArticlesFromDirs = async (
  url: string,
  slugs: string[],
  options?: GetArticlesFromDirOption,
) => {
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const source = getMdxSource(slug, url);
      const article = await getArticleFromMdxSource(source, slug);

      if (!isPublished(article) && !options?.includesDraft) return null;
      return article;
    }),
  );

  return articles.filter((a) => a);
};

/**
 * 指定したコンテンツURLに格納されているMDX?ファイルをすべて返す
 * @param url コンテンツのURL
 * @param options
 */
export const getArticles = async (url: string, options?: GetArticlesFromDirOption) => {
  const slugs = getSlugs(url);
  return getArticlesFromDirs(url, slugs, options);
};
