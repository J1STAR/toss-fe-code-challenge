import { useState, useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../atoms/Button";
import { InputField } from "../molecules/InputField";
import {
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from "./Modal";

// Enhanced Form Schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 최소 2글자 이상이어야 합니다.")
    .max(50, "이름은 50글자를 초과할 수 없습니다."),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("유효한 이메일 주소를 입력해주세요."),
  experience: z
    .string()
    .min(1, "경력 연차를 선택해주세요."),
  githubLink: z
    .string()
    .optional()
    .refine((url) => {
      if (!url || url.trim() === '') return true; // 빈 값은 허용
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('github.com');
      } catch {
        return false;
      }
    }, "유효한 GitHub 링크를 입력해주세요."),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Props Interface
interface ContactFormProps {
  closeModal: () => void;
  resolve: (value: ContactFormData | null) => void;
  onIdsReady?: (titleId: string, descriptionId: string) => void;
  isOpen?: boolean;
}

const ContactForm = ({ closeModal, resolve, onIdsReady, isOpen }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setFocus,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });


  // Notify parent component about IDs
  useEffect(() => {
    onIdsReady?.(titleId, descriptionId);
  }, [titleId, descriptionId, onIdsReady]);


  // Focus on first input when modal opens or step changes
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        const fieldsToFocus = {
          1: "name",
          2: "experience", 
          3: "githubLink",
        };
        const fieldToFocus = fieldsToFocus[currentStep as keyof typeof fieldsToFocus];
        if (fieldToFocus) {
          setFocus(fieldToFocus as "name" | "email" | "experience" | "githubLink");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep, setFocus]);

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with progress
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmittedData(data);
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ 폼 제출 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    resolve(null);
    closeModal();
  };

  // Handle completion
  const handleCompletion = () => {
    resolve(submittedData);
    closeModal();
  };

  // Handle Enter key press
  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await validateStep(currentStep);
    }
  };

  // Step validation - 단계별 검증 로직을 명확하게 분리
  const validateStep = async (step: number) => {
    const stepValidationMap = {
      1: ["name", "email"],      // 기본 정보 검증
      2: ["experience"],         // 경력 정보 검증  
      3: ["githubLink"],         // GitHub 링크 검증 (선택사항)
    };
    
    const fieldsToValidate = stepValidationMap[step as keyof typeof stepValidationMap];
    
    if (!fieldsToValidate) {
      setCurrentStep(step + 1);
      return;
    }
    
    const isValid = await trigger(fieldsToValidate as any);
    
    if (isValid) {
      if (step === 3) {
        // 마지막 단계에서 검증 통과 시 폼 제출
        handleSubmit(onSubmit)();
      } else {
        // 다음 단계로 이동
        setCurrentStep(step + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Show completion screen
  if (isCompleted && submittedData) {
    return (
      <div>
        <ModalHeader>
          <ModalTitle id={titleId}>🎉 신청 정보 제출 완료</ModalTitle>
          <ModalDescription id={descriptionId}>
            지원 정보가 성공적으로 제출되었습니다.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <h4 className="mb-2 text-sm font-semibold text-green-800 dark:text-green-200">
                  👤 기본 정보
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-green-700 dark:text-green-300">이름:</span>
                    <span className="ml-2 text-green-600 dark:text-green-400">{submittedData.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-700 dark:text-green-300">이메일:</span>
                    <span className="ml-2 text-green-600 dark:text-green-400">{submittedData.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <h4 className="mb-2 text-sm font-semibold text-green-800 dark:text-green-200">
                  💼 경력 정보
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-green-700 dark:text-green-300">경력 연차:</span>
                    <span className="ml-2 text-green-600 dark:text-green-400">{submittedData.experience}년</span>
                  </div>
                  {submittedData.githubLink && (
                    <div>
                      <span className="font-medium text-green-700 dark:text-green-300">GitHub:</span>
                      <a 
                        href={submittedData.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                      >
                        {submittedData.githubLink}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900/30">
              <h4 className="mb-2 text-sm font-semibold text-green-800 dark:text-green-200">
                📋 제출 요약
              </h4>
              <p className="text-sm text-green-600 dark:text-green-400">
                {submittedData.name}님의 지원 정보가 성공적으로 제출되었습니다. 
                {submittedData.githubLink ? ' GitHub 프로필도 함께 등록되었습니다.' : ' GitHub 프로필은 등록되지 않았습니다.'}
              </p>
            </div>
          </div>
        </div>

        <ModalFooter>
          <div className="flex w-full justify-end">
            <Button 
              onClick={handleCompletion}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              확인
            </Button>
          </div>
        </ModalFooter>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ModalHeader>
        <ModalTitle id={titleId}>신청 폼 작성하기</ModalTitle>
        <ModalDescription id={descriptionId}>
          지원 정보를 입력해주세요. 언제든지 ESC 키를 눌러 취소할 수 있습니다.
        </ModalDescription>
      </ModalHeader>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>단계 {currentStep} / 3</span>
          <span>{Math.round(((currentStep - 1) / 3) * 100)}% 완료</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300`}
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              👤 기본 정보
            </h3>
            <div className="space-y-4">
              <InputField
                label="이름"
                type="text"
                placeholder="홍길동"
                {...register("name")}
                error={errors.name?.message}
                touched={touchedFields.name}
                disabled={isSubmitting}
                autoComplete="name"
                onKeyDown={handleKeyPress}
              />
              <InputField
                label="이메일 주소"
                type="email"
                placeholder="example@company.com"
                {...register("email")}
                error={errors.email?.message}
                touched={touchedFields.email}
                disabled={isSubmitting}
                autoComplete="email"
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Experience Information */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              💼 경력 정보
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  FE 경력 연차
                </label>
                <select
                  id="experience"
                  {...register("experience")}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 ${
                    touchedFields.experience && errors.experience 
                      ? 'border-red-500 dark:border-red-500' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                  disabled={isSubmitting}
                  onKeyDown={handleKeyPress}
                >
                  <option value="">경력 연차를 선택해주세요</option>
                  <option value="0-3">0-3년</option>
                  <option value="4-7">4-7년</option>
                  <option value="8+">8년 이상</option>
                </select>
                {touchedFields.experience && errors.experience && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert" aria-live="polite">
                    {errors.experience.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: GitHub Link */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              🔗 GitHub 정보
            </h3>
            <div className="space-y-4">
              <InputField
                label="GitHub 링크 (선택사항)"
                type="url"
                placeholder="https://github.com/username"
                {...register("githubLink")}
                error={errors.githubLink?.message}
                touched={touchedFields.githubLink}
                disabled={isSubmitting}
                autoComplete="url"
                onKeyDown={handleKeyPress}
              />
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 <strong>팁:</strong> GitHub 프로필 URL을 입력해주세요. (선택사항) 예: https://github.com/username
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModalFooter>
        <div className="flex w-full justify-between">
          <div>
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outlined" 
                onClick={goToPreviousStep}
                disabled={isSubmitting}
              >
                ← 이전
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outlined" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              취소
            </Button>
            {currentStep < 3 ? (
              <Button 
                type="button" 
                onClick={() => validateStep(currentStep)}
                disabled={isSubmitting}
              >
                다음 →
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={() => validateStep(currentStep)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "제출 중..." : "제출하기"}
              </Button>
            )}
          </div>
        </div>
      </ModalFooter>

      {/* Screen reader announcements - 터치된 필드의 오류만 알림 */}
      {(touchedFields.name && errors.name) || 
       (touchedFields.email && errors.email) || 
       (touchedFields.experience && errors.experience) || 
       (touchedFields.githubLink && errors.githubLink) ? (
        <div 
          className="sr-only" 
          role="alert" 
          aria-live="assertive"
          aria-atomic="true"
        >
          입력 오류가 있습니다: {
            [
              touchedFields.name && errors.name && errors.name.message,
              touchedFields.email && errors.email && errors.email.message,
              touchedFields.experience && errors.experience && errors.experience.message,
              touchedFields.githubLink && errors.githubLink && errors.githubLink.message
            ].filter(Boolean).join(", ")
          }
        </div>
      ) : null}

      {/* Loading overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-sm text-slate-600 dark:text-slate-400">제출 중...</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
