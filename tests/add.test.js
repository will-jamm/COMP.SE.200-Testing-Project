import add from "../src/add";

test('should add two positive numbers', () => {
    expect(add(10, 5)).toBe(15);
});

test('should add two zeros', () => {
    expect(add(0, 0)).toBe(0);
});

test('should add zero to a number', () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
});

test('should add positive and negative number', () => {
    expect(add(10, -3)).toBe(7);
});

test('should add two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);

});

test('should add large numbers', () => {
    expect(add(1000000, 2000000)).toBe(3000000);
});

test('should handle undefined as zero', () => {
    expect(add(5, undefined)).toBe(5);
    expect(add(undefined, 5)).toBe(5);
});