import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectBox } from '@/components/home/project-box';
import { projects } from '@/lib/projects';

describe('ProjectBox', () => {
  const testProject = projects[0];

  describe('Initial Rendering', () => {
    it('renders in closed state by default', () => {
      render(<ProjectBox project={testProject} index={0} />);

      expect(screen.getByText(testProject.name)).toBeInTheDocument();
      expect(screen.getByText(testProject.oneLiner)).toBeInTheDocument();
      expect(screen.getByText('Click to unfold →')).toBeInTheDocument();
    });

    it('displays project category badge', () => {
      render(<ProjectBox project={testProject} index={0} />);
      expect(screen.getByText(testProject.category)).toBeInTheDocument();
    });

    it('displays key metric', () => {
      render(<ProjectBox project={testProject} index={0} />);
      expect(screen.getByText(testProject.keyMetric)).toBeInTheDocument();
    });

    it('has correct accessibility attributes when closed', () => {
      render(<ProjectBox project={testProject} index={0} />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', `project-${testProject.slug}`);
      expect(button).toHaveAttribute('aria-label', `${testProject.name} - Expand project details`);
    });
  });

  describe('Layer Navigation - Forward', () => {
    it('expands to layer1 when clicked', () => {
      render(<ProjectBox project={testProject} index={0} />);

      const button = screen.getByRole('button', { expanded: false });
      fireEvent.click(button);

      expect(screen.getByText('Problem')).toBeInTheDocument();
      expect(screen.getByText('Solution')).toBeInTheDocument();
    });

    it('displays all 4 layers when navigated through', () => {
      render(<ProjectBox project={testProject} index={0} />);

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

  describe('Layer Navigation - Backward', () => {
    it('navigates back from layer2 to layer1', () => {
      render(<ProjectBox project={testProject} index={0} />);

      // Open to layer1
      fireEvent.click(screen.getByRole('button', { expanded: false }));

      // Navigate to layer2
      fireEvent.click(screen.getByText('View Engineering Details'));
      expect(screen.getByText('Engineering Details')).toBeInTheDocument();

      // Navigate back to layer1 - button says "Previous Layer"
      const backButton = screen.getByText('Previous Layer');
      fireEvent.click(backButton);

      // Layer2 should no longer be visible (only layer1 content)
      expect(screen.queryByText('Engineering Details')).not.toBeInTheDocument();
      expect(screen.getByText('Problem')).toBeInTheDocument();
    });

    it('navigates back from layer3 to layer2', () => {
      render(<ProjectBox project={testProject} index={0} />);

      // Navigate to layer3
      fireEvent.click(screen.getByRole('button', { expanded: false }));
      fireEvent.click(screen.getByText('View Engineering Details'));
      fireEvent.click(screen.getByText('View Quality & Performance'));
      expect(screen.getByText('Quality & Performance')).toBeInTheDocument();

      // Navigate back - there are multiple "Previous Layer" buttons, get the last one (layer3's button)
      const backButtons = screen.getAllByText('Previous Layer');
      fireEvent.click(backButtons[backButtons.length - 1]);

      expect(screen.queryByText('Quality & Performance')).not.toBeInTheDocument();
      expect(screen.getByText('Engineering Details')).toBeInTheDocument();
    });

    it('navigates back from layer4 to layer3', () => {
      render(<ProjectBox project={testProject} index={0} />);

      // Navigate to layer4
      fireEvent.click(screen.getByRole('button', { expanded: false }));
      fireEvent.click(screen.getByText('View Engineering Details'));
      fireEvent.click(screen.getByText('View Quality & Performance'));
      fireEvent.click(screen.getByText('View Trade-offs'));
      expect(screen.getByText('Trade-offs & Constraints')).toBeInTheDocument();

      // Navigate back - get the last "Previous Layer" button (layer4's button)
      const backButtons = screen.getAllByText('Previous Layer');
      fireEvent.click(backButtons[backButtons.length - 1]);

      expect(screen.queryByText('Trade-offs & Constraints')).not.toBeInTheDocument();
      expect(screen.getByText('Quality & Performance')).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('closes from layer1 using close button', () => {
      render(<ProjectBox project={testProject} index={0} />);

      // Open to layer1
      fireEvent.click(screen.getByRole('button', { expanded: false }));
      expect(screen.getByText('Problem')).toBeInTheDocument();

      // Close
      const closeButton = screen.getByLabelText('Close project details');
      fireEvent.click(closeButton);

      // Should be back to closed state
      expect(screen.getByText('Click to unfold →')).toBeInTheDocument();
    });

    it('closes from layer4 using close button', () => {
      render(<ProjectBox project={testProject} index={0} />);

      // Navigate to layer4
      fireEvent.click(screen.getByRole('button', { expanded: false }));
      fireEvent.click(screen.getByText('View Engineering Details'));
      fireEvent.click(screen.getByText('View Quality & Performance'));
      fireEvent.click(screen.getByText('View Trade-offs'));

      // Close using "Close Project" button in layer4
      const closeButton = screen.getByText('Close Project');
      fireEvent.click(closeButton);

      // Should be back to closed state
      expect(screen.getByText('Click to unfold →')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation with Enter key', () => {
      render(<ProjectBox project={testProject} index={0} />);

      const button = screen.getByRole('button', { expanded: false });
      fireEvent.keyDown(button, { key: 'Enter' });

      expect(screen.getByText('Problem')).toBeInTheDocument();
    });

    it('supports keyboard navigation with Space key', () => {
      render(<ProjectBox project={testProject} index={0} />);

      const button = screen.getByRole('button', { expanded: false });
      fireEvent.keyDown(button, { key: ' ' });

      expect(screen.getByText('Problem')).toBeInTheDocument();
    });

    it('ignores other keys', () => {
      render(<ProjectBox project={testProject} index={0} />);

      const button = screen.getByRole('button', { expanded: false });
      fireEvent.keyDown(button, { key: 'a' });

      // Should remain closed
      expect(screen.getByText('Click to unfold →')).toBeInTheDocument();
    });
  });

  describe('Renders with different projects', () => {
    it('renders correctly with multiple different projects', () => {
      projects.slice(0, 3).forEach((project, index) => {
        const { unmount } = render(<ProjectBox project={project} index={index} />);

        expect(screen.getByText(project.name)).toBeInTheDocument();
        expect(screen.getByText(project.oneLiner)).toBeInTheDocument();
        expect(screen.getByText(project.category)).toBeInTheDocument();

        unmount();
      });
    });
  });
});
