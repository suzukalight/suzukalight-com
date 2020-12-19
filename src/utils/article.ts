import matter from 'gray-matter';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';
import format from 'date-fns/format';

export const blogRootUrl = '/blog/posts';
export const blogContentsUrl = '/contents/blog';

export type ArticleFrontMatter = {
  title: string;
  excerpt: string;
  date: string | null;
  tags: string[] | null;
  hero?: string | null;
  emoji?: string | null;
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

/**
 * 記事の投稿日時を文字列化して返す
 * @param article 記事
 */
export const getArticleDate = (date: string) => {
  return date ? format(new Date(date), 'yyyy.MM.dd') : '';
};
