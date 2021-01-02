import { Article } from './entity';
import { sortArticlesByDateDesc } from './sorter';

/**
 * 対象の記事に類似している記事を返す
 * @param src 当該記事
 * @param articles 検索対象の記事
 * @param count ピックアップする数
 */
export const getRelatedArticles = (src: Article, articles: Article[], count = 4) => {
  // 現状は、タグの一致度のみを見て返す
  return getRelatedArticlesByTags(src, articles, count);
};

/**
 * 対象の記事につけられたタグを、より多く含んでいる記事を順序付けて返す
 * @param src 当該記事
 * @param articles 検索対象の記事
 * @param count ピックアップする数
 */
export const getRelatedArticlesByTags = (src: Article, articles: Article[], count: number) => {
  return articles
    .filter((a) => a.slug !== src.slug) // 自分と同じ記事は外す
    .map((article) => {
      // タグの一致数を数える
      const matchedTagCount = article.frontMatter.tags.reduce(
        (count, t) => (src.frontMatter.tags.some((tt) => tt === t) ? count + 1 : count),
        0,
      );
      return { article, matchedTagCount };
    })
    .filter((a) => a.matchedTagCount) // 1つ以上タグがマッチしているものだけを対象にする
    .sort((a, b) => b.matchedTagCount - a.matchedTagCount) // マッチ数で並べ替える
    .slice(0, count) // ピックアップ数ぶんで絞る
    .map((s) => s.article); // Article だけ返す
};

/**
 * 対象の記事の、前の記事と次の記事を返す
 * @param src 当該記事
 * @param articles 検索対象の記事（並べ替えはしなくて良い）
 */
export const getPrevAndNextArticle = (
  src: Article,
  articles: Article[],
): { prevArticle: Article | null; nextArticle: Article | null } => {
  const articlesOrderByDate = sortArticlesByDateDesc(articles);
  const articleIndex = articlesOrderByDate.findIndex((a) => a.slug === src.slug);
  if (articleIndex < 0) return { prevArticle: null, nextArticle: null };

  const prevArticle = articlesOrderByDate[articleIndex - 1] ?? null;
  const nextArticle = articlesOrderByDate[articleIndex + 1] ?? null;
  return { prevArticle, nextArticle };
};
