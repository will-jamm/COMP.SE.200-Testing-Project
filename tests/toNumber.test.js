import toNumber from '../src/toNumber';

test('Decimal string', () => {
    expect(toNumber('6.30')).toBe(6.30)
});

test('Parse with comma as decimal', () => {
    expect(toNumber('10,80')).toBe(10.80);
});

test('Empty string', () => {
    expect(toNumber('')).toBe(NaN);
});

test('Currency symbol', () => {
    expect(toNumber('25.00€')).toBe(25.00);
});

test('Invalid string', () => {
    expect(toNumber('testi')).toBe(NaN);
});

test('Input already a number in correct format', () => {
    expect(toNumber('9.9')).toBe(9.90);
});

test('Infinity as string', () => {
    expect(toNumber('Infinity')).toBe(Infinity);
});

test('Whitespaces in string', () => {
    expect(toNumber('     10   ')).toBe(10);
    expect(toNumber('\t42\n')).toBe(42);
});

test('Binary literal string', () => {
    expect(toNumber('0b1110')).toBe(14.00);
    expect(toNumber('0b1111')).toBe(15.00);
});

test('Negative number string', () => {
    expect(toNumber('-12.50')).toBe(-12.50);
});

test('toNumber with object having valueOf method', () => {
    const obj = {
        valueOf: () => 42
    };
    expect(toNumber(obj)).toBe(42);
});