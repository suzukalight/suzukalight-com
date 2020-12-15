import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const root = process.cwd();
const blogDir = 'public/blog';
const defaultBlogDir = path.join(root, blogDir);

export type ArticleFrontMatter = {
  title: string;
  excerpt: string;
  date: string | null;
  tags: string[] | null;
  image?: string | null;
};

export type ArticleData = ArticleFrontMatter & {
  slug: string;
};

/**
 * blogRootDir/{$1}/index.mdx? にマッチするMDXを探して、そのディレクトリ一覧を返す
 * @param blogRootDir コンテンツが格納されている親ディレクトリ
 */
export const getDirNamesThatHaveMdx = (blogRootDir = defaultBlogDir) => {
  const dirNames = fs.readdirSync(blogRootDir);
  const dirNamesThatHaveMdx = dirNames.filter((dir) =>
    fs.existsSync(`${blogRootDir}/${dir}/index.md`),
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
  const source = fs.readFileSync(path.join(blogRootDir, `${slug}/index.md`), 'utf8');
  return source;
};

/**
 * MDX に含まれる frontmatterを分離し、{ data, content } として返す
 * @param source MDXファイルの内容
 */
export const getMdxDataAndContent = (source: string) => {
  return matter(source);
};
