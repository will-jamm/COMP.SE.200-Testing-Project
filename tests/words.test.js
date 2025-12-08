import words from '../src/words';

test('should split a string separated by comma', () => {
    expect(words('hiihto, purjehdus, & seura')).toEqual(['hiihto', 'purjehdus', 'seura']);
    });

test('should split the string using a provided custom regex pattern', () => {
    const input = 'älkää, niitä, & hevosia';
    const pattern = /[^, ]+/g;
    expect(words(input, pattern)).toEqual(['älkää', 'niitä', '&', 'hevosia']);
});

test('should split the string separated by whitespaces', () => {
    expect(words('hello world')).toEqual(['hello', 'world']);
    expect(words('this is a longer string with spaces'))
    .toEqual(['this', 'is', 'a', 'longer', 'string', 'with', 'spaces']);
});

test('should split the string with multiple spaces & tabs', () => {
    expect(words('  foot\tbar six')).toEqual(['foot', 'bar', 'six']);
    });

test('should split the string with underscores as delimiters', () => {
    expect(words('user_name_id')).toEqual(['user', 'name', 'id']);
    });

test('should return an empty array for string with custom pattern that matches nothing', () => {
    expect(words('hello world', /\d+/g)).toEqual([]);
});

test('should split the string using a provided string pattern', () => {
    const input = 'hervanta kauppi keskusta';
    const pattern = ' ';
    expect(words(input, pattern)).toEqual(['hervanta', 'kauppi', 'keskusta']);
});

test('should return as is for NaN string', () => {
    expect(words('NaN')).toEqual(['NaN']);
    });

test('should return as is for Infinity string', () => {
    expect(words('Infinity')).toEqual(['Infinity']);
    });

test('should return an empty array for empty string', () => {
    expect(words('')).toEqual([]);
    });

test('Should return an empty array for string with punctuation marks', () => {
    expect(words('.,;:!?&')).toEqual([]);
    });

test('should split CamelCase string', () => {
    expect(words('getHTTPResponseCode')).toEqual(['get', 'HTTP', 'Response', 'Code']);
    });

test('should split numbers separated by spaces', () => {
    expect(words('123 0456')).toStrictEqual(['123', '0456']);
    });
