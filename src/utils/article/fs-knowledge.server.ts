import path from 'path';
import fs from 'fs';

import { Article, getArticleFromMdxSource } from './entity';
import { urlContentsKnowledge } from '../../pages/url.json';

const root = process.cwd();

export const publicKnowledgeDir = `public/${urlContentsKnowledge}`;
export const defaultKnowledgeDir = path.join(root, publicKnowledgeDir);

/**
 * blogRootDir/{$1}/index.mdx? にマッチするMDXを探して、そのディレクトリ一覧を返す
 * @param blogRootDir コンテンツが格納されている親ディレクトリ
 */
export const getMdxFileNames = (blogRootDir = defaultKnowledgeDir) => {
  return fs
    .readdirSync(blogRootDir) // ディレクトリを走査
    .filter((f) => fs.statSync(`${blogRootDir}/${f}`).isFile() && /.*\.md(x?)$/.test(f)) // 拡張子 .mdX? のものだけをピック
    .map((f) => f.replace(/\.[^/.]+$/, '')); // 拡張子を外して返す（slug）
};

/**
 * 指定した slug にマッチするMDXファイルの内容を返す
 * @param slug
 * @param blogRootDir コンテンツが格納されている親ディレクトリ
 */
export const getMdxSource = (slug: string, knowledgeRootDir = defaultKnowledgeDir) => {
  const filename = path.join(knowledgeRootDir, slug);
  if (fs.existsSync(`${filename}.md`)) {
    return fs.readFileSync(`${filename}.md`, 'utf8');
  }
  if (fs.existsSync(`${filename}.mdx`)) {
    return fs.readFileSync(`${filename}.mdx`, 'utf8');
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
export const getArticlesFromFiles = (mdxFiles: string[], options?: GetArticlesFromDirOption) => {
  return mdxFiles.reduce((articles, slug) => {
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
  const mdxDirs = getMdxFileNames(rootDir || publicKnowledgeDir);
  return getArticlesFromFiles(mdxDirs, restOptions);
};
