import path from 'path';
import fs from 'fs';

import { getContentsUrl } from './url';

const root = process.cwd();

export const getContentsRootDir = (url: string) => {
  return path.join(root, 'public', getContentsUrl(url));
};

export const getContentsDirNames = (url: string) => {
  const contentsRootDir = getContentsRootDir(url);
  return fs.readdirSync(contentsRootDir);
};

export const getContentsDir = (slug: string, url: string) => {
  return path.join(root, 'public', getContentsUrl(url), slug);
};
