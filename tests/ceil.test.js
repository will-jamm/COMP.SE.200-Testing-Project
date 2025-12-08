import ceil from '../src/ceil';

test('should round upwards without precision', () => {
    expect(ceil(5.006)).toBe(6);
    });

test('should round upwards to two decimal precision', () => {
    expect(ceil(5.004, 2)).toBe(5.01);
    });

test('should round upwards with negative precision', () => {
    expect(ceil(5004, -2)).toBe(5100);
    });

test('should round upwards with zero precision', () => {
    expect(ceil(5.6, 0)).toBe(6);
    });

test('should round upwards with 6 decimal precision', () => {
    expect(ceil(4.0001234, 6)).toBe(4.000124);
    });

test('should round upwards with larger negative precision', () => {
    expect(ceil(412345, -4)).toBe(420000);
    });
