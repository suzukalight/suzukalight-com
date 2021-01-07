import path from 'path';
import fs from 'fs';

import { getArticleFromMdxSource, isPublished } from './entity';

const root = process.cwd();

/**
 * contentsRootDir/{$1}/index.mdx? にマッチするMDXを探して、そのディレクトリ一覧を返す
 * @param urlContents コンテンツのURL
 */
export const getDirNamesThatHaveMdx = (urlContents: string) => {
  const contentsRootDir = path.join(root, 'public', urlContents); // contents は public/path にあるものとする
  const dirNames = fs.readdirSync(contentsRootDir);
  const dirNamesThatHaveMdx = dirNames.filter(
    (dir) =>
      fs.existsSync(`public${urlContents}/${dir}/index.md`) ||
      fs.existsSync(`public${urlContents}/${dir}/index.mdx`),
  );
  const paths = dirNamesThatHaveMdx.map((dir) => dir.replace(/\.mdx?/, ''));

  return paths;
};

/**
 * 指定した slug にマッチするMDXファイルの内容を返す
 * @param slug
 * @param urlContents コンテンツのURL
 */
export const getMdxSource = (slug: string, urlContents: string) => {
  const contentsDir = path.join(root, 'public', urlContents, slug);

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
 * @param urlContents コンテンツのURL
 */
export const getArticle = async (slug: string, urlContents: string) => {
  const source = getMdxSource(slug, urlContents);
  return await getArticleFromMdxSource(source, slug);
};

type GetArticlesFromDirOption = {
  includesDraft?: boolean;
};

/**
 * 指定したコンテンツURLに格納されているMDX?ファイルをすべて返す
 * @param urlContents コンテンツのURL
 * @param mdxDirs コンテンツが格納されているディレクトリ群
 * @param options
 */
export const getArticlesFromDirs = async (
  urlContents: string,
  mdxDirs: string[],
  options?: GetArticlesFromDirOption,
) => {
  const articles = await Promise.all(
    mdxDirs.map(async (slug) => {
      const source = getMdxSource(slug, urlContents);
      const article = await getArticleFromMdxSource(source, slug);

      if (!isPublished(article) && !options?.includesDraft) return null;
      return article;
    }),
  );

  return articles.filter((a) => a);
};

/**
 * 指定したコンテンツURLに格納されているMDX?ファイルをすべて返す
 * @param urlContents コンテンツのURL
 * @param options
 */
export const getArticles = async (urlContents: string, options?: GetArticlesFromDirOption) => {
  const mdxDirs = getDirNamesThatHaveMdx(urlContents);
  return getArticlesFromDirs(urlContents, mdxDirs, options);
};
