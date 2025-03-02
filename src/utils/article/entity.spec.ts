import { PropertyRequiredError } from '../error/PropertyRequired';
import { ValidationError } from '../error/Validation';
import { ArticleFrontMatter, denyInvalidArticleDTO } from './entity';

describe('ArticleEntity', () => {
  describe('constructor', () => {
    const frontMatter: ArticleFrontMatter = {
      title: 'タイトル',
      date: '2020-12-22T12:34:56',
      status: 'published',
    };
    const content = '# Sample content';
    const slug = 'md-sample';

    test('OK: エンティティを生成できた', () => {
      denyInvalidArticleDTO({ frontMatter, content, slug });
      expect(true).toBe(true);
    });

    test('NG: title が不足しているため、失敗した', () => {
      const illegalFrontMatter = {
        date: frontMatter.date,
        status: frontMatter.status,
      } as ArticleFrontMatter;

      expect(() =>
        denyInvalidArticleDTO({ frontMatter: illegalFrontMatter, content, slug }),
      ).toThrow(PropertyRequiredError);
    });

    test('NG: tags が配列ではないため、失敗した', () => {
      const illegalFrontMatter = {
        title: frontMatter.title,
        date: frontMatter.date,
        status: frontMatter.status,
        tags: 'tag-not-array',
      } as unknown as ArticleFrontMatter;

      expect(() =>
        denyInvalidArticleDTO({ frontMatter: illegalFrontMatter, content, slug }),
      ).toThrow(ValidationError);
    });

    test('NG: date が正しくないため、失敗した', () => {
      const illegalFrontMatter = {
        title: frontMatter.title,
        date: 'illegal date',
        status: frontMatter.status,
      } as ArticleFrontMatter;

      expect(() =>
        denyInvalidArticleDTO({ frontMatter: illegalFrontMatter, content, slug }),
      ).toThrow(ValidationError);
    });

    test('NG: status が正しくないため、失敗した', () => {
      const illegalFrontMatter = {
        title: frontMatter.title,
        date: frontMatter.date,
        status: 'invalidStatus',
      } as unknown as ArticleFrontMatter;

      expect(() =>
        denyInvalidArticleDTO({ frontMatter: illegalFrontMatter, content, slug }),
      ).toThrow(ValidationError);
    });
  });
});
