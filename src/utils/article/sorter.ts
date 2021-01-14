import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';

import { Article } from './entity';

export type ComparatorArticle = (a: Article, b: Article) => number;

/** 記事を日付降順で並べ替える comparator */
export const comparatorDateDesc = (a: Article, b: Article) => {
  const dateA = new Date(a.frontMatter.date);
  const dateB = new Date(b.frontMatter.date);

  if (isEqual(dateA, dateB)) return 0;
  return isAfter(dateA, dateB) ? -1 : 1;
};

/** 記事を日付昇順で並べ替える comparator */
export const comparatorDateAsc = (a: Article, b: Article) => -comparatorDateDesc(a, b);

/** 記事を slug 昇順で並べ替える comparator */
export const comparatorSlugAsc = (a: Article, b: Article) => a.slug.localeCompare(b.slug);

/**
 * 記事を指定の comparator で並べ替え、新しい配列を返す
 * @param articles 記事
 */
export const sortArticles = (articles: Article[], comparator: ComparatorArticle) => {
  return articles.slice().sort(comparator);
};

/**
 * 記事を日付降順で並べ替え、新しい配列を返す
 * @param articles 記事
 */
export const sortArticlesByDateDesc = (articles: Article[]) => {
  return articles.slice().sort(comparatorDateDesc);
};
