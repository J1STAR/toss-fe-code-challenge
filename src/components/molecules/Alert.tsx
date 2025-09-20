import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../atoms/Icon";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  description?: string;
  icon?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = "info", 
    title, 
    description, 
    icon,
    dismissible = false,
    onDismiss,
    children,
    ...props 
  }, ref) => {
    const variantClasses = {
      info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
      success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
      error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
    };

    const iconMap = {
      info: "ℹ️",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    };

    const displayIcon = icon !== undefined ? icon : iconMap[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "rounded-lg border p-4",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start">
          {displayIcon && displayIcon.trim() !== "" && (
            <div className="flex-shrink-0 mr-3">
              <Icon name={displayIcon} size="sm" />
            </div>
          )}
          <div className="flex-1">
            {title && (
              <h4 className="text-sm font-semibold mb-1">
                {title}
              </h4>
            )}
            {description && (
              <p className="text-sm">
                {description}
              </p>
            )}
            {children}
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className="flex-shrink-0 ml-3 text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded"
              aria-label="알림 닫기"
            >
              <Icon name="✕" size="sm" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
