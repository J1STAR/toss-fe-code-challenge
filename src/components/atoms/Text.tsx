import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "body" | "caption" | "small" | "large" | "lead";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "muted" | "primary" | "secondary" | "success" | "warning" | "error";
  align?: "left" | "center" | "right" | "justify";
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    className, 
    as: Component = "p", 
    variant = "body", 
    weight = "normal", 
    color = "default", 
    align = "left",
    ...props 
  }, ref) => {
    const variantClasses = {
      body: "text-base",
      caption: "text-xs",
      small: "text-sm",
      large: "text-lg",
      lead: "text-xl",
    };

    const weightClasses = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const colorClasses = {
      default: "text-slate-900 dark:text-slate-100",
      muted: "text-slate-600 dark:text-slate-400",
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-slate-500 dark:text-slate-500",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      error: "text-red-600 dark:text-red-400",
    };

    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          variantClasses[variant],
          weightClasses[weight],
          colorClasses[color],
          alignClasses[align],
          className
        )}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text };