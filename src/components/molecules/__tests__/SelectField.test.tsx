import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectField } from '../SelectField';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('SelectField', () => {
  it('renders with label and options', () => {
    render(<SelectField label="Test Select" options={mockOptions} />);

    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(
      <SelectField
        label="Test Select"
        options={mockOptions}
        placeholder="Choose an option"
      />,
    );
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('shows error message when touched and has error', () => {
    render(
      <SelectField
        label="Test Select"
        options={mockOptions}
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
      <SelectField
        label="Test Select"
        options={mockOptions}
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
      <SelectField
        label="Test Select"
        options={mockOptions}
        error="This field is required"
        touched={true}
      />,
    );
    const select = screen.getByLabelText('Test Select');
    const label = screen.getByText('Test Select');

    expect(select).toHaveClass('border-red-500');
    expect(label).toHaveClass('text-red-500');
  });

  it('handles option selection', async () => {
    const user = userEvent.setup();
    render(<SelectField label="Test Select" options={mockOptions} />);

    const select = screen.getByLabelText('Test Select');
    await user.selectOptions(select, 'option2');

    expect(select).toHaveValue('option2');
  });

  it('can be disabled', () => {
    render(<SelectField label="Test Select" options={mockOptions} disabled />);
    const select = screen.getByLabelText('Test Select');
    expect(select).toBeDisabled();
  });

  it('renders disabled options correctly', () => {
    render(<SelectField label="Test Select" options={mockOptions} />);
    const option3 = screen.getByText('Option 3');
    expect(option3.closest('option')).toBeDisabled();
  });

  it('renders dropdown arrow icon', () => {
    render(<SelectField label="Test Select" options={mockOptions} />);
    const arrowIcon = document.querySelector('svg[aria-hidden="true"]');
    expect(arrowIcon).toBeInTheDocument();
    expect(arrowIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<SelectField label="Test Select" options={mockOptions} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
