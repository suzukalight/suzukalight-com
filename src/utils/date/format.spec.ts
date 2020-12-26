import { formatJpYYYYM, formatJpYYYYMM, formatYYYYMM } from './format';

describe('utils/date', () => {
  describe('formatYYYYMM', () => {
    test('OK', () => {
      expect(formatYYYYMM(new Date('2020-01-01'))).toBe('2020.01');
    });
  });

  describe('formatYYYYMM', () => {
    test('OK', () => {
      expect(formatJpYYYYM(new Date('2020-01-01'))).toBe('2020年1月');
    });
  });

  describe('formatYYYYMM', () => {
    test('OK', () => {
      expect(formatJpYYYYMM(new Date('2020-01-01'))).toBe('2020年01月');
    });
  });
});
