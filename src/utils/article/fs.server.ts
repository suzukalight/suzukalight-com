import path from 'path';
import fs from 'fs';

import { getArticleFromMdxSource, isPublished } from './entity';

const root = process.cwd();

/**
 * contentsRootDir/{$1}/index.mdx? にマッチするMDXを探して、そのディレクトリ一覧を返す
 * @param contentsUrl コンテンツのURL
 */
export const getDirNamesThatHaveMdx = (contentsUrl: string) => {
  const contentsRootDir = path.join(root, 'public', contentsUrl);
  const dirNames = fs.readdirSync(contentsRootDir);
  const dirNamesThatHaveMdx = dirNames.filter(
    (dir) =>
      fs.existsSync(`public${contentsUrl}/${dir}/index.md`) ||
      fs.existsSync(`public${contentsUrl}/${dir}/index.mdx`),
  );
  const paths = dirNamesThatHaveMdx.map((dir) => dir.replace(/\.mdx?/, ''));

  return paths;
};

/**
 * 指定した slug にマッチするMDXファイルの内容を返す
 * @param contentsUrl コンテンツのURL
 * @param slug
 */
export const getMdxSource = (contentsUrl: string, slug: string) => {
  const contentsDir = path.join(root, 'public', contentsUrl, slug);

  if (fs.existsSync(`${contentsDir}/index.md`)) {
    return fs.readFileSync(`${contentsDir}/index.md`, 'utf8');
  }
  if (fs.existsSync(`${contentsDir}/index.mdx`)) {
    return fs.readFileSync(`${contentsDir}/index.mdx`, 'utf8');
  }
  return '';
};

type GetArticlesFromDirOption = {
  includesDraft?: boolean;
};

/**
 * 指定したコンテンツURLに格納されているMDX?ファイルをすべて返す
 * @param contentsUrl コンテンツのURL
 * @param mdxDirs コンテンツが格納されているディレクトリ群
 * @param options
 */
export const getArticlesFromDir = async (
  contentsUrl: string,
  mdxDirs: string[],
  options?: GetArticlesFromDirOption,
) => {
  const articles = await Promise.all(
    mdxDirs.map(async (slug) => {
      const source = getMdxSource(contentsUrl, slug);
      const article = await getArticleFromMdxSource(source, slug);

      if (!isPublished(article) && !options?.includesDraft) return null;
      return article;
    }),
  );

  return articles.filter((a) => a);
};

/**
 * 指定したコンテンツURLに格納されているMDX?ファイルをすべて返す
 * @param contentsUrl コンテンツのURL
 * @param options
 */
export const getArticles = async (contentsUrl: string, options?: GetArticlesFromDirOption) => {
  const mdxDirs = getDirNamesThatHaveMdx(contentsUrl);
  return getArticlesFromDir(contentsUrl, mdxDirs, options);
};
