import { renderHook, act } from '@testing-library/react';
import useModalStore from '../modal.store';

// Mock component for testing
const TestComponent = () => 'TestComponent';

describe('useModalStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useModalStore.setState({
        isOpen: false,
        Component: null,
        props: {},
        resolve: () => {},
        open: useModalStore.getState().open,
        close: useModalStore.getState().close,
      });
    });
  });

  it('has initial state', () => {
    const { result } = renderHook(() => useModalStore());
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.Component).toBe(null);
    expect(result.current.props).toEqual({});
    expect(typeof result.current.resolve).toBe('function');
    expect(typeof result.current.open).toBe('function');
    expect(typeof result.current.close).toBe('function');
  });

  it('opens modal with component and props', () => {
    const { result } = renderHook(() => useModalStore());
    const mockResolve = vi.fn();
    const mockProps = { title: 'Test Title' };

    act(() => {
      result.current.open(TestComponent, mockProps, mockResolve);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.Component).toBe(TestComponent);
    expect(result.current.props).toEqual(mockProps);
    expect(result.current.resolve).toBe(mockResolve);
  });

  it('opens modal with component only', () => {
    const { result } = renderHook(() => useModalStore());
    const mockResolve = vi.fn();

    act(() => {
      result.current.open(TestComponent, {}, mockResolve);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.Component).toBe(TestComponent);
    expect(result.current.props).toEqual({});
    expect(result.current.resolve).toBe(mockResolve);
  });

  it('closes modal and resets state', () => {
    const { result } = renderHook(() => useModalStore());
    const mockResolve = vi.fn();

    // First open the modal
    act(() => {
      result.current.open(TestComponent, { title: 'Test' }, mockResolve);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.Component).toBe(TestComponent);

    // Then close it
    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.Component).toBe(null);
    expect(result.current.props).toEqual({});
  });

  it('calls resolve function when closing modal', () => {
    const { result } = renderHook(() => useModalStore());
    const mockResolve = vi.fn();

    // Open modal
    act(() => {
      result.current.open(TestComponent, {}, mockResolve);
    });

    // Close modal
    act(() => {
      result.current.close();
    });

    expect(mockResolve).toHaveBeenCalledWith(null);
  });

  it('does not call resolve when closing modal without component', () => {
    const { result } = renderHook(() => useModalStore());
    const mockResolve = vi.fn();

    // Set initial state without opening modal
    act(() => {
      useModalStore.setState({
        isOpen: false,
        Component: null,
        props: {},
        resolve: mockResolve,
      });
    });

    // Close modal
    act(() => {
      result.current.close();
    });

    expect(mockResolve).not.toHaveBeenCalled();
  });

  it('handles multiple open/close cycles', () => {
    const { result } = renderHook(() => useModalStore());
    const mockResolve1 = vi.fn();
    const mockResolve2 = vi.fn();

    // First cycle
    act(() => {
      result.current.open(TestComponent, { title: 'First' }, mockResolve1);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.Component).toBe(TestComponent);

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
    expect(mockResolve1).toHaveBeenCalledWith(null);

    // Second cycle
    act(() => {
      result.current.open(TestComponent, { title: 'Second' }, mockResolve2);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.Component).toBe(TestComponent);

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
    expect(mockResolve2).toHaveBeenCalledWith(null);
  });

  it('replaces existing modal when opening new one', () => {
    const { result } = renderHook(() => useModalStore());
    const mockResolve1 = vi.fn();
    const mockResolve2 = vi.fn();

    const AnotherComponent = () => 'AnotherComponent';

    // Open first modal
    act(() => {
      result.current.open(TestComponent, { title: 'First' }, mockResolve1);
    });

    expect(result.current.Component).toBe(TestComponent);
    expect(result.current.props).toEqual({ title: 'First' });

    // Open second modal (should replace first)
    act(() => {
      result.current.open(AnotherComponent, { title: 'Second' }, mockResolve2);
    });

    expect(result.current.Component).toBe(AnotherComponent);
    expect(result.current.props).toEqual({ title: 'Second' });
    expect(result.current.resolve).toBe(mockResolve2);
  });

  it('maintains state consistency across multiple hook instances', () => {
    const { result: result1 } = renderHook(() => useModalStore());
    const { result: result2 } = renderHook(() => useModalStore());
    const mockResolve = vi.fn();

    // Open modal using first hook
    act(() => {
      result1.current.open(TestComponent, { title: 'Test' }, mockResolve);
    });

    // Both hooks should reflect the same state
    expect(result1.current.isOpen).toBe(true);
    expect(result2.current.isOpen).toBe(true);
    expect(result1.current.Component).toBe(TestComponent);
    expect(result2.current.Component).toBe(TestComponent);

    // Close modal using second hook
    act(() => {
      result2.current.close();
    });

    // Both hooks should reflect the closed state
    expect(result1.current.isOpen).toBe(false);
    expect(result2.current.isOpen).toBe(false);
    expect(result1.current.Component).toBe(null);
    expect(result2.current.Component).toBe(null);
  });

  it('handles edge cases with null/undefined values', () => {
    const { result } = renderHook(() => useModalStore());
    const mockResolve = vi.fn();

    // Test with null component
    act(() => {
      result.current.open(null as any, {}, mockResolve);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.Component).toBe(null);

    // Test with undefined props
    act(() => {
      result.current.open(TestComponent, undefined as any, mockResolve);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.Component).toBe(TestComponent);
    expect(result.current.props).toBeUndefined();
  });
});
