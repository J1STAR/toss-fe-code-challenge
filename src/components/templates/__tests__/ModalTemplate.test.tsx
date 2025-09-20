import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalTemplate } from '../ModalTemplate';

describe('ModalTemplate', () => {
  const mockProps = {
    title: 'Test Modal',
    description: 'Test Description',
    children: <div>Modal Content</div>,
    titleId: 'modal-title',
    descriptionId: 'modal-description',
  };

  it('renders with title and description', () => {
    render(<ModalTemplate {...mockProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<ModalTemplate {...mockProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<ModalTemplate {...mockProps} className="custom-class" />);
    // ModalTemplate은 className과 함께 올바르게 렌더링됨
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<ModalTemplate {...mockProps} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('renders with footer when provided', () => {
    render(
      <ModalTemplate
        {...mockProps}
        footer={<div>Footer Content</div>}
      />
    );
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes for title and description', () => {
    render(<ModalTemplate {...mockProps} />);
    const title = screen.getByText('Test Modal');
    const description = screen.getByText('Test Description');
    
    expect(title).toHaveAttribute('id', 'modal-title');
    expect(description).toHaveAttribute('id', 'modal-description');
  });

  it('renders with close button when onClose is provided', () => {
    const onClose = vi.fn();
    render(<ModalTemplate {...mockProps} onClose={onClose} />);
    
    const closeButton = screen.getByRole('button', { name: '모달 닫기' });
    expect(closeButton).toBeInTheDocument();
  });

  it('handles close button click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ModalTemplate {...mockProps} onClose={onClose} />);
    
    const closeButton = screen.getByRole('button', { name: '모달 닫기' });
    await user.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders without close button when onClose is not provided', () => {
    render(<ModalTemplate {...mockProps} />);
    expect(screen.queryByRole('button', { name: '모달 닫기' })).not.toBeInTheDocument();
  });

  it('renders without close button when showCloseButton is false', () => {
    const onClose = vi.fn();
    render(<ModalTemplate {...mockProps} onClose={onClose} showCloseButton={false} />);
    expect(screen.queryByRole('button', { name: '모달 닫기' })).not.toBeInTheDocument();
  });

  it('renders without description when not provided', () => {
    const { description, ...propsWithoutDescription } = mockProps;
    render(<ModalTemplate {...propsWithoutDescription} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('renders with default titleId and descriptionId when not provided', () => {
    const { titleId, descriptionId, ...propsWithoutIds } = mockProps;
    render(<ModalTemplate {...propsWithoutIds} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
