import words from '../src/words';

test('Comma-separated ascii words', () => {
    expect(words('hiihto, purjehdus, & seura')).toStrictEqual(['hiihto', 'purjehdus', 'seura']);
    });

test('Space seprated ascii words', () => {
    expect(words('hello world')).toStrictEqual(['hello', 'world']);
});

test('Multiple spaces & tabs', () => {
    expect(words('foot\tbar six')).toStrictEqual(['foot', 'bar', 'six']);
    });

test('Underscores as delimiters', () => {
    expect(words('user_name_id')).toStrictEqual(['user', 'name', 'id']);
    });

test('NaN string', () => {
    expect(words('NaN')).toStrictEqual(['Na', 'N']);
    });

test('Infinity', () => {
    expect(words('Infinity')).toStrictEqual(['Infinity']);
    });

test('Empty string', () => {
    expect(words('')).toStrictEqual([]);
    });

test('Punctuation marks only', () => {
    expect(words('.,;:!?&')).toStrictEqual([]);
    });

test('CamelCase string', () => {
    expect(words('getHTTPResponseCode')).toStrictEqual(['get', 'HTTP', 'Response', 'Code']);
    });

test('Numbers separated by spaces', () => {
    expect(words('123 0456')).toStrictEqual(['123', '0456']);
    });
