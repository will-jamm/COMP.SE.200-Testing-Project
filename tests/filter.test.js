import filter from "../src/filter";

test('should filter array with predicate function', () => {
    const users = [
        { user: 'tthp', active:true },
        { user: 'spinni', active: false}
    ];
    expect(filter(users, ({ active }) => active)).toEqual([{ user: 'tthp', active: true}])
});

test('should pass index to predicate', () => {
    const indices = [];
    filter([10, 20, 30], (val, index) => {
        indices.push(index);
        return true;
    });
    expect(indices).toEqual([0, 1, 2]);
});

test('should handle empty array', () => {
    expect(filter([], (n) => n > 0)).toEqual([[]]);
});

test('should filter numbers greater than treshold', () => {
    expect(filter([0, 2, 4, 6, 10], (n) => n > 3)).toEqual([4, 6, 10]);
});

test('should filter strings by length', () => {
    expect(filter(['a', 'abc', 'ab', 'abcd'], (str) => str.length > 2)).toEqual(['abc', 'abcd']);
});

test('should handle null or undefined array', () => {
    expect(filter(null, (n) => n > 0)).toEqual([[]]);
    expect(filter(undefined, (n) => n > 0)).toEqual([[]]);
});