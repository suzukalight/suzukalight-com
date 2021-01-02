import matter from 'gray-matter';
import format from 'date-fns/format';

import { ValidationError } from '../error/Validation';
import { PropertyRequiredError } from '../error/PropertyRequired';
import { isValidISODate } from '../date/is-valid';
import { stripMarkdown } from './markdown';

/** 記事の公開状態 */
export type ArticleStatus = 'published' | 'draft';

/** MDXの先頭に記述している frontMatter */
export type ArticleFrontMatter = {
  title: string;
  date: string;
  status: ArticleStatus;
  category?: string;
  tags?: string[];
  hero?: string;
  emoji?: string;
};

/** MDXからfrontMatterを取り除いた本文 */
export type ArticleContent = string;

/**
 * 記事エンティティ
 */
export class Article {
  slug: string;
  frontMatter: ArticleFrontMatter;
  excerpt: string;
  content?: ArticleContent;
}

/**
 * 不正な frontMatter であった場合、エラーを throw する
 * @param frontMatter ArticleFrontMatter 形式のオブジェクト
 */
export const denyInvalidFrontMatter = (frontMatter: Record<string, unknown>) => {
  if (!frontMatter) throw new ValidationError('frontMatter が見つかりません');
  if (!('title' in frontMatter)) throw new PropertyRequiredError('title');
  if (!('date' in frontMatter)) throw new PropertyRequiredError('date');
  if (!('status' in frontMatter)) throw new PropertyRequiredError('status');

  if (frontMatter.tags && !Array.isArray(frontMatter.tags))
    throw new ValidationError('tags が配列ではありません');
  if (!isValidISODate(frontMatter.date as string))
    throw new ValidationError('date は変換可能な形式ではありません');
  if (frontMatter.status !== 'published' && frontMatter.status !== 'draft')
    throw new ValidationError('status の値が誤っています');
};

/**
 * 正しい形式の frontMatter であるかを返す
 * @param frontMatter ArticleFrontMatter 形式のオブジェクト
 */
export const isValidFrontMatter = (frontMatter: Record<string, unknown>) => {
  try {
    denyInvalidFrontMatter(frontMatter);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * 不正な DTO であった場合、エラーを throw する
 * @param dto ArticleDTO 形式のオブジェクト
 */
export const denyInvalidArticleDTO = (dto: Record<string, unknown>) => {
  if (!dto) throw new ValidationError('DTOが見つかりません');
  if (!('frontMatter' in dto)) throw new PropertyRequiredError('frontMatter');
  if (!('content' in dto)) throw new PropertyRequiredError('content');
  if (!('slug' in dto)) throw new PropertyRequiredError('slug');

  denyInvalidFrontMatter(dto.frontMatter as ArticleFrontMatter);
};

/**
 * 記事から装飾を取り除き、さらに一定の長さにして返す
 * @param content 記事の内容
 * @param length 切り出す長さ
 */
export const createExcerpt = async (content: string, length = 256) => {
  const excerpt = await stripMarkdown(content.slice(0, length));
  return excerpt.replace(/\s+/g, '');
};

/**
 * MDX に含まれる frontmatterを分離し、Article として返す
 * @param source MDXファイルの内容
 * @param slug このArticleのslug
 */
export const getArticleFromMdxSource = async (source: string, slug: string) => {
  const { data, content } = matter(source);
  denyInvalidFrontMatter(data);

  return {
    slug,
    excerpt: await createExcerpt(content),
    frontMatter: data,
    content,
  } as Article;
};

/**
 * 投稿日時を整形して返す
 * @param dateFormat 日付フォーマット
 */
export const getDateFormatted = (article: Article, dateFormat = 'yyyy/MM/dd') => {
  return format(new Date(article.frontMatter.date), dateFormat);
};

/** 記事が公開済みかどうか */
export const isPublished = (article: Article) => {
  return article.frontMatter.status === 'published';
};

export const stripContent = (article: Article) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...rest } = article;
  return rest as Article;
};
