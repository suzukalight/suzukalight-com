import { formatJpYYYYM } from './format';

describe('utils/date', () => {
  describe('formatJpYYYYM', () => {
    test('OK', () => {
      expect(formatJpYYYYM(new Date('2020-01-01'))).toBe('2020年1月');
      expect(formatJpYYYYM(new Date('2020-12-01'))).toBe('2020年12月');
    });
  });
});
