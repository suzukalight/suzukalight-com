import { Article } from './entity';

/**
 * 指定したタグを含む記事のみを返す
 * @param articles 記事
 * @param tag
 */
export const filterArticleByTag = (articles: Article[], tag: string) => {
  return articles.filter((a) => a.frontMatter.tags.some((t) => t === tag));
};
