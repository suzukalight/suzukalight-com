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

/**
 * 指定したタグを含む記事のみを返す
 * @param articles 記事
 * @param tag
 */
export const filterArticleByTag = (articles: ArticleData[], tag: string) => {
  return articles.filter((a) => a.tags.some((t) => t === tag));
};

/**
 * 記事に含まれるタグ一覧を重複なしで返す
 * @param articles 記事
 */
export const getTagsIncludedInArticles = (articles: ArticleData[]) => {
  const tags = articles.reduce((p, c) => p.concat(c.tags), [] as string[]);
  return Array.from(new Set(tags));
};

type TagAndCountTable = {
  [key: string]: number;
};

/**
 * { [tagName]: count } 形式でタグ一覧を返す
 * @param articles
 */
export const getTableWithTagAndCountIncludedInArticles = (articles: ArticleData[]) => {
  return articles
    .map((a) => Array.from(new Set(a.tags)))
    .reduce((p, tags) => {
      tags.forEach((tag) => (tag in p ? p[tag]++ : (p[tag] = 1)));
      return p;
    }, {} as TagAndCountTable);
};

export type TagAndCount = {
  tag: string;
  count: number;
};
type ComparatorTagAndCount = (a: TagAndCount, b: TagAndCount) => number;

export const comparatorTagName = (a: TagAndCount, b: TagAndCount) => a.tag.localeCompare(b.tag);
export const comparatorTagCount = (a: TagAndCount, b: TagAndCount) => b.count - a.count;

/**
 * [{ tag: string, count: number }] 形式でタグ一覧を返す
 * @param tagAndCountTable getTableWithTagAndCountIncludedInArticles の戻り値
 * @param comparator ソート順を決定する comparator
 */
export const getArrayOfTagAndCountFromTable = (
  tagAndCountTable: TagAndCountTable,
  comparator: ComparatorTagAndCount,
) => {
  return Object.entries(tagAndCountTable)
    .map((e) => ({
      tag: e[0],
      count: e[1],
    }))
    .sort(comparatorTagName)
    .sort(comparator) as TagAndCount[];
};
