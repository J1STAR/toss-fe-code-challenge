import { render, screen } from '@testing-library/react';
import { Text } from '../Text';

describe('Text', () => {
  it('renders as paragraph by default', () => {
    render(<Text>Hello World</Text>);
    const text = screen.getByText('Hello World');
    expect(text.tagName).toBe('P');
  });

  it('renders with different HTML elements', () => {
    const { rerender } = render(<Text as="h1">Heading</Text>);
    expect(screen.getByText('Heading').tagName).toBe('H1');

    rerender(<Text as="span">Span text</Text>);
    expect(screen.getByText('Span text').tagName).toBe('SPAN');
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Text variant="large">Large text</Text>);
    expect(screen.getByText('Large text')).toHaveClass('text-lg');

    rerender(<Text variant="small">Small text</Text>);
    expect(screen.getByText('Small text')).toHaveClass('text-sm');
  });

  it('applies weight styles correctly', () => {
    const { rerender } = render(<Text weight="bold">Bold text</Text>);
    expect(screen.getByText('Bold text')).toHaveClass('font-bold');

    rerender(<Text weight="light">Light text</Text>);
    expect(screen.getByText('Light text')).toHaveClass('font-light');
  });

  it('applies color styles correctly', () => {
    const { rerender } = render(<Text color="primary">Primary text</Text>);
    expect(screen.getByText('Primary text')).toHaveClass('text-blue-600');

    rerender(<Text color="error">Error text</Text>);
    expect(screen.getByText('Error text')).toHaveClass('text-red-600');
  });

  it('applies alignment styles correctly', () => {
    const { rerender } = render(<Text align="center">Centered text</Text>);
    expect(screen.getByText('Centered text')).toHaveClass('text-center');

    rerender(<Text align="right">Right aligned text</Text>);
    expect(screen.getByText('Right aligned text')).toHaveClass('text-right');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Text ref={ref}>Text with ref</Text>);
    expect(ref).toHaveBeenCalled();
  });
});
