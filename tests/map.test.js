import map from "../src/map";

test('should map with a multiplier function context', () => {
    const context = { multiplier: 3 };
    function multiply(n) {
        return n * this.multiplier;
    }
    const result = map([1, 2, 3], multiply.bind(context));
    expect(result).toEqual([3, 6, 9]);
});

test('should map nested arrays', () => {
    expect(map([[1, 2], [3, 4]], (arr) => arr[0])).toEqual([1, 3]);
});

test('should handle empty array', () => {
    expect(map([], (n) => n * 2)).toEqual([]);
});

test('should handle null array', () => {
    expect(map(null, (n) => n * 2)).toEqual([]);
});

test('should handle large arrays', () => {
    const arr = Array.from({ length: 1000}, (_, i) => i);
    const result = map(arr, (n) => n * 2);
    expect(result.length).toBe(1000);
    expect(result[0]).toBe(0);
    expect(result[999]).toBe(1998);
});

