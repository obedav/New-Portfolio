import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CaseStudyHeader } from '@/components/work/case-study-header';
import { Project } from '@/types/project';

const mockProject: Project = {
  slug: 'test-project',
  name: 'Test Project',
  oneLiner: 'A test project for unit testing',
  keyMetric: '100+ users',
  category: 'SaaS',
  product: {
    problem: 'Test problem',
    solution: 'Test solution',
    targetUsers: 'Test users',
    screenshot: '/test.png',
    githubUrl: 'https://github.com/test',
  },
  engineering: {
    techStack: [],
    architecture: {
      diagram: '/test-diagram.svg',
      description: 'Test architecture',
    },
    keyDecisions: [],
  },
  quality: {
    testing: {
      coverage: 80,
      frameworks: ['Vitest'],
      cicdUrl: 'https://github.com/test/actions',
    },
    performance: {
      lighthouse: {
        performance: 90,
        accessibility: 95,
        bestPractices: 90,
        seo: 95,
      },
      bundleSize: {
        after: '100 KB',
      },
      ttfb: '300ms',
      optimizations: [],
    },
    security: {
      measures: [],
    },
  },
  tradeoffs: {
    constraints: [],
    wouldChange: [],
    knownLimitations: [],
    scalingConsiderations: [],
  },
};

describe('CaseStudyHeader', () => {
  it('renders project name', () => {
    render(<CaseStudyHeader project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeDefined();
  });

  it('renders project one-liner', () => {
    render(<CaseStudyHeader project={mockProject} />);
    expect(screen.getByText('A test project for unit testing')).toBeDefined();
  });

  it('renders category badge', () => {
    render(<CaseStudyHeader project={mockProject} />);
    expect(screen.getByText('SaaS')).toBeDefined();
  });

  it('renders key metric badge', () => {
    render(<CaseStudyHeader project={mockProject} />);
    expect(screen.getByText('100+ users')).toBeDefined();
  });
});
