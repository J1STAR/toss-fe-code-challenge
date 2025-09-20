import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from '../Modal';

describe('Modal', () => {
  const mockProps = {
    open: true,
    onOpenChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open', () => {
    render(
      <Modal {...mockProps}>
        <ModalContent>
          <ModalTitle>Test Modal</ModalTitle>
          <div>Modal Content</div>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal {...mockProps} open={false}>
        <ModalContent>
          <ModalTitle>Test Modal</ModalTitle>
          <div>Modal Content</div>
        </ModalContent>
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <Modal {...mockProps}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>Modal Description</ModalDescription>
          </ModalHeader>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Description')).toBeInTheDocument();
  });

  it('renders with custom header and footer', () => {
    render(
      <Modal {...mockProps}>
        <ModalContent>
          <ModalHeader>
            <div>Custom Header</div>
          </ModalHeader>
          <ModalFooter>
            <div>Custom Footer</div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText('Custom Header')).toBeInTheDocument();
    expect(screen.getByText('Custom Footer')).toBeInTheDocument();
  });

  it('calls onOpenChange when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal {...mockProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalTitle>Test Modal</ModalTitle>
        </ModalContent>
      </Modal>
    );
    
    // Find the overlay element by its className
    const overlay = document.querySelector('.fixed.inset-0.z-\\[100\\].bg-black');
    
    // Click on the overlay
    await user.click(overlay!);
    
    expect(mockProps.onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not call onOpenChange when content is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal {...mockProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalTitle>Test Modal</ModalTitle>
        </ModalContent>
      </Modal>
    );
    
    const content = screen.getByRole('dialog');
    await user.click(content);
    
    expect(mockProps.onOpenChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(
      <Modal {...mockProps}>
        <ModalContent>
          <ModalTitle>Test Modal</ModalTitle>
        </ModalContent>
      </Modal>
    );
    
    // Test ESC key
    await user.keyboard('{Escape}');
    expect(mockProps.onOpenChange).toHaveBeenCalledWith(false);
  });

  it('has proper accessibility attributes', () => {
    render(
      <Modal {...mockProps}>
        <ModalContent>
          <ModalTitle>Test Modal</ModalTitle>
        </ModalContent>
      </Modal>
    );
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('tabIndex', '-1');
  });

  it('renders with default max width', () => {
    render(
      <Modal {...mockProps}>
        <ModalContent>
          <ModalTitle>Test Modal</ModalTitle>
        </ModalContent>
      </Modal>
    );
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('max-w-2xl');
  });

  it('renders modal components correctly', () => {
    render(
      <Modal {...mockProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Test Title</ModalTitle>
            <ModalDescription>Test Description</ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <button>Test Button</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});
