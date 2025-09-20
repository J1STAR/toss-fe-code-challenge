import { createContext, useContext, useEffect, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode, HTMLAttributes } from "react";

// Modal Context
interface ModalContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal");
  }
  return context;
};

// Modal Root Component
interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ open, onOpenChange }}>
      {children}
    </ModalContext.Provider>,
    document.body
  );
};

// Modal Overlay
const ModalOverlay = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { onOpenChange, open } = useModal();

    return (
      <div
        ref={ref}
        className={`fixed inset-0 z-[100] bg-black bg-opacity-60 ${open ? 'modal-overlay-enter' : 'modal-overlay-exit'} ${className || ''}`}
        onClick={() => onOpenChange(false)}
        {...props}
      />
    );
  }
);
ModalOverlay.displayName = "ModalOverlay";

// Modal Content
const ModalContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, _ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { open } = useModal();

    // Focus management
    useEffect(() => {
      if (open && modalRef.current) {
        modalRef.current.focus();
      }
    }, [open]);

    // Focus trap
    useEffect(() => {
      if (!open) return;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }, [open]);

    return (
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`fixed left-1/2 top-1/2 z-[110] w-full max-w-2xl mx-4 border bg-white text-slate-900 p-6 shadow-xl sm:p-8 sm:rounded-lg ${open ? 'modal-content-enter' : 'modal-content-exit'} ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ModalContent.displayName = "ModalContent";

// Modal Header
const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className || ''}`}
      {...props}
    />
  )
);
ModalHeader.displayName = "ModalHeader";

// Modal Footer
const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className || ''}`}
      {...props}
    />
  )
);
ModalFooter.displayName = "ModalFooter";

// Modal Title
const ModalTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`}
      {...props}
    />
  )
);
ModalTitle.displayName = "ModalTitle";

// Modal Description
const ModalDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-neutral-500 dark:text-neutral-400 ${className || ''}`}
      {...props}
    />
  )
);
ModalDescription.displayName = "ModalDescription";

export {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};