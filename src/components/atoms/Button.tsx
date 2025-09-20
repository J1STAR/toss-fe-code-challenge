import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  loading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "contained", 
    size = "md", 
    color = "primary",
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses = {
      contained: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
        secondary: "bg-slate-600 text-white hover:bg-slate-700 focus-visible:ring-slate-500",
        success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
        warning: "bg-yellow-600 text-white hover:bg-yellow-700 focus-visible:ring-yellow-500",
        error: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
      },
      outlined: {
        primary: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20",
        secondary: "border border-slate-600 text-slate-600 hover:bg-slate-50 focus-visible:ring-slate-500 dark:border-slate-400 dark:text-slate-400 dark:hover:bg-slate-900/20",
        success: "border border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-500 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20",
        warning: "border border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-500 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/20",
        error: "border border-red-600 text-red-600 hover:bg-red-50 focus-visible:ring-red-500 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20",
      },
      text: {
        primary: "text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20",
        secondary: "text-slate-600 hover:bg-slate-50 focus-visible:ring-slate-500 dark:text-slate-400 dark:hover:bg-slate-900/20",
        success: "text-green-600 hover:bg-green-50 focus-visible:ring-green-500 dark:text-green-400 dark:hover:bg-green-900/20",
        warning: "text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-900/20",
        error: "text-red-600 hover:bg-red-50 focus-visible:ring-red-500 dark:text-red-400 dark:hover:bg-red-900/20",
      },
      ghost: {
        primary: "text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20",
        secondary: "text-slate-600 hover:bg-slate-50 focus-visible:ring-slate-500 dark:text-slate-400 dark:hover:bg-slate-900/20",
        success: "text-green-600 hover:bg-green-50 focus-visible:ring-green-500 dark:text-green-400 dark:hover:bg-green-900/20",
        warning: "text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-900/20",
        error: "text-red-600 hover:bg-red-50 focus-visible:ring-red-500 dark:text-red-400 dark:hover:bg-red-900/20",
      },
    };

    const sizeClasses = {
      xs: "h-7 px-2 text-xs",
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-8 text-base",
      xl: "h-12 px-10 text-lg",
    };

    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant][color],
          sizeClasses[size],
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {leftIcon && !loading && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {rightIcon && !loading && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
