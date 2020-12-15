import matter from 'gray-matter';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';

export const blogRootUrl = 'blog/posts';
export const blogContentsUrl = 'contents/blog';

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
 * MDX に含まれる frontmatterを分離し、{ data, content } として返す
 * @param source MDXファイルの内容
 */
export const getMdxDataAndContent = (source: string) => {
  return matter(source);
};

/**
 * 記事を日付降順で並べ替える comparator
 */
export const comparatorDateDesc = (a: ArticleData, b: ArticleData) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (isEqual(dateA, dateB)) return 0;
  return isAfter(dateA, dateB) ? -1 : 1;
};

/**
 * 記事を日付降順で並べ替え、新しい配列を返す
 * @param articles 記事
 */
export const sortArticlesByDateDesc = (articles: ArticleData[]) => {
  return articles.slice().sort(comparatorDateDesc);
};
