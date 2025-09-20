import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "success" | "warning" | "error";
  showLabel?: boolean;
  label?: string;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    size = "md", 
    variant = "default",
    showLabel = false,
    label,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const currentValue = Math.round(value);
    const maxValue = Math.round(max);
    
    // ARIA 속성을 별도로 정의하여 린터 오류 방지
    const ariaProps = {
      "aria-valuenow": currentValue,
      "aria-valuemin": 0,
      "aria-valuemax": maxValue,
      "aria-label": label || `${Math.round(percentage)}% 완료`
    };

    const sizeClasses = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    };

    const variantClasses = {
      default: "bg-gradient-to-r from-slate-400 to-slate-600",
      primary: "bg-gradient-to-r from-blue-500 to-blue-600",
      success: "bg-gradient-to-r from-green-500 to-green-600",
      warning: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      error: "bg-gradient-to-r from-red-500 to-red-600",
    };

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        role="progressbar"
        {...ariaProps}
        {...props}
      >
        {showLabel && (
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
            <span>{label || "진행률"}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div className={cn("w-full rounded-full bg-slate-200 dark:bg-slate-700", sizeClasses[size])}>
          <div
            className={cn(
              "rounded-full transition-all duration-300 ease-out",
              sizeClasses[size],
              variantClasses[variant]
            )}
            style={{ width: `${Math.round(percentage)}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
