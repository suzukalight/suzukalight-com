import { Article } from './entity';

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
 * 対象のタグをより多く含んでいる記事を順序付けて返す
 * @param src 当該記事
 * @param articles 検索対象の記事
 * @param count ピックアップする数
 */
export const getRelatedArticlesByTags = (src: Article, articles: Article[], count: number) => {
  return articles
    .filter((a) => a.getSlug() !== src.getSlug()) // 自分と同じ記事は外す
    .map((article) => {
      // タグの一致数を数える
      const matchedTagCount = article
        .getTags()
        ?.reduce((count, t) => (src.getTags().some((tt) => tt === t) ? count + 1 : count), 0);
      return { article, matchedTagCount };
    })
    .filter((a) => a.matchedTagCount) // 1つ以上タグがマッチしているものだけを対象にする
    .sort((a, b) => b.matchedTagCount - a.matchedTagCount) // マッチ数で並べ替える
    .slice(0, count) // ピックアップ数ぶんで絞る
    .map((s) => s.article); // Article だけ返す
};
