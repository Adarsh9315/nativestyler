import { cache, hashFunction } from '../../src/cache';

describe('cache', () => {
    beforeEach(() => {
        // Clear the cache before each test
        cache.clear();
    });

    test('cache should set and get values correctly', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');

        expect(cache.get('key1')).toBe('value1');
        expect(cache.get('key2')).toBe('value2');
    });

    test('cache should return undefined for non-existent keys', () => {
        expect(cache.get('nonexistent')).toBeUndefined();
    });

    test('cache should clear values', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');

        cache.clear();

        expect(cache.get('key1')).toBeUndefined();
        expect(cache.get('key2')).toBeUndefined();
    });
});

describe('hashFunction', () => {
    test('hashFunction should generate unique hash strings', () => {
        const props1 = { prop1: 'value1', prop2: 'value2' };
        const props2 = { prop1: 'value3', prop2: 'value4' }; // Different props
        const theme = { themeProp: 'themeValue' };

        const hash1 = hashFunction(props1, theme);
        const hash2 = hashFunction(props2, theme);

        expect(hash1).not.toBe(hash2); // Hashes should be different for different props
    });
});

