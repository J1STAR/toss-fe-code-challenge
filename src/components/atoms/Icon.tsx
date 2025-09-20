import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "muted";
}

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ className, name, size = "md", color = "default", ...props }, ref) => {
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    const colorClasses = {
      default: "text-slate-900 dark:text-slate-100",
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-slate-500 dark:text-slate-500",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      error: "text-red-600 dark:text-red-400",
      muted: "text-slate-400 dark:text-slate-500",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        role="img"
        aria-label={name}
        {...props}
      >
        {name}
      </span>
    );
  }
);

Icon.displayName = "Icon";

export { Icon };