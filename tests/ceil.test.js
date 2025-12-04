import ceil from '../src/ceil';

test('Ceil without precision', () => {
    expect(ceil(5.006)).toBe(6);
    });

test('Ceil with positive precision', () => {
    expect(ceil(5.004, 2)).toBe(5.01);
    });

test('Ceil with negative precision', () => {
    expect(ceil(5004, -2)).toBe(5100);
    });

test('Ceil with zero precision', () => {
    expect(ceil(5.6, 0)).toBe(6);
    });

test('ceil with large positive precision', () => {
    expect(ceil(4.0001234, 6)).toBe(4.000124);
    });

test('ceil with large negative precision', () => {
    expect(ceil(412345, -4)).toBe(420000);
    });
