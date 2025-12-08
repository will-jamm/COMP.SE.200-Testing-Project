import difference from "../src/difference";

test('should return difference of two arrays', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
});

test('should return all elements when no overlap', () => {
    expect(difference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3]);
});

test('should return empty array when all elements overlap', () => {
    expect(difference([1, 2, 3], [1, 2, 3])).toEqual([]);
});

test('should handle empty first array', () => {
    expect(difference([], [1, 2, 3])).toEqual([]);
});

test('should handle multiple exclusion arrays', () => {
    expect(difference([1, 2, 3, 4, 5], [2, 4], [3, 5])).toEqual([1]);
});

test('should handle empty exclusion array', () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
});

test('should handle null or undefined first array', () => {
    expect(difference(null, [1, 2])).toEqual([]);
    expect(difference(undefined, [1, 2])).toEqual([]);
});

test('should handle arrays with objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    expect(difference([obj1, obj2, obj3], [obj2])).toEqual([obj1, obj3]);
});

test('should handle string arrays', () => {
    expect(difference(['a', 'b', 'c'], ['b', 'd'])).toEqual(['a', 'c']);
});

test('should handle arrays with different types', () => {
    expect(difference([1, '2', 3], [2, '2'])).toEqual([1, 3]);
});