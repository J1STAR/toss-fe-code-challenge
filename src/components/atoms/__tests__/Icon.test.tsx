import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
  it('renders with default props', () => {
    render(<Icon name="star" />);
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-base');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Icon name="star" size="xs" />);
    expect(screen.getByRole('img')).toHaveClass('text-xs');

    rerender(<Icon name="star" size="sm" />);
    expect(screen.getByRole('img')).toHaveClass('text-sm');

    rerender(<Icon name="star" size="lg" />);
    expect(screen.getByRole('img')).toHaveClass('text-lg');

    rerender(<Icon name="star" size="xl" />);
    expect(screen.getByRole('img')).toHaveClass('text-xl');
  });

  it('renders with different colors', () => {
    const { rerender } = render(<Icon name="star" color="primary" />);
    expect(screen.getByRole('img')).toHaveClass('text-blue-600');

    rerender(<Icon name="star" color="success" />);
    expect(screen.getByRole('img')).toHaveClass('text-green-600');

    rerender(<Icon name="star" color="error" />);
    expect(screen.getByRole('img')).toHaveClass('text-red-600');

    rerender(<Icon name="star" color="muted" />);
    expect(screen.getByRole('img')).toHaveClass('text-slate-400');
  });

  it('renders with custom className', () => {
    render(<Icon name="star" className="custom-class" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Icon name="star" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('renders different icon names', () => {
    const { rerender } = render(<Icon name="star" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'star');

    rerender(<Icon name="heart" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'heart');

    rerender(<Icon name="check" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'check');
  });

  it('has proper accessibility attributes', () => {
    render(<Icon name="star" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('role', 'img');
    expect(icon).toHaveAttribute('aria-label', 'star');
  });

  it('renders as span element', () => {
    render(<Icon name="star" />);
    const icon = screen.getByRole('img');
    expect(icon.tagName).toBe('SPAN');
  });

  it('applies inline-flex items-center justify-center classes', () => {
    render(<Icon name="star" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('inline-flex', 'items-center', 'justify-center');
  });

  it('renders the icon name as text content', () => {
    render(<Icon name="star" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveTextContent('star');
  });
});
