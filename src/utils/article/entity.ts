import matter from 'gray-matter';
import format from 'date-fns/format';

import { ValidationError } from '../error/Validation';
import { PropertyRequiredError } from '../error/PropertyRequired';
import { isValidISODate } from '../date/is-valid';

/** 記事URL */
export const blogRootUrl = '/blog/posts';

/** 記事を格納しているディレクトリ（public内） */
export const blogContentsUrl = '/contents/blog';

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

/** ArticleエンティティのDTO */
export type ArticleDTO = {
  frontMatter: ArticleFrontMatter;
  content: ArticleContent;
  slug: string;
};

/** MDXからfrontMatterを取り除いた本文 */
export type ArticleContent = string;

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

  denyInvalidFrontMatter(dto.frontMatter as ArticleDTO);
};

/**
 * MDX に含まれる frontmatterを分離し、Article として返す
 * @param source MDXファイルの内容
 * @param slug このArticleのslug
 */
export const getArticleFromMdxSource = (source: string, slug: string) => {
  const { data, content } = matter(source);
  denyInvalidFrontMatter(data);

  return new Article(data as ArticleFrontMatter, content, slug);
};

/**
 * 記事エンティティ
 */
export class Article {
  private frontMatter: ArticleFrontMatter;
  private content: ArticleContent;
  private slug: string;

  constructor(frontMatter: ArticleFrontMatter, content: ArticleContent, slug: string) {
    denyInvalidFrontMatter(frontMatter);

    this.frontMatter = frontMatter;
    this.content = content;
    this.slug = slug;
  }

  getFrontMatter() {
    return this.frontMatter;
  }

  getContent() {
    return this.content;
  }

  getSlug() {
    return this.slug;
  }

  getExcerpt() {
    return this.content.substr(0, 128);
  }

  /** DTOからエンティティを生成 */
  static fromDTO(dto: Record<string, unknown>) {
    denyInvalidArticleDTO(dto);

    const articleDTO = dto as ArticleDTO;
    return new Article(articleDTO.frontMatter, articleDTO.content, articleDTO.slug);
  }

  /** MDXデータとslugからエンティティを生成 */
  static fromMdxSource(source: string, slug: string) {
    return getArticleFromMdxSource(source, slug);
  }

  /** DTOに変換 */
  toDTO() {
    return {
      frontMatter: this.frontMatter,
      content: this.content,
      slug: this.slug,
    };
  }

  /** 記事が公開済みかどうか */
  isPublished() {
    return this.frontMatter.status === 'published';
  }

  /**
   * 投稿日時を整形して返す
   * @param dateFormat 日付フォーマット
   */
  getDateFormatted(dateFormat = 'yyyy.MM.dd') {
    return format(new Date(this.frontMatter.date), dateFormat);
  }
}
