import { describe, it, expect } from 'vitest';
import { cn, formatNumber, slugify } from '@/lib/utils';

describe('cn (className merger)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active')).toBe('base active');
    expect(cn('base', false && 'inactive')).toBe('base');
  });

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });

  it('merges Tailwind classes correctly (last wins)', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles object syntax', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('handles complex Tailwind conflicts', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('bg-red-500 hover:bg-red-600', 'bg-blue-500')).toBe('hover:bg-red-600 bg-blue-500');
  });
});

describe('formatNumber', () => {
  describe('small numbers (under 1000)', () => {
    it('returns number as string for values under 1000', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(1)).toBe('1');
      expect(formatNumber(100)).toBe('100');
      expect(formatNumber(999)).toBe('999');
    });

    it('handles negative small numbers', () => {
      expect(formatNumber(-1)).toBe('-1');
      expect(formatNumber(-500)).toBe('-500');
    });
  });

  describe('thousands (K)', () => {
    it('formats thousands with K suffix', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(10000)).toBe('10.0K');
      expect(formatNumber(999999)).toBe('1000.0K');
    });

    it('formats thousands with one decimal place', () => {
      expect(formatNumber(1234)).toBe('1.2K');
      expect(formatNumber(5678)).toBe('5.7K');
    });
  });

  describe('millions (M)', () => {
    it('formats millions with M suffix', () => {
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(10000000)).toBe('10.0M');
    });

    it('formats millions with one decimal place', () => {
      expect(formatNumber(1234567)).toBe('1.2M');
      expect(formatNumber(9876543)).toBe('9.9M');
    });
  });

  describe('edge cases', () => {
    it('handles decimal inputs', () => {
      expect(formatNumber(1000.5)).toBe('1.0K');
      expect(formatNumber(1500.9)).toBe('1.5K');
    });

    it('handles very large numbers', () => {
      expect(formatNumber(1000000000)).toBe('1000.0M');
    });
  });
});

describe('slugify', () => {
  describe('basic transformations', () => {
    it('converts to lowercase', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('UPPERCASE')).toBe('uppercase');
    });

    it('replaces spaces with hyphens', () => {
      expect(slugify('hello world')).toBe('hello-world');
      expect(slugify('one two three')).toBe('one-two-three');
    });

    it('handles multiple consecutive spaces', () => {
      expect(slugify('hello   world')).toBe('hello-world');
    });
  });

  describe('special characters', () => {
    it('removes special characters', () => {
      expect(slugify('hello@world!')).toBe('helloworld');
      expect(slugify('test#123$')).toBe('test123');
    });

    it('keeps hyphens between words', () => {
      expect(slugify('hello-world')).toBe('hello-world');
    });

    it('removes multiple consecutive hyphens', () => {
      expect(slugify('hello--world')).toBe('hello-world');
      expect(slugify('test---case')).toBe('test-case');
    });

    it('removes leading hyphens', () => {
      expect(slugify('-hello')).toBe('hello');
      expect(slugify('---test')).toBe('test');
    });

    it('removes trailing hyphens', () => {
      expect(slugify('hello-')).toBe('hello');
      expect(slugify('test---')).toBe('test');
    });
  });

  describe('real-world examples', () => {
    it('handles typical blog post titles', () => {
      expect(slugify('Building SaaS with Next.js')).toBe('building-saas-with-nextjs');
      expect(slugify('10 Tips for Better Code')).toBe('10-tips-for-better-code');
      expect(slugify("What's New in React 19?")).toBe('whats-new-in-react-19');
    });

    it('handles project names', () => {
      expect(slugify('Finance Tracker')).toBe('finance-tracker');
      expect(slugify('SwiftPass Visa Platform')).toBe('swiftpass-visa-platform');
    });
  });

  describe('edge cases', () => {
    it('handles empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('handles string with only special characters', () => {
      expect(slugify('!@#$%')).toBe('');
    });

    it('handles string with only spaces', () => {
      expect(slugify('   ')).toBe('');
    });

    it('preserves numbers', () => {
      expect(slugify('version 2.0')).toBe('version-20');
      expect(slugify('100 ways')).toBe('100-ways');
    });
  });
});
