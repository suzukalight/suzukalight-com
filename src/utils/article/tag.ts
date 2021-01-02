import { Article } from './entity';

/**
 * 記事に含まれるタグ一覧を重複なしで返す
 * @param articles 記事
 */
export const getTagsIncludedInArticles = (articles: Article[]) => {
  const tags = articles.reduce((p, c) => p.concat(c.frontMatter.tags), [] as string[]);
  return Array.from(new Set(tags));
};

/**
 * { [tagName]: count } 形式でタグ一覧を返す
 * @param articles
 */
export const getTableWithTagAndCountIncludedInArticles = (articles: Article[]) => {
  return articles
    .map((a) => Array.from(new Set(a.frontMatter.tags)))
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

type TagAndCountTable = {
  [key: string]: number;
};

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
