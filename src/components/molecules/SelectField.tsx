import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  touched?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ 
    className, 
    id, 
    label, 
    error, 
    touched, 
    options,
    placeholder,
    disabled,
    ...props 
  }, ref) => {
    const selectId = id || useId();
    
    // 터치된 필드에서만 오류 메시지 표시
    const shouldShowError = touched && error;

    return (
      <div className={cn("w-full", className)}>
        <label
          htmlFor={selectId}
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
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "block w-full appearance-none rounded-md border px-3 py-3 pr-10 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-slate-700 dark:text-neutral-50 cursor-pointer",
              shouldShowError 
                ? "border-red-500 dark:border-red-500" 
                : "border-neutral-300 dark:border-neutral-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            {...props}
          >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          </select>
          {/* Dropdown arrow icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-neutral-400 dark:text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {shouldShowError && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-500" role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export { SelectField };
