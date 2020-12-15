import path from 'path';
import fs from 'fs';

import { publicBlogDir } from './article';

const root = process.cwd();

export const defaultBlogDir = path.join(root, publicBlogDir);

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
