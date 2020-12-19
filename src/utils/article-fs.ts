import path from 'path';
import fs from 'fs';

import { blogContentsUrl } from './article';

const root = process.cwd();

export const publicBlogDir = `public/${blogContentsUrl}`;
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
