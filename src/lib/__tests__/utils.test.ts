import { describe, it, expect } from 'vitest';
import { cn, slugify, formatPhone, cleanPhone, absoluteUrl, truncate } from '../utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('handles conditional classes', () => {
    expect(cn('a', true && 'b', false && 'c')).toBe('a b');
  });
});

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('GE LM2500 Gas Turbine')).toBe('ge-lm2500-gas-turbine');
    expect(slugify('  Extra   Spaces  ')).toBe('extra-spaces');
    expect(slugify('')).toBe('');
  });
});

describe('formatPhone', () => {
  it('formats 12-digit Indian number', () => {
    expect(formatPhone('+917011123269')).toBe('+91 70111 23269');
  });

  it('formats 10-digit number', () => {
    expect(formatPhone('7011123269')).toBe('+91 70111 23269');
  });

  it('returns empty for empty input', () => {
    expect(formatPhone('')).toBe('');
  });
});

describe('cleanPhone', () => {
  it('cleans phone to digits with country code', () => {
    expect(cleanPhone('+91 70111 23269')).toBe('917011123269');
    expect(cleanPhone('7011123269')).toBe('917011123269');
  });
});

describe('absoluteUrl', () => {
  it('returns absolute URL', () => {
    const url = absoluteUrl('/products/test');
    expect(url).toContain('https://www.agoaviation.com/products/test');
  });

  it('handles empty path', () => {
    const url = absoluteUrl();
    expect(url).toBe('https://www.agoaviation.com/');
  });
});

describe('truncate', () => {
  it('truncates text to specified length', () => {
    expect(truncate('Hello world this is a test', 10)).toBe('Hello worl...');
  });

  it('returns original if shorter than limit', () => {
    expect(truncate('Short', 100)).toBe('Short');
  });

  it('returns original for empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});
