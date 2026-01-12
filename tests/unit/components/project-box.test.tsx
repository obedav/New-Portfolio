import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectBox } from '@/components/home/project-box';
import { projects } from '@/lib/projects';

describe('ProjectBox', () => {
  it('renders in closed state by default', () => {
    render(<ProjectBox project={projects[0]} index={0} />);

    expect(screen.getByText(projects[0].name)).toBeInTheDocument();
    expect(screen.getByText(projects[0].oneLiner)).toBeInTheDocument();
    expect(screen.getByText('Click to unfold →')).toBeInTheDocument();
  });

  it('expands to layer1 when clicked', () => {
    render(<ProjectBox project={projects[0]} index={0} />);

    const button = screen.getByRole('button', { expanded: false });
    fireEvent.click(button);

    expect(screen.getByText('Problem')).toBeInTheDocument();
    expect(screen.getByText('Solution')).toBeInTheDocument();
  });

  it('supports keyboard navigation with Enter key', () => {
    render(<ProjectBox project={projects[0]} index={0} />);

    const button = screen.getByRole('button', { expanded: false });
    fireEvent.keyDown(button, { key: 'Enter' });

    expect(screen.getByText('Problem')).toBeInTheDocument();
  });

  it('displays all 4 layers when navigated through', () => {
    render(<ProjectBox project={projects[0]} index={0} />);

    // Open to layer1
    const openButton = screen.getByRole('button', { expanded: false });
    fireEvent.click(openButton);

    // Navigate to layer2
    const layer2Button = screen.getByText('View Engineering Details');
    fireEvent.click(layer2Button);
    expect(screen.getByText('Engineering Details')).toBeInTheDocument();

    // Navigate to layer3
    const layer3Button = screen.getByText('View Quality & Performance');
    fireEvent.click(layer3Button);
    expect(screen.getByText('Quality & Performance')).toBeInTheDocument();

    // Navigate to layer4
    const layer4Button = screen.getByText('View Trade-offs');
    fireEvent.click(layer4Button);
    expect(screen.getByText('Trade-offs & Constraints')).toBeInTheDocument();
  });
});
