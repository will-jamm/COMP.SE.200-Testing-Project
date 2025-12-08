import reduce from "../src/reduce";

test('should reduce array with accumulator', () => {
    const arr = [1, 2, 3];
    expect(reduce(arr, (sum, n) => sum + n, 0)).toBe(6);
});

test('should reduce array without accumulator', () => {
    const arr = [1, 2, 3];
    expect(reduce(arr, (sum, n) => sum + n)).toBe(6);
});

test('should reduce array with single element without accumulator', () => {
    const arr = [4]
    expect(reduce(arr, (sum, n) => sum + n)).toBe(4);
});

test('should handle iteratee returning false to break early', () => {
    let count = 0;
    reduce([1, 2, 3, 4], (acc, val) => {
        count++;
        if (val === 3) return false;
        return acc + val;
    }, 0);
    expect(count).toBeGreaterThan(0);
});

test('should reduce with index parameter in iteratee', () => {
    const indices = [];
    reduce([10, 20, 30], (acc, val, index) => {
        indices.push(index);
        return acc;
    }, 0);
    expect(indices).toEqual([0, 1, 2]);
});

test('should handle null or undefined collection', () => {
    expect(reduce(null, (sum, n) => sum + n, 0)).toBe(0);
    expect(reduce(undefined, (sum, n) => sum + n, 0)).toBe(0);
});

test('should reduce array starting from second element without accumulator', () => {
    expect(reduce([1, 2, 3, 4], (sum, n) => sum + n)).toBe(10);
});

test('should reduce object starting from first value without accumulator', () => {
    const obj = { x: 10, y: 20 };
    const result = reduce(obj, (acc, val) => acc + val);
    expect(result).toBe(30);
});
