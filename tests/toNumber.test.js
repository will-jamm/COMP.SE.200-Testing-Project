import { transformSync } from '@babel/core';
import toNumber from '../src/toNumber';

test('should convert string to a number', () => {
    expect(toNumber('6.30')).toBe(6.30)
});

test('should convert a string with comma as a decimal to a number', () => {
    expect(toNumber('10,80')).toBe(10.80);
});

test('should return NaN for an empty string', () => {
    expect(toNumber('')).toBe(NaN);
});

test('should remove currency symbols', () => {
    expect(toNumber('25.00€')).toBe(25.00);
    expect(toNumber('€5.00')).toBe(5.00);
});

test('should return NaN for non-numeric strings', () => {
    expect(toNumber('testi')).toBe(NaN);
    expect(toNumber('123a')).toBeNaN();
});

test('should return the same number for correct input', () => {
    expect(toNumber(9.90)).toBe(9.90);
    expect(toNumber(0)).toBe(0);
    expect(toNumber(-10)).toBe(-10);
});

test('should return infinity for infinity as a string', () => {
    expect(toNumber('Infinity')).toBe(Infinity);
});

test('should convert a string with whitespaces to a number', () => {
    expect(toNumber('     10   ')).toBe(10);
    expect(toNumber('\t42\n')).toBe(42);
});

test('should convert a binary string to a number', () => {
    expect(toNumber('0b1110')).toBe(14.00);
    expect(toNumber('0b1111')).toBe(15.00);
});

test('should convert a octal string to a number', () => {
    expect(toNumber('0o10')).toBe(8);
    expect(toNumber('0o77')).toBe(63);
});

test('should convert a negative string to a number', () => {
    expect(toNumber('-12.50')).toBe(-12.50);
});

test('should return valueOf for object', () => {
    const obj = {
        valueOf: () => 42
    };
    expect(toNumber(obj)).toBe(42);
});

test('should return NaN for object without valueOf method', () => {
    const obj = { value: 10 };
    expect(toNumber(obj)).toBeNaN();
});

test('should return NaN for symbols', () => {
    const sym = Symbol('testi');
    expect(toNumber(sym)).toBe(NaN);
});