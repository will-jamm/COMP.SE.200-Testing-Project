import toString from "../src/toString";

test('should return as is for a string', () => {
    expect(toString('wabu ei lobu')).toBe('wabu ei lobu');
});

test('should return empty string for null value', () => {
    expect(toString(null)).toBe('');
});

test('should convert array of values to string', () => {
    const vals = [10, 3, 15, 4];
    expect(toString(vals)).toBe('10,3,15,4');
});

test('should convert null array to string', () => {
    const vals = [null];
    expect(toString(vals)).toBe('');
});

test('should convert symbol to string', () => {
    const sym = Symbol(15);
    expect(toString(sym)).toBe('Symbol(15)');
});

test('should convert objects to string', () => {
    expect(toString({})).toBe('[object Object]');
});

test('should preserve -0', () => {
    expect(toString(-0)).toBe('-0');
});

test('should convert 0 to string', () => {
    expect(toString(0)).toBe('0');
});

test('should convert a negative value to string', () => {
    expect(toString(-13.5)).toBe('-13.5');
});


