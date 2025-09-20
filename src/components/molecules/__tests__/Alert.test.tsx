import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '../Alert';

describe('Alert', () => {
  it('renders with default props', () => {
    render(<Alert>Default Alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-blue-50');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Alert variant="success">Success Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50');

    rerender(<Alert variant="warning">Warning Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50');

    rerender(<Alert variant="error">Error Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
  });

  it('renders with title when provided', () => {
    render(<Alert title="Alert Title" description="Alert Description">Alert Message</Alert>);
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert Description')).toBeInTheDocument();
    expect(screen.getByText('Alert Message')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Alert className="custom-class">Custom Alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Alert ref={ref}>Alert with ref</Alert>);
    expect(ref).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<Alert>Accessible Alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('role', 'alert');
  });

  it('renders dismissible alert with close button', () => {
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Dismissible Alert</Alert>);
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', '알림 닫기');
  });

  it('handles dismiss button click', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Dismissible Alert</Alert>);
    
    const closeButton = screen.getByRole('button');
    await user.click(closeButton);
    
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders with default icons for variants', () => {
    const { rerender } = render(<Alert variant="info">Info Alert</Alert>);
    expect(screen.getByText('ℹ️')).toBeInTheDocument();

    rerender(<Alert variant="success">Success Alert</Alert>);
    expect(screen.getByText('✅')).toBeInTheDocument();

    rerender(<Alert variant="warning">Warning Alert</Alert>);
    expect(screen.getByText('⚠️')).toBeInTheDocument();

    rerender(<Alert variant="error">Error Alert</Alert>);
    expect(screen.getByText('❌')).toBeInTheDocument();
  });

  it('renders with custom icon when provided', () => {
    render(<Alert icon="⭐">Custom Icon Alert</Alert>);
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('renders without icon when icon is empty', () => {
    render(<Alert icon="">No Icon Alert</Alert>);
    expect(screen.queryByText('ℹ️')).not.toBeInTheDocument();
  });

  it('renders as div element', () => {
    render(<Alert>Div Alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.tagName).toBe('DIV');
  });
});
