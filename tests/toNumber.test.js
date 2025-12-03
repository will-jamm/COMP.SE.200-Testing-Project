import toNumber from '../src/toNumber';

test('Decimal string', () => {
    expect(toNumber('6.30')).toBe(6.30)
});