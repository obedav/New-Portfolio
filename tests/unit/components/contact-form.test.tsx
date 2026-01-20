import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact-form';

describe('ContactForm', () => {
  beforeEach(() => {
    // Reset window.location.href mock
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
  });

  describe('Initial Rendering', () => {
    it('renders all form fields', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/what's this about/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders submit button with correct text', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });

    it('has correct default inquiry type', () => {
      render(<ContactForm />);

      const typeSelect = screen.getByLabelText(/what's this about/i) as HTMLSelectElement;
      expect(typeSelect.value).toBe('job');
    });

    it('displays all inquiry type options', () => {
      render(<ContactForm />);

      expect(screen.getByRole('option', { name: /job opportunity/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /contract work/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /collaboration/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /other/i })).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('has required attribute on name field', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('required');
    });

    it('has required attribute on email field', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('required');
    });

    it('has required attribute on message field', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/message/i)).toHaveAttribute('required');
    });

    it('has correct email type on email field', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    });
  });

  describe('User Input', () => {
    it('updates name field on input', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'John Doe');

      expect(nameInput).toHaveValue('John Doe');
    });

    it('updates email field on input', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'john@example.com');

      expect(emailInput).toHaveValue('john@example.com');
    });

    it('updates type field on change', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const typeSelect = screen.getByLabelText(/what's this about/i);
      await user.selectOptions(typeSelect, 'contract');

      expect(typeSelect).toHaveValue('contract');
    });

    it('updates message field on input', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'Hello, I have a project idea.');

      expect(messageInput).toHaveValue('Hello, I have a project idea.');
    });
  });

  describe('Form Submission', () => {
    it('shows success state after submission', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit form
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);

      // Check success state
      await waitFor(() => {
        expect(screen.getByText(/message ready/i)).toBeInTheDocument();
      });
    });

    it('constructs correct mailto URL with job type', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.selectOptions(screen.getByLabelText(/what's this about/i), 'job');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit form
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);

      await waitFor(() => {
        expect(window.location.href).toContain('mailto:obedav@live.com');
        expect(window.location.href).toContain('Job%20Opportunity');
      });
    });

    it('constructs correct mailto URL with contract type', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.selectOptions(screen.getByLabelText(/what's this about/i), 'contract');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit form
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);

      await waitFor(() => {
        expect(window.location.href).toContain('Contract%20Work');
      });
    });
  });

  describe('Success State', () => {
    it('displays success message after submission', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);

      await waitFor(() => {
        expect(screen.getByText(/message ready/i)).toBeInTheDocument();
        expect(screen.getByText(/your email client should open/i)).toBeInTheDocument();
      });
    });

    it('allows sending another message from success state', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);

      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText(/message ready/i)).toBeInTheDocument();
      });

      // Click "Send another message"
      const resetButton = screen.getByText(/send another message/i);
      await user.click(resetButton);

      // Should be back to form
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
    });

    it('shows direct email link in success state', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);

      await waitFor(() => {
        const emailLink = screen.getByRole('link', { name: /obedav@live.com/i });
        expect(emailLink).toHaveAttribute('href', 'mailto:obedav@live.com');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper label associations', () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const typeSelect = screen.getByLabelText(/what's this about/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveAttribute('id', 'name');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(typeSelect).toHaveAttribute('id', 'type');
      expect(messageInput).toHaveAttribute('id', 'message');
    });

    it('submit button has type submit', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});
