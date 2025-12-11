import words from '../../src/words.js';

describe('words', () => {
  describe('Basic ASCII word extraction', () => {
    test('should extract words from simple sentence', () => {
      expect(words('hello world')).toEqual(['hello', 'world']);
    });

    test('should handle words separated by commas', () => {
      expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    });

    test('should extract words from mixed case strings', () => {
      expect(words('Hello World Test')).toEqual(['Hello', 'World', 'Test']);
    });

    test('should handle single word', () => {
      expect(words('hello')).toEqual(['hello']);
    });

    test('should handle empty string', () => {
      expect(words('')).toEqual([]);
    });

    test('should handle string with only special characters', () => {
      expect(words('!@#$%^&*()')).toEqual([]);
    });

    test('should handle string with only spaces', () => {
      expect(words('     ')).toEqual([]);
    });

    test('should extract alphanumeric words', () => {
      expect(words('test123 hello456')).toEqual(['test', '123', 'hello', '456']);
    });

    test('should handle words with numbers', () => {
      expect(words('item1 item2 item3')).toEqual(['item', '1', 'item', '2', 'item', '3']);
    });

    test('should handle multiple spaces between words', () => {
      expect(words('hello    world')).toEqual(['hello', 'world']);
    });
  });

  describe('Words with punctuation', () => {
    test('should remove trailing punctuation', () => {
      expect(words('hello, world!')).toEqual(['hello', 'world']);
    });

    test('should handle various punctuation marks', () => {
      expect(words('hello; world: test.')).toEqual(['hello', 'world', 'test']);
    });

    test('should handle quotes', () => {
      expect(words('"hello" \'world\'')).toEqual(['hello', 'world']);
    });

    test('should handle parentheses and brackets', () => {
      expect(words('(hello) [world] {test}')).toEqual(['hello', 'world', 'test']);
    });

    test('should handle hyphens and underscores', () => {
      expect(words('hello-world test_case')).toEqual(['hello', 'world', 'test', 'case']);
    });
  });

  describe('CamelCase and PascalCase', () => {
    test('should split camelCase words', () => {
      expect(words('camelCase')).toEqual(['camel', 'Case']);
    });

    test('should split PascalCase words', () => {
      expect(words('PascalCase')).toEqual(['Pascal', 'Case']);
    });

    test('should handle mixed camelCase string', () => {
      expect(words('myVariableName')).toEqual(['my', 'Variable', 'Name']);
    });

    test('should handle acronyms in PascalCase', () => {
      expect(words('HTTPRequest')).toEqual(['HTTP', 'Request']);
    });

    test('should handle multiple consecutive uppercase letters', () => {
      expect(words('XMLHttpRequest')).toEqual(['XML', 'Http', 'Request']);
    });
  });

  describe('Custom pattern parameter', () => {
    test('should use custom regex pattern', () => {
      expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
    });

    test('should extract numbers with custom pattern', () => {
      expect(words('abc123def456', /\d+/g)).toEqual(['123', '456']);
    });

    test('should extract letters with custom pattern', () => {
      expect(words('abc123def456', /[a-z]+/g)).toEqual(['abc', 'def']);
    });

    test('should handle custom pattern with no matches', () => {
      expect(words('hello world', /\d+/g)).toEqual([]);
    });

    test('should handle custom pattern matching whole string', () => {
      expect(words('test', /.*/g)).toEqual(['test', '']);
    });

    test('should extract specific characters with custom pattern', () => {
      expect(words('a1b2c3', /[a-z]/g)).toEqual(['a', 'b', 'c']);
    });
  });

  describe('Unicode and special characters', () => {
    test('should handle Unicode characters', () => {
      const result = words('hello café world');
      expect(result).toContain('hello');
      expect(result).toContain('world');
    });

    test('should handle emoji mixed with words', () => {
      const result = words('hello 😊 world');
      expect(result).toEqual(expect.arrayContaining(['hello', 'world']));
    });

    test('should handle accented characters', () => {
      const result = words('résumé naïve');
      expect(result.length).toBeGreaterThan(0);
    });

    test('should handle Chinese/Japanese/Korean characters', () => {
      const result = words('你好世界');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('should throw error for undefined input', () => {
      expect(() => words(undefined)).toThrow();
    });

    test('should throw error for null input', () => {
      expect(() => words(null)).toThrow();
    });

    test('should handle numbers as strings', () => {
      expect(words('123 456 789')).toEqual(['123', '456', '789']);
    });

    test('should handle leading and trailing spaces', () => {
      expect(words('  hello world  ')).toEqual(['hello', 'world']);
    });

    test('should handle tabs and newlines', () => {
      expect(words('hello\tworld\ntest')).toEqual(['hello', 'world', 'test']);
    });

    test('should handle very long strings', () => {
      const longString = 'word '.repeat(100);
      const result = words(longString);
      expect(result.length).toBe(100);
      expect(result.every(w => w === 'word')).toBe(true);
    });

    test('should return empty array for string with only numbers and punctuation', () => {
      const result = words('123, 456, 789');
      expect(result).toEqual(['123', '456', '789']);
    });

    test('should handle contractions', () => {
      const result = words("don't can't won't");
      expect(result.length).toBeGreaterThan(0);
    });

    test('should handle possessives', () => {
      const result = words("John's book Mary's pen");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Mixed format strings', () => {
    test('should handle snake_case', () => {
      expect(words('snake_case_variable')).toEqual(['snake', 'case', 'variable']);
    });

    test('should handle kebab-case', () => {
      expect(words('kebab-case-variable')).toEqual(['kebab', 'case', 'variable']);
    });

    test('should handle dot notation', () => {
      expect(words('object.property.method')).toEqual(['object', 'property', 'method']);
    });

    test('should handle mixed formats', () => {
      const result = words('camelCase snake_case kebab-case');
      expect(result.length).toBeGreaterThan(0);
    });

    test('should handle file paths', () => {
      const result = words('src/components/Button.js');
      expect(result).toContain('src');
      expect(result).toContain('components');
    });

    test('should handle URLs', () => {
      const result = words('http://example.com/path');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Pattern edge cases', () => {
    test('should handle pattern as string (converted to string match)', () => {
      const result = words('hello world hello', 'hello');
      expect(Array.isArray(result)).toBe(true);
    });

    test('should handle space pattern', () => {
      expect(words('hello world', / /g)).toEqual([' ']);
    });

    test('should handle pattern without global flag', () => {
      const result = words('test1 test2 test3', /test\d/);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Type coercion', () => {
    test('should throw error for number input', () => {
      expect(() => words(12345)).toThrow();
    });

    test('should throw error for boolean input', () => {
      expect(() => words(true)).toThrow();
    });

    test('should throw error for object input', () => {
      const obj = {
        toString: () => 'hello world'
      };
      expect(() => words(obj)).toThrow();
    });
  });

  describe('Return value consistency', () => {
    test('should always return an array', () => {
      expect(Array.isArray(words(''))).toBe(true);
      expect(Array.isArray(words('test'))).toBe(true);
      expect(Array.isArray(words('test', /x/))).toBe(true);
    });

    test('should return empty array when no matches with pattern', () => {
      expect(words('hello', /\d+/g)).toEqual([]);
    });

    test('should not return null or undefined', () => {
      expect(words('')).not.toBeNull();
      expect(words('')).not.toBeUndefined();
    });
  });
});
