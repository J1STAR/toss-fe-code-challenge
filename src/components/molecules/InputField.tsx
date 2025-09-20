import { forwardRef, useId } from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ className, id, label, error, touched, ...props }, ref) => {
  const inputId = id || useId();
  
  // 터치된 필드에서만 오류 메시지 표시
  const shouldShowError = touched && error;

  return (
    <div className={`w-full ${className || ''}`}>
      <label
        htmlFor={inputId}
        className={`block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 ${shouldShowError ? 'text-red-500 dark:text-red-500' : ''}`}
      >
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        className={`block w-full appearance-none rounded-md border border-neutral-300 bg-transparent px-3 py-3 text-sm text-neutral-900 transition-colors focus:border-primary focus:outline-none focus:ring-0 dark:border-neutral-700 dark:text-neutral-50 ${shouldShowError ? 'border-red-500 dark:border-red-500' : ''}`}
        {...props}
      />
      {shouldShowError && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-500" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
});
InputField.displayName = "InputField";

export { InputField };
