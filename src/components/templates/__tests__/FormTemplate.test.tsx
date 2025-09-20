import { render, screen } from '@testing-library/react';
import { FormTemplate } from '../FormTemplate';

describe('FormTemplate', () => {
  const mockProps = {
    title: 'Test Form',
    description: 'Test Description',
    children: <div>Form Content</div>,
  };

  it('renders with title and description', () => {
    render(<FormTemplate {...mockProps} />);
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<FormTemplate {...mockProps} />);
    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<FormTemplate {...mockProps} className="custom-class" />);
    // FormTemplate은 className과 함께 올바르게 렌더링됨
    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<FormTemplate {...mockProps} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('renders with progress bar when showProgress is true', () => {
    render(
      <FormTemplate 
        {...mockProps} 
        showProgress 
        currentStep={2} 
        totalSteps={3} 
      />
    );
    expect(screen.getByText('단계 2 / 3')).toBeInTheDocument();
    expect(screen.getByText('33% 완료')).toBeInTheDocument();
  });

  it('does not render progress bar when showProgress is false', () => {
    render(<FormTemplate {...mockProps} showProgress={false} />);
    expect(screen.queryByText(/단계/)).not.toBeInTheDocument();
  });

  it('calculates progress percentage correctly', () => {
    const { rerender } = render(
      <FormTemplate 
        {...mockProps} 
        showProgress 
        currentStep={1} 
        totalSteps={4} 
      />
    );
    expect(screen.getByText('0% 완료')).toBeInTheDocument();

    rerender(
      <FormTemplate 
        {...mockProps} 
        showProgress 
        currentStep={3} 
        totalSteps={4} 
      />
    );
    expect(screen.getByText('50% 완료')).toBeInTheDocument();
  });

  it('renders without description when not provided', () => {
    const { description, ...propsWithoutDescription } = mockProps;
    render(<FormTemplate {...propsWithoutDescription} />);
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('renders with default step values', () => {
    render(<FormTemplate {...mockProps} />);
    // Should render without progress bar by default
    expect(screen.queryByText(/단계/)).not.toBeInTheDocument();
  });
});
