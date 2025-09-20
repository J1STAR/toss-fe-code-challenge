import { useState, useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../atoms/Button";
import { InputField } from "../molecules/InputField";
import { SelectField } from "../molecules/SelectField";
import { ProgressBar } from "../molecules/ProgressBar";
import { Card } from "../molecules/Card";
import { Alert } from "../molecules/Alert";
import { Spinner } from "../atoms/Spinner";
import { Text } from "../atoms/Text";
import { FormTemplate } from "../templates/FormTemplate";
import { ModalTemplate } from "../templates/ModalTemplate";

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
      
      // URL 형식 검증
      try {
        const urlObj = new URL(url);
        
        // GitHub 도메인 검증
        if (!urlObj.hostname.includes('github.com')) {
          return false;
        }
        
        // 프로토콜 검증 (http 또는 https)
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
          return false;
        }
        
        // GitHub 프로필 URL 패턴 검증 (예: https://github.com/username)
        const pathname = urlObj.pathname;
        const githubProfilePattern = /^\/[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\/?$/;
        
        return githubProfilePattern.test(pathname);
      } catch {
        return false;
      }
    }, "유효한 GitHub 프로필 URL을 입력해주세요. (예: https://github.com/username)"),
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
    reValidateMode: "onChange", // 실시간 재검증 활성화
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
      <ModalTemplate
        title="🎉 신청 정보 제출 완료"
        description="지원 정보가 성공적으로 제출되었습니다."
        titleId={titleId}
        descriptionId={descriptionId}
        footer={
          <div className="flex w-full justify-end">
            <Button 
              onClick={handleCompletion}
              color="success"
              size="lg"
            >
              확인
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card variant="outlined" className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
              <div className="space-y-3">
                <Text as="h4" variant="small" weight="semibold" color="success">
                  👤 기본 정보
                </Text>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text variant="small" weight="medium" color="success">이름:</Text>
                    <Text variant="small" color="success">{submittedData.name}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="small" weight="medium" color="success">이메일:</Text>
                    <Text variant="small" color="success">{submittedData.email}</Text>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card variant="outlined" className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
              <div className="space-y-3">
                <Text as="h4" variant="small" weight="semibold" color="success">
                  💼 경력 정보
                </Text>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text variant="small" weight="medium" color="success">경력 연차:</Text>
                    <Text variant="small" color="success">{submittedData.experience}년</Text>
                  </div>
                  {submittedData.githubLink && (
                    <div className="flex justify-between">
                      <Text variant="small" weight="medium" color="success">GitHub:</Text>
                      <a 
                        href={submittedData.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm"
                      >
                        프로필 보기
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
          
          <Alert
            variant="success"
            title="📋 제출 요약"
            description={`${submittedData.name}님의 지원 정보가 성공적으로 제출되었습니다. ${
              submittedData.githubLink ? 'GitHub 프로필도 함께 등록되었습니다.' : 'GitHub 프로필은 등록되지 않았습니다.'
            }`}
          />
        </div>
      </ModalTemplate>
    );
  }

  const experienceOptions = [
    { value: "0-3", label: "0-3년" },
    { value: "4-7", label: "4-7년" },
    { value: "8+", label: "8년 이상" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ModalTemplate
        title="신청 폼 작성하기"
        description="지원 정보를 입력해주세요. 언제든지 ESC 키를 눌러 취소할 수 있습니다."
        titleId={titleId}
        descriptionId={descriptionId}
        footer={
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
                  loading={isSubmitting}
                >
                  {isSubmitting ? "제출 중..." : "제출하기"}
                </Button>
              )}
            </div>
          </div>
        }
      >
        {/* Progress Indicator */}
        <ProgressBar 
          value={currentStep - 1} 
          max={2} 
          variant="primary"
          showLabel={true}
          label={`단계 ${currentStep} / 3`}
        />

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <FormTemplate
            title="👤 기본 정보"
            currentStep={currentStep}
            totalSteps={3}
            showProgress={false}
          >
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
                leftIcon="👤"
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
                leftIcon="📧"
              />
            </div>
          </FormTemplate>
        )}

        {/* Step 2: Experience Information */}
        {currentStep === 2 && (
          <FormTemplate
            title="💼 경력 정보"
            currentStep={currentStep}
            totalSteps={3}
            showProgress={false}
          >
            <div className="space-y-4">
              <SelectField
                label="FE 경력 연차"
                {...register("experience")}
                error={errors.experience?.message}
                touched={touchedFields.experience}
                options={experienceOptions}
                disabled={isSubmitting}
                onKeyDown={handleKeyPress}
                placeholder="경력 연차를 선택해주세요"
              />
            </div>
          </FormTemplate>
        )}

        {/* Step 3: GitHub Link */}
        {currentStep === 3 && (
          <FormTemplate
            title="🔗 GitHub 정보"
            currentStep={currentStep}
            totalSteps={3}
            showProgress={false}
          >
            <div className="space-y-4">
              <InputField
                label="GitHub 링크 (선택사항)"
                type="url"
                placeholder="https://github.com/username"
                {...register("githubLink", {
                  onChange: () => {
                    // 실시간 검증을 위해 githubLink 필드만 트리거
                    trigger("githubLink");
                  }
                })}
                error={errors.githubLink?.message}
                touched={touchedFields.githubLink}
                disabled={isSubmitting}
                autoComplete="url"
                onKeyDown={handleKeyPress}
                leftIcon="🔗"
                helperText="GitHub 프로필 URL을 입력해주세요. (선택사항)"
              />
              <Alert
                variant="info"
                description="GitHub 프로필 URL을 입력해주세요. (선택사항) 예: https://github.com/username"
              />
            </div>
          </FormTemplate>
        )}

      </ModalTemplate>

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
              <Spinner size="lg" color="primary" label="제출 중..." />
              <Text variant="small" color="muted" className="mt-4">
                제출 중...
              </Text>
            </div>
          </div>
        )}
    </form>
  );
};

export default ContactForm;
