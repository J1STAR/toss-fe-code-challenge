import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Default Card</Card>);
    const card = screen.getByText('Default Card');
    expect(card).toBeInTheDocument();
    expect(card.closest('div')).toHaveClass('bg-white');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Card variant="outlined">Outlined Card</Card>);
    expect(screen.getByText('Outlined Card').closest('div')).toHaveClass('border');

    rerender(<Card variant="elevated">Elevated Card</Card>);
    expect(screen.getByText('Elevated Card').closest('div')).toHaveClass('shadow-lg');

    rerender(<Card variant="default">Default Card</Card>);
    expect(screen.getByText('Default Card').closest('div')).toHaveClass('bg-white');
  });

  it('renders with different padding sizes', () => {
    const { rerender } = render(<Card padding="sm">Small Padding Card</Card>);
    expect(screen.getByText('Small Padding Card').closest('div')).toHaveClass('p-3');

    rerender(<Card padding="md">Medium Padding Card</Card>);
    expect(screen.getByText('Medium Padding Card').closest('div')).toHaveClass('p-4');

    rerender(<Card padding="lg">Large Padding Card</Card>);
    expect(screen.getByText('Large Padding Card').closest('div')).toHaveClass('p-6');

    rerender(<Card padding="none">No Padding Card</Card>);
    expect(screen.getByText('No Padding Card').closest('div')).not.toHaveClass('p-3', 'p-4', 'p-6');
  });

  it('renders with custom className', () => {
    render(<Card className="custom-class">Custom Card</Card>);
    const card = screen.getByText('Custom Card').closest('div');
    expect(card).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Card with ref</Card>);
    expect(ref).toHaveBeenCalled();
  });

  it('renders as div element', () => {
    render(<Card>Div Card</Card>);
    const card = screen.getByText('Div Card');
    expect(card.tagName).toBe('DIV');
  });

  it('applies rounded-lg class', () => {
    render(<Card>Rounded Card</Card>);
    const card = screen.getByText('Rounded Card').closest('div');
    expect(card).toHaveClass('rounded-lg');
  });

  it('renders children content', () => {
    render(
      <Card>
        <div>Card Header</div>
        <div>Card Content</div>
        <div>Card Footer</div>
      </Card>
    );
    
    expect(screen.getByText('Card Header')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('applies dark mode classes', () => {
    render(<Card>Dark Card</Card>);
    const card = screen.getByText('Dark Card').closest('div');
    expect(card).toHaveClass('dark:bg-slate-800');
  });
});
