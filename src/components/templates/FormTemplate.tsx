import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { Card } from "../molecules/Card";
import { ProgressBar } from "../molecules/ProgressBar";
import { Text } from "../atoms/Text";

export interface FormTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
  children: React.ReactNode;
}

const FormTemplate = forwardRef<HTMLDivElement, FormTemplateProps>(
  ({ 
    className, 
    title, 
    description, 
    currentStep = 1, 
    totalSteps = 1,
    showProgress = false,
    children,
    ...props 
  }, ref) => {
    const progressPercentage = totalSteps > 0 ? ((currentStep - 1) / totalSteps) * 100 : 0;

    return (
      <Card ref={ref} className={cn("space-y-6", className)} {...props}>
        {/* Header */}
        <div className="text-center sm:text-left">
          <Text as="h2" variant="large" weight="semibold" className="mb-2">
            {title}
          </Text>
          {description && (
            <Text variant="body" color="muted">
              {description}
            </Text>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && totalSteps > 1 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>단계 {currentStep} / {totalSteps}</span>
              <span>{Math.round(progressPercentage)}% 완료</span>
            </div>
            <ProgressBar 
              value={currentStep - 1} 
              max={totalSteps - 1} 
              variant="primary"
              size="md"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-6">
          {children}
        </div>
      </Card>
    );
  }
);

FormTemplate.displayName = "FormTemplate";

export { FormTemplate };
