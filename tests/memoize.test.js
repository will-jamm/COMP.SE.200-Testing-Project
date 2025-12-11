import memoize from "../src/memoize";

test('should memoize function results', () => {
    let callCount = 0;
    const memoized = memoize((n) => {
        callCount++;
        return n * 2;
    });
    
    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(callCount).toBe(1);
});

test('should expose cache property', () => {
    const memoized = memoize((n) => n * 2);
    memoized(5);
    
    expect(memoized.cache).toBeDefined();
    expect(memoized.cache.get(5)).toBe(10);
});

test('should allow cache manipulation', () => {
    const memoized = memoize((n) => n * 2);
    memoized(5);
    
    memoized.cache.set(5, 100);
    expect(memoized(5)).toBe(100);
});

test('should allow cache clearing', () => {
    let callCount = 0;
    const memoized = memoize((n) => {
        callCount++;
        return n * 2;
    });
    
    memoized(5);
    memoized.cache.clear();
    memoized(5);
    
    expect(callCount).toBe(2);
});

test('should cache different arguments separately', () => {
    const memoized = memoize((n) => n * 2);
    
    expect(memoized(3)).toBe(6);
});

test('should handle cache.set returning falsy value', () => {
    const memoized = memoize((n) => n * 2);

    const customCache = {
        map: new Map(),
        has(key) { return this.map.has(key); },
        get(key) { return this.map.get(key); },
        set(key, value) {
            this.map.set(key, value);
            return undefined;
        }
    };

    memoized.cache = customCache
    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
});

test('should handle undefined as argument', () => {
    const memoized = memoize((val) => val === undefined ? 'undefined' : val);
    
    expect(memoized(undefined)).toBe('undefined');
});

test('should handle null as argument', () => {
    const memoized = memoize((val) => val === null ? 'null' : val);
    
    expect(memoized(null)).toBe('null');
});

test('should memoize with multiple arguments', () => {
    const memoized = memoize((a, b, c) => a + b + c);
    
    expect(memoized(1, 2, 3)).toBe(6);
});

test('should throw error when func is not a function', () => {
    expect(() => memoize('not a function')).toThrow(TypeError);
    expect(() => memoize(123)).toThrow(TypeError);
});

test('should throw error when resolver is not a function', () => {
    expect(() => memoize(() => {}, 'not a function')).toThrow(TypeError);
});

test('should replace cache with custom Map-like object', () => {
    const memoized = memoize((n) => n * 2);
    const customCache = new Map();
    
    memoized.cache = customCache;
    memoized(5);
    expect(customCache.get(5)).toBe(10);
});

test('should memoize expensive calculations', () => {
    let calculations = 0;
    const memoized = memoize((n) => {
        calculations++;
        let result = 0;
        for (let i = 0; i < n; i++) {
            result += i;
        }
        return result;
    });
    
    memoized(1000);
    memoized(1000);
    expect(calculations).toBe(1);
});

test('should use custom resolver', () => {
    let resolverCalls = 0;
    const memoized = memoize(
        (a, b) => a + b,
        (...args) => {
            resolverCalls++;
            return args.join('-')
        }
    );

    expect(memoized(1, 2)).toBe(3)
    expect(memoized(1, 2)).toBe(3)
    expect(resolverCalls).toBe(2);
})

