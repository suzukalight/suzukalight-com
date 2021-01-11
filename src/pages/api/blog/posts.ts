import { NextApiRequest, NextApiResponse } from 'next';

import { getArticles } from '../../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../../utils/article/sorter';
import { stripContent } from '../../../utils/article/entity';
import { UrlTable } from '../../../utils/path/url';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const articles = await getArticles(UrlTable.blog);
  const articlesSorted = sortArticlesByDateDesc(articles).map((a) => stripContent(a));

  res.statusCode = 200;
  res.json({ articles: articlesSorted });
};
