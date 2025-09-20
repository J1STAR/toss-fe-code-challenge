import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock the modal store
vi.mock('../../store/modal.store', () => ({
  default: () => ({
    isOpen: true,
    Component: null,
    props: {},
    resolve: vi.fn(),
    open: vi.fn(),
    close: vi.fn(),
  }),
}));

const mockProps = {
  closeModal: vi.fn(),
  resolve: vi.fn(),
  onIdsReady: vi.fn(),
  isOpen: true,
};

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders step 1 with name and email fields', () => {
    render(<ContactForm {...mockProps} />);

    expect(screen.getByLabelText(/이름/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByText(/기본 정보/i)).toBeInTheDocument();
  });

  it('validates required fields in step 1', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockProps} />);

    const nextButton = screen.getByRole('button', { name: /다음/i });

    // Try to proceed without filling required fields
    await user.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getAllByText(/이름은 최소 2글자 이상이어야 합니다/i),
      ).toHaveLength(2);
    });
  });

  it('proceeds to step 2 when step 1 is valid', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockProps} />);

    const nameInput = screen.getByLabelText(/이름/i);
    const emailInput = screen.getByLabelText(/이메일/i);
    const nextButton = screen.getByRole('button', { name: /다음/i });

    await user.type(nameInput, '홍길동');
    await user.type(emailInput, 'test@example.com');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/경력 정보/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/경력 연차/i)).toBeInTheDocument();
    });
  });

  it('validates experience selection in step 2', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockProps} />);

    // Fill step 1 and proceed
    await user.type(screen.getByLabelText(/이름/i), '홍길동');
    await user.type(screen.getByLabelText(/이메일/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/경력 정보/i)).toBeInTheDocument();
    });

    // Try to proceed without selecting experience
    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/경력 연차를 선택해주세요/i)).toBeInTheDocument();
    });
  });

  it('proceeds to step 3 when step 2 is valid', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockProps} />);

    // Fill step 1 and proceed
    const nameInput = screen.getByLabelText(/이름/i);
    const emailInput = screen.getByLabelText(/이메일/i);
    await user.type(nameInput, '홍길동');
    await user.type(emailInput, 'test@example.com');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/경력 정보/i)).toBeInTheDocument();
    });

    // Select experience and proceed
    const experienceSelect = screen.getByLabelText(/경력 연차/i);
    await user.selectOptions(experienceSelect, '0-3');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/GitHub 정보/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/GitHub 링크/i)).toBeInTheDocument();
    });
  });

  it('validates GitHub URL format when provided', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockProps} />);

    // Navigate to step 3
    await user.type(screen.getByLabelText(/이름/i), '홍길동');
    await user.type(screen.getByLabelText(/이메일/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/경력 정보/i)).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText(/경력 연차/i), '0-3');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/GitHub 정보/i)).toBeInTheDocument();
    });

    // Enter invalid GitHub URL and trigger validation
    const githubInput = screen.getByLabelText(/GitHub 링크/i);
    await user.type(githubInput, 'invalid-url');
    await user.click(screen.getByRole('button', { name: /제출하기/i }));

    await waitFor(() => {
      expect(
        screen.getAllByText(/유효한 GitHub 프로필 URL을 입력해주세요/i),
      ).toHaveLength(2);
    });
  });

  it('accepts valid GitHub URL', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockProps} />);

    // Navigate to step 3
    await user.type(screen.getByLabelText(/이름/i), '홍길동');
    await user.type(screen.getByLabelText(/이메일/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/경력 정보/i)).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText(/경력 연차/i), '0-3');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/GitHub 정보/i)).toBeInTheDocument();
    });

    // Enter valid GitHub URL
    const githubInput = screen.getByLabelText(/GitHub 링크/i);
    await user.type(githubInput, 'https://github.com/username');

    // Should not show error for valid URL
    await waitFor(() => {
      expect(
        screen.queryByText(/유효한 GitHub 프로필 URL을 입력해주세요/i),
      ).not.toBeInTheDocument();
    });
  });

  it('shows completion screen after successful submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockProps} />);

    // Fill all steps
    await user.type(screen.getByLabelText(/이름/i), '홍길동');
    await user.type(screen.getByLabelText(/이메일/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/경력 정보/i)).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText(/경력 연차/i), '0-3');
    await user.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
      expect(screen.getByText(/GitHub 정보/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /제출하기/i }));

    // Wait for completion screen - check for the title instead
    await waitFor(
      () => {
        expect(screen.getByText(/신청 정보 제출 완료/i)).toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  });

  it('handles keyboard navigation with Enter key', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockProps} />);

    const nameInput = screen.getByLabelText(/이름/i);
    await user.type(nameInput, '홍길동');
    await user.type(screen.getByLabelText(/이메일/i), 'test@example.com');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByText(/경력 정보/i)).toBeInTheDocument();
    });
  });
});
