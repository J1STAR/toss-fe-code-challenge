import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', '로딩 중...');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Spinner size="xs" />);
    const spinner = screen.getByRole('status');
    const spinnerElement = spinner.querySelector('div');
    expect(spinnerElement).toHaveClass('h-3', 'w-3');

    rerender(<Spinner size="sm" />);
    expect(spinnerElement).toHaveClass('h-4', 'w-4');

    rerender(<Spinner size="md" />);
    expect(spinnerElement).toHaveClass('h-6', 'w-6');

    rerender(<Spinner size="lg" />);
    expect(spinnerElement).toHaveClass('h-8', 'w-8');

    rerender(<Spinner size="xl" />);
    expect(spinnerElement).toHaveClass('h-12', 'w-12');
  });

  it('renders with different colors', () => {
    const { rerender } = render(<Spinner color="primary" />);
    const spinner = screen.getByRole('status');
    const spinnerElement = spinner.querySelector('div');
    expect(spinnerElement).toHaveClass('border-blue-600');

    rerender(<Spinner color="secondary" />);
    expect(spinnerElement).toHaveClass('border-slate-600');

    rerender(<Spinner color="success" />);
    expect(spinnerElement).toHaveClass('border-green-600');

    rerender(<Spinner color="warning" />);
    expect(spinnerElement).toHaveClass('border-yellow-600');

    rerender(<Spinner color="error" />);
    expect(spinnerElement).toHaveClass('border-red-600');
  });

  it('renders with custom className', () => {
    render(<Spinner className="custom-class" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Spinner ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('role', 'status');
    expect(spinner).toHaveAttribute('aria-label', '로딩 중...');
  });

  it('renders with custom label', () => {
    render(<Spinner label="Custom loading text" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Custom loading text');
  });

  it('applies animation classes correctly', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    const spinnerElement = spinner.querySelector('div');
    expect(spinnerElement).toHaveClass('animate-spin', 'rounded-full', 'border-2');
  });

  it('renders screen reader text', () => {
    render(<Spinner />);
    const srText = screen.getByText('로딩 중...');
    expect(srText).toHaveClass('sr-only');
  });

  it('renders as div element', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner.tagName).toBe('DIV');
  });

  it('applies inline-flex items-center justify-center classes', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('inline-flex', 'items-center', 'justify-center');
  });
});
