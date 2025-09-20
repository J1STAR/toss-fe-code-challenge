import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "../organisms/Modal";
import { Button } from "../atoms/Button";

export interface ModalTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  titleId?: string;
  descriptionId?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
}

const ModalTemplate = forwardRef<HTMLDivElement, ModalTemplateProps>(
  ({ 
    className, 
    title, 
    description, 
    titleId,
    descriptionId,
    children,
    footer,
    showCloseButton = true,
    onClose,
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        {/* Header */}
        <ModalHeader>
          <ModalTitle id={titleId}>
            {title}
          </ModalTitle>
          {description && (
            <ModalDescription id={descriptionId}>
              {description}
            </ModalDescription>
          )}
        </ModalHeader>

        {/* Content */}
        <div className="space-y-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}

        {/* Close Button */}
        {showCloseButton && onClose && (
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
              aria-label="모달 닫기"
            >
              ✕
            </Button>
          </div>
        )}
      </div>
    );
  }
);

ModalTemplate.displayName = "ModalTemplate";

export { ModalTemplate };
