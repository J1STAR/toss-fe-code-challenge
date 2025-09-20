import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  label?: string;
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", color = "primary", label = "로딩 중...", ...props }, ref) => {
    const sizeClasses = {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    };

    const colorClasses = {
      primary: "border-blue-600 border-t-transparent",
      secondary: "border-slate-600 border-t-transparent",
      success: "border-green-600 border-t-transparent",
      warning: "border-yellow-600 border-t-transparent",
      error: "border-red-600 border-t-transparent",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          className
        )}
        role="status"
        aria-label={label}
        {...props}
      >
        <div
          className={cn(
            "animate-spin rounded-full border-2",
            sizeClasses[size],
            colorClasses[color]
          )}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
