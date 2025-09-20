import { render, screen } from '@testing-library/react';
import ModalProvider from '../ModalProvider';

// Mock component for testing
const TestComponent = ({ title, closeModal }: { title?: string; closeModal?: () => void }) => (
  <div>
    <h1>{title || 'Test Modal'}</h1>
    {closeModal && <button onClick={closeModal}>Close</button>}
  </div>
);

// Mock createPortal to render directly in the test environment
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  };
});

// Mock the modal store
const mockUseModalStore = vi.fn();
vi.mock('../../store/modal.store', () => ({
  default: mockUseModalStore,
}));

describe('ModalProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    mockUseModalStore.mockReturnValue({
      isOpen: false,
      Component: null,
      props: {},
      resolve: vi.fn(),
      open: vi.fn(),
      close: vi.fn(),
    });
    
    render(<ModalProvider />);
    // Render without errors
    expect(document.body).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    mockUseModalStore.mockReturnValue({
      isOpen: false,
      Component: TestComponent,
      props: {},
      resolve: vi.fn(),
      open: vi.fn(),
      close: vi.fn(),
    });
    
    render(<ModalProvider />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('handles null component gracefully', () => {
    mockUseModalStore.mockReturnValue({
      isOpen: true,
      Component: null,
      props: {},
      resolve: vi.fn(),
      open: vi.fn(),
      close: vi.fn(),
    });
    
    render(<ModalProvider />);
    // Should not crash when Component is null
    expect(document.body).toBeInTheDocument();
  });

  it('handles undefined component gracefully', () => {
    mockUseModalStore.mockReturnValue({
      isOpen: true,
      Component: undefined,
      props: {},
      resolve: vi.fn(),
      open: vi.fn(),
      close: vi.fn(),
    });
    
    render(<ModalProvider />);
    // Should not crash when Component is undefined
    expect(document.body).toBeInTheDocument();
  });
});