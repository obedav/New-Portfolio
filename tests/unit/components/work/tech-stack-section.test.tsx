import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechStackSection } from '@/components/work/tech-stack-section';
import { TechStackItem } from '@/types/project';

const mockTechStack: TechStackItem[] = [
  { name: 'Next.js', icon: 'next', category: 'Frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'Frontend' },
  { name: 'PostgreSQL', icon: 'postgres', category: 'Database' },
  { name: 'Node.js', icon: 'node', category: 'Backend' },
];

describe('TechStackSection', () => {
  it('renders tech stack title', () => {
    render(<TechStackSection techStack={mockTechStack} />);
    expect(screen.getByText('Tech Stack')).toBeDefined();
  });

  it('renders all tech stack items', () => {
    render(<TechStackSection techStack={mockTechStack} />);

    expect(screen.getByText('Next.js')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('PostgreSQL')).toBeDefined();
    expect(screen.getByText('Node.js')).toBeDefined();
  });

  it('groups tech stack by category', () => {
    render(<TechStackSection techStack={mockTechStack} />);

    expect(screen.getByText('Frontend')).toBeDefined();
    expect(screen.getByText('Backend')).toBeDefined();
    expect(screen.getByText('Database')).toBeDefined();
  });

  it('renders correct number of categories', () => {
    const { container } = render(<TechStackSection techStack={mockTechStack} />);

    // Should have 3 category cards (Frontend, Backend, Database)
    const categoryHeaders = container.querySelectorAll('h4');
    expect(categoryHeaders.length).toBe(3);
  });
});
