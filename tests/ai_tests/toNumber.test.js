import toNumber from '../../src/toNumber.js';

describe('toNumber', () => {
  describe('Number inputs', () => {
    test('should return the same number for positive integers', () => {
      expect(toNumber(42)).toBe(42);
      expect(toNumber(100)).toBe(100);
    });

    test('should return the same number for negative integers', () => {
      expect(toNumber(-42)).toBe(-42);
      expect(toNumber(-100)).toBe(-100);
    });

    test('should return the same number for floating point numbers', () => {
      expect(toNumber(3.14)).toBe(3.14);
      expect(toNumber(-2.718)).toBe(-2.718);
    });

    test('should handle zero correctly', () => {
      expect(toNumber(0)).toBe(0);
      expect(Object.is(toNumber(0), 0)).toBe(true);
    });

    test('should handle negative zero correctly', () => {
      expect(toNumber(-0)).toBe(-0);
      expect(Object.is(toNumber(-0), -0)).toBe(true);
    });

    test('should handle Infinity', () => {
      expect(toNumber(Infinity)).toBe(Infinity);
      expect(toNumber(-Infinity)).toBe(-Infinity);
    });

    test('should handle Number constants', () => {
      expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
      expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
      expect(toNumber(Number.EPSILON)).toBe(Number.EPSILON);
    });

    test('should handle NaN', () => {
      expect(toNumber(NaN)).toBeNaN();
    });
  });

  describe('Symbol inputs', () => {
    test('should return NaN for symbols', () => {
      expect(toNumber(Symbol('test'))).toBeNaN();
      expect(toNumber(Symbol.iterator)).toBeNaN();
    });
  });

  describe('Object inputs', () => {
    test('should handle objects with valueOf returning a number', () => {
      const obj = {
        valueOf: () => 42
      };
      expect(toNumber(obj)).toBe(42);
    });

    test('should handle objects with valueOf returning a string number', () => {
      const obj = {
        valueOf: () => '100'
      };
      expect(toNumber(obj)).toBe(100);
    });

    test('should handle objects with valueOf returning an object', () => {
      const innerObj = { value: 10 };
      const obj = {
        valueOf: () => innerObj
      };
      expect(toNumber(obj)).toBeNaN();
    });

    test('should handle objects without valueOf function', () => {
      const obj = { value: 50 };
      expect(toNumber(obj)).toBeNaN();
    });

    test('should handle Date objects', () => {
      const date = new Date('2023-01-01T00:00:00.000Z');
      expect(toNumber(date)).toBe(date.valueOf());
    });

    test('should handle arrays with single number', () => {
      expect(toNumber([42])).toBe(42);
    });

    test('should handle empty arrays', () => {
      expect(toNumber([])).toBe(0);
    });

    test('should handle arrays with multiple elements', () => {
      expect(toNumber([1, 2, 3])).toBeNaN();
    });

    test('should handle Number objects', () => {
      expect(toNumber(new Number(42))).toBe(42);
    });

    test('should handle String objects', () => {
      expect(toNumber(new String('42'))).toBe(42);
    });

    test('should handle Boolean objects', () => {
      expect(toNumber(new Boolean(true))).toBe(1);
      expect(toNumber(new Boolean(false))).toBe(0);
    });
  });

  describe('Non-string, non-object, non-symbol primitive inputs', () => {
    test('should convert null to 0', () => {
      expect(toNumber(null)).toBe(0);
    });

    test('should convert undefined to NaN', () => {
      expect(toNumber(undefined)).toBeNaN();
    });

    test('should convert boolean true to 1', () => {
      expect(toNumber(true)).toBe(1);
    });

    test('should convert boolean false to 0', () => {
      expect(toNumber(false)).toBe(0);
    });
  });

  describe('String inputs', () => {
    test('should convert numeric strings', () => {
      expect(toNumber('42')).toBe(42);
      expect(toNumber('3.14')).toBe(3.14);
      expect(toNumber('-100')).toBe(-100);
    });

    test('should handle strings with leading whitespace', () => {
      expect(toNumber('  42')).toBe(42);
      expect(toNumber('\t100')).toBe(100);
      expect(toNumber('\n50')).toBe(50);
    });

    test('should handle strings with trailing whitespace', () => {
      expect(toNumber('42  ')).toBe(42);
      expect(toNumber('100\t')).toBe(100);
      expect(toNumber('50\n')).toBe(50);
    });

    test('should handle strings with both leading and trailing whitespace', () => {
      expect(toNumber('  42  ')).toBe(42);
      expect(toNumber('\t100\t')).toBe(100);
    });

    test('should handle binary string values', () => {
      expect(toNumber('0b101010')).toBe(42);
      expect(toNumber('0b1111')).toBe(15);
      expect(toNumber('0b0')).toBe(0);
    });

    test('should handle octal string values', () => {
      expect(toNumber('0o52')).toBe(42);
      expect(toNumber('0o17')).toBe(15);
      expect(toNumber('0o0')).toBe(0);
    });

    test('should return NaN for bad hexadecimal strings', () => {
      expect(toNumber('-0x10')).toBeNaN();
      expect(toNumber('+0x10')).toBeNaN();
    });

    test('should handle valid hexadecimal strings', () => {
      expect(toNumber('0x2A')).toBe(42);
      expect(toNumber('0xFF')).toBe(255);
    });

    test('should handle empty strings', () => {
      expect(toNumber('')).toBe(0);
    });

    test('should handle whitespace-only strings', () => {
      expect(toNumber('   ')).toBe(0);
      expect(toNumber('\t\n')).toBe(0);
    });

    test('should handle scientific notation', () => {
      expect(toNumber('1e2')).toBe(100);
      expect(toNumber('1.5e3')).toBe(1500);
      expect(toNumber('5e-2')).toBe(0.05);
    });

    test('should return NaN for invalid numeric strings', () => {
      expect(toNumber('abc')).toBeNaN();
      expect(toNumber('12abc')).toBeNaN();
      expect(toNumber('not a number')).toBeNaN();
    });

    test('should handle Infinity strings', () => {
      expect(toNumber('Infinity')).toBe(Infinity);
      expect(toNumber('-Infinity')).toBe(-Infinity);
    });
  });

  describe('Edge cases', () => {
    test('should handle objects with valueOf returning 0', () => {
      const obj = {
        valueOf: () => 0
      };
      expect(toNumber(obj)).toBe(0);
      expect(Object.is(toNumber(obj), 0)).toBe(true);
    });

    test('should handle objects with valueOf returning -0', () => {
      const obj = {
        valueOf: () => -0
      };
      expect(toNumber(obj)).toBe(-0);
      expect(Object.is(toNumber(obj), -0)).toBe(true);
    });

    test('should handle objects with valueOf returning null', () => {
      const obj = {
        valueOf: () => null
      };
      expect(toNumber(obj)).toBe(0);
    });

    test('should handle objects with valueOf returning undefined', () => {
      const obj = {
        valueOf: () => undefined
      };
      expect(toNumber(obj)).toBeNaN();
    });

    test('should handle objects with valueOf returning boolean', () => {
      const objTrue = {
        valueOf: () => true
      };
      const objFalse = {
        valueOf: () => false
      };
      expect(toNumber(objTrue)).toBe(1);
      expect(toNumber(objFalse)).toBe(0);
    });

    test('should handle very large numbers', () => {
      expect(toNumber('9007199254740991')).toBe(9007199254740991);
    });

    test('should handle very small numbers', () => {
      expect(toNumber('0.0000000001')).toBe(0.0000000001);
    });

    test('should handle mixed case binary strings', () => {
      expect(toNumber('0B1010')).toBe(10);
    });

    test('should handle mixed case octal strings', () => {
      expect(toNumber('0O12')).toBe(10);
    });
  });
});
