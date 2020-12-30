import path from 'path';
import fs from 'fs';

import { Article, getArticleFromMdxSource } from './entity';
import { urlContentsBlog } from '../../pages/url.json';

const root = process.cwd();

export const publicBlogDir = `public/${urlContentsBlog}`;
export const defaultBlogDir = path.join(root, publicBlogDir);

/**
 * blogRootDir/{$1}/index.mdx? にマッチするMDXを探して、そのディレクトリ一覧を返す
 * @param blogRootDir コンテンツが格納されている親ディレクトリ
 */
export const getDirNamesThatHaveMdx = (blogRootDir = defaultBlogDir) => {
  const dirNames = fs.readdirSync(blogRootDir);
  const dirNamesThatHaveMdx = dirNames.filter(
    (dir) =>
      fs.existsSync(`${blogRootDir}/${dir}/index.md`) ||
      fs.existsSync(`${blogRootDir}/${dir}/index.mdx`),
  );
  const paths = dirNamesThatHaveMdx.map((dir) => dir.replace(/\.mdx?/, ''));

  return paths;
};

/**
 * 指定した slug にマッチするMDXファイルの内容を返す
 * @param slug
 * @param blogRootDir コンテンツが格納されている親ディレクトリ
 */
export const getMdxSource = (slug: string, blogRootDir = defaultBlogDir) => {
  const dir = path.join(blogRootDir, slug);
  if (fs.existsSync(`${dir}/index.md`)) {
    return fs.readFileSync(`${dir}/index.md`, 'utf8');
  }
  if (fs.existsSync(`${dir}/index.mdx`)) {
    return fs.readFileSync(`${dir}/index.mdx`, 'utf8');
  }
  return '';
};

type GetArticlesFromDirOption = {
  includesDraft?: boolean;
};

/**
 * 指定したディレクトリ群に格納されているMDX?ファイルをすべて返す
 * @param mdxDirs コンテンツが格納されているディレクトリ群
 * @param options
 */
export const getArticlesFromDir = (mdxDirs: string[], options?: GetArticlesFromDirOption) => {
  return mdxDirs.reduce((articles, slug) => {
    const source = getMdxSource(slug);
    const article = getArticleFromMdxSource(source, slug);

    if (article.isPublished() || options?.includesDraft) articles.push(article);

    return articles;
  }, [] as Article[]);
};

type GetArticlesOption = GetArticlesFromDirOption & {
  rootDir?: string;
};

/**
 * 指定した親ディレクトリに格納されているMDX?ファイルをすべて返す
 * @param blogRootDir コンテンツが格納されている親ディレクトリ
 * @param options
 */
export const getArticles = (options?: GetArticlesOption) => {
  const { rootDir, ...restOptions } = options || {};
  const mdxDirs = getDirNamesThatHaveMdx(rootDir || publicBlogDir);
  return getArticlesFromDir(mdxDirs, restOptions);
};
