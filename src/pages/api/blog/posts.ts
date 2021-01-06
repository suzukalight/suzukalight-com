import { NextApiRequest, NextApiResponse } from 'next';

import { urlContentsBlog } from '../../url.json';
import { getArticles } from '../../../utils/article/fs.server';
import { sortArticlesByDateDesc } from '../../../utils/article/sorter';
import { stripContent } from '../../../utils/article/entity';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const articles = await getArticles(urlContentsBlog);
  const articlesSorted = sortArticlesByDateDesc(articles).map((a) => stripContent(a));

  res.statusCode = 200;
  res.json({ articles: articlesSorted });
};
