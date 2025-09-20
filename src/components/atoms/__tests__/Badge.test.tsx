import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-slate-100');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="primary">Primary Badge</Badge>);
    expect(screen.getByText('Primary Badge')).toHaveClass('bg-blue-100');

    rerender(<Badge variant="success">Success Badge</Badge>);
    expect(screen.getByText('Success Badge')).toHaveClass('bg-green-100');

    rerender(<Badge variant="warning">Warning Badge</Badge>);
    expect(screen.getByText('Warning Badge')).toHaveClass('bg-yellow-100');

    rerender(<Badge variant="error">Error Badge</Badge>);
    expect(screen.getByText('Error Badge')).toHaveClass('bg-red-100');

    rerender(<Badge variant="outline">Outline Badge</Badge>);
    expect(screen.getByText('Outline Badge')).toHaveClass('border');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Badge size="sm">Small Badge</Badge>);
    expect(screen.getByText('Small Badge')).toHaveClass('text-xs');

    rerender(<Badge size="md">Medium Badge</Badge>);
    expect(screen.getByText('Medium Badge')).toHaveClass('text-sm');

    rerender(<Badge size="lg">Large Badge</Badge>);
    expect(screen.getByText('Large Badge')).toHaveClass('text-base');
  });

  it('renders with custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Badge ref={ref}>Badge with ref</Badge>);
    expect(ref).toHaveBeenCalled();
  });

  it('renders as span element', () => {
    render(<Badge>Span Badge</Badge>);
    const badge = screen.getByText('Span Badge');
    expect(badge.tagName).toBe('SPAN');
  });

  it('applies rounded-full class', () => {
    render(<Badge>Rounded Badge</Badge>);
    const badge = screen.getByText('Rounded Badge');
    expect(badge).toHaveClass('rounded-full');
  });

  it('applies inline-flex items-center classes', () => {
    render(<Badge>Flex Badge</Badge>);
    const badge = screen.getByText('Flex Badge');
    expect(badge).toHaveClass('inline-flex', 'items-center');
  });

  it('applies font-medium class', () => {
    render(<Badge>Font Badge</Badge>);
    const badge = screen.getByText('Font Badge');
    expect(badge).toHaveClass('font-medium');
  });
});
