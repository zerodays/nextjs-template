/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable sonarjs/no-duplicate-string */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { deepKeysDiff } = require('./validate-translations');

// Mocking modules
jest.mock('fs');

describe('Translation Validator', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('deepKeysDiff', () => {
    it('should return correct diff of keys', () => {
      const obj1 = { a: '1', b: { c: '2', d: '3' } };
      const obj2 = { a: '1', b: { c: '2' } };
      const diff = deepKeysDiff(obj1, obj2);

      expect(diff.missingKeys).toEqual(['b.d']);
      expect(diff.extraKeys).toEqual([]);
      expect(diff.invalidTypes).toEqual([]);
    });

    it('should detect invalid types', () => {
      const obj1 = { a: '1', b: { c: '2', d: '3' } };
      const obj2 = { a: 1, b: { c: '2' } };
      const diff = deepKeysDiff(obj1, obj2);

      expect(diff.missingKeys).toEqual(['b.d']);
      expect(diff.extraKeys).toEqual([]);
      expect(diff.invalidTypes).toEqual(['a']);
    });
  });

  describe('plural check', () => {
    it('should remove number suffixes from keys', () => {
      const obj1 = {
        a: '1',
        b: { 'c#one': '2', 'c#other': '3', 'd#zero': '3', 'd#other': '3' },
        e: { f: { 'g#one': '4', 'g#other': '5' } },
      };
      const obj2 = {
        a: '1',
        b: { c: '2', d: '3' },
        e: { f: { 'g#zero': '4', 'g#other': '5', 'g#two': '32' } },
      };

      const diff = deepKeysDiff(obj1, obj2);
      expect(diff.missingKeys).toEqual([]);
      expect(diff.extraKeys).toEqual([]);
      expect(diff.invalidTypes).toEqual([]);
    });

    it('should return correct diff of keys', () => {
      const obj1 = {
        a: '1',
        b: { 'c#one': '2', 'c#other': '3', 'd#zero': '3', 'd#other': '3' },
        e: { f: { h: 'asdf' } },
      };
      const obj2 = {
        a: '1',
        b: { c: '2' },
        e: { f: { 'g#zero': '4', 'g#other': '5', 'g#two': '32' } },
      };

      const diff = deepKeysDiff(obj1, obj2);
      expect(diff.missingKeys).toEqual(['b.d', 'e.f.h']);
      expect(diff.extraKeys).toEqual(['e.f.g']);
      expect(diff.invalidTypes).toEqual([]);
    });

    it('should keep object suffixes', () => {
      const obj1 = {
        'a#one': {
          e: '1',
        },
        'a#other': {
          e: '1',
        },
        b: { 'c#one': '2', 'c#other': '3', 'd#zero': '3', 'd#other': '3' },
      };
      const obj2 = {
        a: { e: '1' },
        b: { c: '2' },
      };

      const diff = deepKeysDiff(obj1, obj2);
      expect(diff.missingKeys).toEqual(['a#one', 'a#other', 'b.d']);
      expect(diff.extraKeys).toEqual(['a']);
      expect(diff.invalidTypes).toEqual([]);
    });
  });
});
