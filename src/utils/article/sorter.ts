import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';

import { Article } from './entity';

/**
 * 記事を日付降順で並べ替える comparator
 */
export const comparatorDateDesc = (a: Article, b: Article) => {
  const dateA = new Date(a.getFrontMatter().date);
  const dateB = new Date(b.getFrontMatter().date);

  if (isEqual(dateA, dateB)) return 0;
  return isAfter(dateA, dateB) ? -1 : 1;
};

/**
 * 記事を日付降順で並べ替え、新しい配列を返す
 * @param articles 記事
 */
export const sortArticlesByDateDesc = (articles: Article[]) => {
  return articles.slice().sort(comparatorDateDesc);
};
