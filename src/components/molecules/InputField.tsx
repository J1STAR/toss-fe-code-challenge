import { forwardRef, useId } from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ className, id, label, error, ...props }, ref) => {
  const inputId = id || useId();

  return (
    <div className={`w-full ${className || ''}`}>
      <label
        htmlFor={inputId}
        className={`block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 ${error ? 'text-red-500 dark:text-red-500' : ''}`}
      >
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        className={`block w-full appearance-none rounded-md border border-neutral-300 bg-transparent px-3 py-3 text-sm text-neutral-900 transition-colors focus:border-primary focus:outline-none focus:ring-0 dark:border-neutral-700 dark:text-neutral-50 ${error ? 'border-red-500 dark:border-red-500' : ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-500">{error}</p>}
    </div>
  );
});
InputField.displayName = "InputField";

export { InputField };
