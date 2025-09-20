import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "contained", size = "md", ...props }, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 cursor-pointer";

  const variantClasses = {
    contained:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:cursor-pointer",
    outlined:
      "border border-neutral-200 bg-transparent hover:bg-neutral-100 hover:text-neutral-900 hover:cursor-pointer dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
    text: "hover:bg-neutral-100 hover:text-neutral-900 hover:cursor-pointer dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button };
