import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputField } from '../InputField';

describe('InputField', () => {
  it('renders with label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<InputField label="Test Label" placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('shows error message when touched and has error', () => {
    render(
      <InputField
        label="Test Label"
        error="This field is required"
        touched={true}
      />,
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveAttribute(
      'role',
      'alert',
    );
  });

  it('does not show error message when not touched', () => {
    render(
      <InputField
        label="Test Label"
        error="This field is required"
        touched={false}
      />,
    );
    expect(
      screen.queryByText('This field is required'),
    ).not.toBeInTheDocument();
  });

  it('applies error styling when touched and has error', () => {
    render(
      <InputField
        label="Test Label"
        error="This field is required"
        touched={true}
      />,
    );
    const input = screen.getByLabelText('Test Label');
    const label = screen.getByText('Test Label');

    expect(input).toHaveClass('border-red-500');
    expect(label).toHaveClass('text-red-500');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<InputField label="Test Label" />);

    const input = screen.getByLabelText('Test Label');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('can be disabled', () => {
    render(<InputField label="Test Label" disabled />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<InputField label="Test Label" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('generates unique id when not provided', () => {
    render(<InputField label="Test Label" />);
    const input = screen.getByLabelText('Test Label');
    expect(input.id).toBeTruthy();
  });

  it('uses provided id', () => {
    const customId = `test-custom-id-${Math.random()}`;
    render(<InputField label="Test Label" id={customId} />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('id', customId);
  });
});
