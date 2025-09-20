import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variantClasses = {
      default: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
      primary: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
      secondary: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
      success: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
      warning: "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",
      error: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
      outline: "border border-slate-200 text-slate-900 dark:border-slate-700 dark:text-slate-100",
    };

    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm",
      lg: "px-3 py-1 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };