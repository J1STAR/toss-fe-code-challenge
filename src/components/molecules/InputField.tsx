import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  variant?: "default" | "filled" | "outlined";
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    className, 
    id, 
    label, 
    error, 
    touched, 
    helperText,
    leftIcon,
    rightIcon,
    variant = "default",
    disabled,
    ...props 
  }, ref) => {
    const inputId = id || useId();
    
    // 터치된 필드에서만 오류 메시지 표시
    const shouldShowError = touched && error;

    const variantClasses = {
      default: "border border-neutral-300 dark:border-neutral-700 bg-transparent",
      filled: "border-0 bg-neutral-100 dark:bg-neutral-800",
      outlined: "border-2 border-neutral-300 dark:border-neutral-700 bg-transparent",
    };

    return (
      <div className={cn("w-full", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "block text-sm font-medium mb-2",
            shouldShowError 
              ? "text-red-500 dark:text-red-500" 
              : "text-neutral-700 dark:text-neutral-300"
          )}
        >
          {label}
        </label>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "block w-full appearance-none rounded-md px-3 py-3 text-sm text-neutral-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-neutral-50",
              variantClasses[variant],
              shouldShowError && "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        {shouldShowError && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-500" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        {helperText && !shouldShowError && (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
