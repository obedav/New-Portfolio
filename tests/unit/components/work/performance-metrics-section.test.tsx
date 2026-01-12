import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PerformanceMetricsSection } from '@/components/work/performance-metrics-section';

const mockProps = {
  lighthouse: {
    performance: 94,
    accessibility: 98,
    bestPractices: 100,
    seo: 100,
  },
  bundleSize: {
    before: '284 KB',
    after: '96 KB',
  },
  ttfb: '320ms',
  optimizations: [
    'Code splitting by route',
    'Image optimization',
    'Server Components',
  ],
  testing: {
    coverage: 82,
    frameworks: ['Vitest', 'React Testing Library', 'Playwright'],
    cicdUrl: 'https://github.com/test/actions',
  },
  security: {
    measures: [
      'Row-Level Security',
      'CSRF protection',
      'Rate limiting',
    ],
  },
};

describe('PerformanceMetricsSection', () => {
  it('renders Lighthouse scores', () => {
    render(<PerformanceMetricsSection {...mockProps} />);

    expect(screen.getByText('94')).toBeDefined();
    expect(screen.getByText('98')).toBeDefined();
    // Use getAllByText for duplicate scores
    const scoreElements = screen.getAllByText('100');
    expect(scoreElements.length).toBe(2); // Best Practices and SEO both have 100
  });

  it('renders bundle size metrics', () => {
    render(<PerformanceMetricsSection {...mockProps} />);

    expect(screen.getByText('284 KB')).toBeDefined();
    expect(screen.getByText('96 KB')).toBeDefined();
  });

  it('calculates bundle size reduction', () => {
    render(<PerformanceMetricsSection {...mockProps} />);

    // Should show ~66% reduction
    expect(screen.getByText(/66% reduction/i)).toBeDefined();
  });

  it('renders TTFB', () => {
    render(<PerformanceMetricsSection {...mockProps} />);

    expect(screen.getByText('320ms')).toBeDefined();
  });

  it('renders test coverage', () => {
    render(<PerformanceMetricsSection {...mockProps} />);

    expect(screen.getByText('82%')).toBeDefined();
  });

  it('renders all optimizations', () => {
    render(<PerformanceMetricsSection {...mockProps} />);

    expect(screen.getByText('Code splitting by route')).toBeDefined();
    expect(screen.getByText('Image optimization')).toBeDefined();
    expect(screen.getByText('Server Components')).toBeDefined();
  });

  it('renders all security measures', () => {
    render(<PerformanceMetricsSection {...mockProps} />);

    expect(screen.getByText('Row-Level Security')).toBeDefined();
    expect(screen.getByText('CSRF protection')).toBeDefined();
    expect(screen.getByText('Rate limiting')).toBeDefined();
  });
});
