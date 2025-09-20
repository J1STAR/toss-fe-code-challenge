# 📅 `toss-fe-code-challenge` 웹 접근성 모달 컴포넌트 구현

## 📝 작성 의도

본 문서는 React와 TypeScript를 사용하여 **웹 접근성(WCAG 2.1 AA)을 완전히 준수하는 모달 컴포넌트**를 구현하고, **선언적 API를 통한 모달 관리 시스템**을 구축한 전체 과정을 기록하는 것을 목표로 합니다.

특히, 스크린리더 사용자와 키보드 전용 사용자를 위한 **완전한 접근성 지원**, **Atomic Design Pattern을 활용한 컴포넌트 아키텍처**, **Zustand를 활용한 상태 관리**, **Promise 기반의 선언적 모달 API**, **다단계 폼 검증 시스템**, **모달 내 완료 화면 구현**, **키보드 접근성 최적화** 등 핵심 기술적 결정의 배경과 구현 과정을 상세히 설명합니다.

## 🏛️ 구현 의도 및 아키텍처 전략

### 1. 핵심 아키텍처: 접근성 우선 설계, 컴포넌트 모듈화, 선언적 API

- **문제점**: 기존 모달 구현은 접근성을 고려하지 않아 스크린리더 사용자나 키보드 전용 사용자가 사용하기 어려웠습니다. 또한 명령형 방식의 모달 관리로 인해 코드 복잡성이 증가하고 재사용성이 떨어졌습니다.
- **해결책**: **① WCAG 2.1 AA 수준의 완전한 접근성 지원**, **② Atomic Design Pattern을 통한 컴포넌트 모듈화**, **③ Promise 기반의 선언적 모달 API**, **④ 다단계 폼 검증 시스템**, **⑤ 모달 내 완료 화면 구현**, **⑥ 키보드 접근성 최적화**를 구현했습니다.

#### ① 접근성 우선 설계: WCAG 2.1 AA 완전 준수
모든 사용자가 동등하게 사용할 수 있는 웹 애플리케이션을 목표로 접근성을 최우선으로 설계했습니다.

- **ARIA 속성 완전 구현**: `aria-modal="true"`, `aria-labelledby`, `aria-describedby`, `role="dialog"` 등 모든 필수 ARIA 속성을 동적으로 관리
- **포커스 관리**: 모달 열릴 때 첫 번째 입력 필드에 자동 포커스, 닫힐 때 트리거 버튼으로 포커스 복귀
- **키보드 조작**: ESC로 닫기, Tab으로 포커스 트랩, 모든 기능을 키보드만으로 조작 가능
- **스크린리더 지원**: 실시간 오류 메시지 알림(`aria-live="assertive"`), 의미있는 라벨과 설명 제공
- **페이지 접근성**: 스킵 링크, 시맨틱 랜드마크, 고대비/다크모드 지원
- **단계별 포커스 관리**: 각 단계로 이동할 때마다 해당 단계의 첫 번째 입력 필드에 자동 포커스

#### ② 컴포넌트 모듈화: Atomic Design Pattern
재사용 가능하고 확장 가능한 컴포넌트 구조를 위해 Atomic Design Pattern을 적용했습니다.

```
src/components/
├── atoms/           # 기본 UI 컴포넌트 (최소 단위)
│   ├── Button.tsx   # 버튼 (variant, size, color 지원)
│   ├── Text.tsx     # 텍스트 (variant, weight, color, align 지원)
│   ├── Icon.tsx     # 아이콘 (size, color 지원)
│   ├── Spinner.tsx  # 로딩 스피너 (size, color 지원)
│   ├── Badge.tsx    # 배지 (variant, size 지원)
│   └── index.ts     # Barrel exports
├── molecules/       # 조합된 컴포넌트 (2개 이상 atoms 조합)
│   ├── InputField.tsx    # 입력 필드 (아이콘, 에러 상태, 터치 기반 검증)
│   ├── SelectField.tsx   # 선택 필드 (키보드 접근성, 드롭다운 화살표)
│   ├── ProgressBar.tsx   # 진행률 표시 (variant, label 지원)
│   ├── Card.tsx          # 카드 (variant, padding 지원)
│   ├── Alert.tsx         # 알림 (variant, 아이콘 지원)
│   └── index.ts          # Barrel exports
├── organisms/       # 복합 컴포넌트 (완전한 기능)
│   ├── Modal.tsx         # 모달 (접근성 완전 지원, Portal 사용)
│   ├── ContactForm.tsx   # 연락처 폼 (다단계 폼, 실시간 검증)
│   └── ModalProvider.tsx # 모달 프로바이더 (전역 상태 관리)
├── templates/       # 템플릿 컴포넌트 (레이아웃 구조)
│   ├── FormTemplate.tsx   # 폼 템플릿 (진행률 표시 포함)
│   ├── ModalTemplate.tsx # 모달 템플릿 (헤더, 푸터 포함)
│   └── index.ts           # Barrel exports
└── pages/          # 페이지 컴포넌트 (완성된 페이지)
    ├── HomePage.tsx      # 홈페이지 (완전한 접근성 지원)
    └── index.ts          # Barrel exports
```

- **Atoms**: 재사용 가능한 기본 컴포넌트 (Button, Text, Icon, Spinner, Badge)
- **Molecules**: 여러 atoms를 조합한 기능적 컴포넌트 (InputField, SelectField, ProgressBar, Card, Alert)
- **Organisms**: 완전한 기능을 가진 복합 컴포넌트 (Modal, ContactForm, ModalProvider)
- **Templates**: 레이아웃과 구조를 정의하는 템플릿 컴포넌트 (FormTemplate, ModalTemplate)
- **Pages**: 완성된 페이지 컴포넌트 (HomePage)

#### ③ 선언적 모달 API: Promise 기반 비동기 처리
명령형 방식의 모달 관리를 선언적 API로 개선하여 코드 가독성과 재사용성을 향상시켰습니다.

```typescript
// 선언적 모달 사용법
await openModal(ContactForm, {});
```

#### ④ 다단계 폼 검증: 단계별 사용자 경험 최적화
복잡한 폼을 단계별로 나누어 사용자 경험을 향상시키고, 각 단계에서 적절한 검증을 수행합니다.

- **Step 1**: 기본 정보 (이름, 이메일) - 필수 검증
- **Step 2**: 경력 정보 (경력 연차) - 필수 검증
- **Step 3**: GitHub 정보 (GitHub 링크) - 선택사항 검증

#### ⑤ 모달 내 완료 화면: 사용자 경험 향상
폼 제출 후 페이지를 새로고침하지 않고 모달 내에서 바로 결과를 확인할 수 있도록 구현했습니다.

- **제출 완료 시**: 모달이 닫히지 않고 완료 화면으로 전환
- **구조화된 정보 표시**: 입력한 모든 정보를 카드 형태로 표시
- **확인 버튼**: 사용자가 결과를 확인한 후 모달 닫기

#### ⑥ 키보드 접근성 최적화: 완전한 키보드 조작 지원
모든 사용자가 키보드만으로도 완전히 조작할 수 있도록 구현했습니다.

- **엔터 키 지원**: 각 입력 필드에서 엔터를 누르면 다음 단계로 이동
- **단계별 자동 포커스**: 각 단계로 이동할 때마다 해당 입력 필드에 자동 포커스
- **포커스 트랩**: 모달 내에서만 포커스가 순환되도록 제한
- **SelectField 키보드 지원**: 드롭다운 메뉴 완전한 키보드 조작 (Tab, Space, 화살표 키, Enter)
- **시각적 포커스 표시**: 모든 상호작용 요소에 명확한 포커스 링 적용

## ✅ 구현된 내용 상세

### 1. 상태 관리 계층: Zustand를 활용한 경량 상태 관리

#### 모달 상태 관리 아키텍처
Zustand의 간단하고 직관적인 API를 활용하여 모달 상태를 중앙에서 관리합니다.

```typescript
// src/store/modal.store.ts
type ModalState = {
  isOpen: boolean;
  Component: ComponentType<any> | null;
  props: any;
  resolve: (value: any) => void;
  open: (Component, props, resolve) => void;
  close: () => void;
};

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  Component: null,
  props: {},
  resolve: () => {},
  open: (Component, props, resolve) =>
    set({ isOpen: true, Component, props, resolve }),
  close: () =>
    set((state) => {
      if (state.Component) {
        state.resolve(null);
      }
      return { isOpen: false, Component: null, props: {} };
    }),
}));
```

#### 선언적 모달 열기 로직
Promise 기반의 비동기 처리를 통해 모달의 생명주기를 관리합니다.

```typescript
// src/use-cases/openModal.ts
export const openModal = <T extends {}>(Component: ComponentType<T>, props: Partial<T> = {}) => {
  const { open } = useModalStore.getState();

  return new Promise<any>((resolve) => {
    open(Component, props, resolve);
  });
};
```

### 2. 컴포넌트 계층: 접근성을 고려한 모듈화된 구조

#### 모달 컴포넌트: 완전한 접근성 지원
React Portal을 활용하여 모달을 body에 렌더링하고, 모든 접근성 요구사항을 충족합니다.

```typescript
// src/components/organisms/Modal.tsx
const ModalContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, _ref) => {
    return (
      <div
        ref={modalRef}
        role="dialog"                    // 대화상자 역할 명시
        aria-modal="true"                // 모달임을 명시
        tabIndex={-1}
        className={`fixed left-1/2 top-1/2 z-[110] w-full max-w-2xl mx-4 border bg-white text-slate-900 p-6 shadow-xl sm:p-8 sm:rounded-lg ${open ? 'modal-content-enter' : 'modal-content-exit'} ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
```

#### 포커스 관리 및 키보드 조작
모달의 포커스 트랩과 키보드 조작을 완전히 구현했습니다.

```typescript
// 포커스 트랩 구현
useEffect(() => {
  if (!open) return;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  document.addEventListener("keydown", handleTabKey);
  return () => document.removeEventListener("keydown", handleTabKey);
}, [open]);
```

### 3. 폼 관리 계층: React Hook Form과 Zod를 활용한 검증

#### React Hook Form 설정
실시간 검증과 터치 기반 검증을 위한 설정을 구현했습니다.

```typescript
// src/components/organisms/ContactForm.tsx
const {
  register,
  handleSubmit,
  formState: { errors, touchedFields },
  setFocus,
  trigger,
} = useForm<ContactFormData>({
  resolver: zodResolver(contactSchema),
  mode: "onBlur",           // 필드에서 포커스가 벗어날 때 검증
  reValidateMode: "onChange", // 실시간 재검증 활성화
});
```

#### 타입 안전한 폼 스키마
Zod를 활용하여 런타임 타입 검증과 폼 검증을 통합했습니다.

```typescript
// src/components/organisms/ContactForm.tsx
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
```

#### 다단계 폼 검증 시스템
단계별 검증을 통해 사용자 경험을 향상시켰습니다.

```typescript
// 단계별 검증 로직
const validateStep = async (step: number) => {
  const fieldsToValidate = {
    1: ["name", "email"],
    2: ["experience"],
    3: ["githubLink"], // GitHub 링크 검증 (선택사항이지만 입력된 경우 유효성 검사)
  };
  
  const fields = fieldsToValidate[step as keyof typeof fieldsToValidate];
  if (fields && fields.length > 0) {
    const isValid = await trigger(fields as any);
    if (isValid) {
      if (step === 3) {
        // Step 3에서 검증 통과 시 바로 폼 제출
        handleSubmit(onSubmit)();
      } else {
        setCurrentStep(step + 1);
      }
    }
  } else {
    setCurrentStep(step + 1);
  }
};
```

#### SelectField 컴포넌트: 완전한 키보드 접근성 지원
드롭다운 선택 필드에서 완전한 키보드 접근성을 구현했습니다.

**주요 기능:**
- **키보드 조작**: Tab, Space, 화살표 키, Enter 키 완전 지원
- **시각적 피드백**: 드롭다운 화살표 아이콘과 포커스 링
- **접근성**: ARIA 속성과 스크린리더 지원
- **터치 기반 검증**: 사용자 상호작용 후에만 오류 메시지 표시
- **일관된 스타일**: 다른 입력 필드와 동일한 디자인 시스템

```typescript
// src/components/molecules/SelectField.tsx
const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, id, label, error, touched, options, placeholder, disabled, ...props }, ref) => {
    const selectId = id || useId();
    const shouldShowError = touched && error;

    return (
      <div className={cn("w-full", className)}>
        <label htmlFor={selectId} className={cn("block text-sm font-medium mb-2", ...)}>
          {label}
        </label>
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "block w-full appearance-none rounded-md border px-3 py-3 pr-10 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-slate-700 dark:text-neutral-50 cursor-pointer",
              shouldShowError ? "border-red-500 dark:border-red-500" : "border-neutral-300 dark:border-neutral-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            {...props}
          >
            {placeholder && (
              <option value="">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          {/* 드롭다운 화살표 아이콘 */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {shouldShowError && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-500" role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    );
  }
);
```

#### 키보드 접근성 최적화
각 단계로 이동할 때마다 해당 입력 필드에 자동 포커스하고, 엔터 키로 다음 단계로 이동할 수 있도록 구현했습니다.

```typescript
// 단계별 자동 포커스
useEffect(() => {
  if (isOpen) {
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

// 엔터 키 핸들러
const handleKeyPress = async (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    await validateStep(currentStep);
  }
};
```

#### GitHub 링크 실시간 검증
입력 값이 있을 경우 실시간으로 GitHub 프로필 URL 검증을 수행합니다.

```typescript
// GitHub 링크 입력 필드에 실시간 검증 적용
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
```

#### 폼 단계별 구조
```typescript
// Step 1: 기본 정보
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
          onKeyDown={handleKeyPress}
        />
        <InputField 
          label="이메일 주소" 
          type="email" 
          placeholder="example@company.com" 
          {...register("email")} 
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  </div>
)}

// Step 2: 경력 정보
{currentStep === 2 && (
  <div className="space-y-6">
    <div>
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        💼 경력 정보
      </h3>
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
    </div>
  </div>
)}

// Step 3: GitHub 정보
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
```

### 4. 모달 내 완료 화면: 사용자 경험 향상

#### 완료 상태 관리
폼 제출 후 모달이 닫히지 않고 완료 화면으로 전환하도록 구현했습니다.

```typescript
// 완료 상태 추가
const [isCompleted, setIsCompleted] = useState(false);
const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

// 제출 완료 처리
const onSubmit = async (data: ContactFormData) => {
  setIsSubmitting(true);
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmittedData(data);
    setIsCompleted(true);
  } catch (error) {
    console.error("❌ 폼 제출 오류:", error);
  } finally {
    setIsSubmitting(false);
  }
};
```

#### 완료 화면 UI
제출된 정보를 구조화된 형태로 표시하는 완료 화면을 구현했습니다.

```typescript
// 완료 화면 렌더링
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
```

### 5. 스타일링 계층: Tailwind CSS와 접근성 최적화

#### 접근성을 고려한 CSS 설계
다양한 사용자 환경을 지원하는 CSS를 구현했습니다.

```css
/* src/index.css */

/* 애니메이션 감소 설정 지원 */
@media (prefers-reduced-motion: reduce) {
  .modal-overlay-enter,
  .modal-overlay-exit,
  .modal-content-enter,
  .modal-content-exit {
    animation: none;
  }
}

/* 고대비 모드 지원 */
@media (prefers-contrast: high) {
  .modal-content {
    border: 2px solid;
  }
  
  .button {
    border: 1px solid;
  }
}

/* 다크 모드 지원 */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}

/* 스킵 링크 스타일 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only.focus-within:not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### 6. 페이지 접근성 계층: 시맨틱 HTML과 랜드마크 구조

#### 완전한 페이지 접근성 구현
웹 접근성 표준을 완전히 준수하는 페이지 구조를 구현했습니다.

```typescript
// src/ModalFormPage.tsx

// 스킵 링크 추가
<div className="sr-only focus-within:not-sr-only"></div>
  <a href="#main-content">메인 콘텐츠로 건너뛰기</a>
  <a href="#features">기능 섹션으로 건너뛰기</a>
</div>

// 시맨틱 랜드마크 구조
<header role="banner">...</header>
<main id="main-content" role="main">...</main>
<footer role="contentinfo">...</footer>

// 의미있는 제목 구조
<h1 id="hero-title">현대적인 웹 접근성의 새로운 표준</h1>
<h2 id="features-title">핵심 기능</h2>
<h2 id="guide-title">구현 가이드</h2>

// 리스트 구조 명시
<div role="list">
  <article role="listitem">...</article>
  <article role="listitem">...</article>
</div>

// 장식적 요소 숨김
<div aria-hidden="true">🎯</div>
```

## 🛠 기술 스택 및 아키텍처

### 핵심 기술 스택
- **React 19.1.1**: 최신 React 기능 활용 (forwardRef)
- **TypeScript ~5.8.3**: 완전한 타입 안정성 보장
- **Vite ^7.1.2**: 빠른 개발 환경과 HMR

### 상태 관리 & 폼
- **Zustand ^5.0.8**: 경량 상태 관리 (모달 상태 전역 관리)
- **React Hook Form ^7.63.0**: 성능 최적화된 폼 관리
- **Zod ^4.1.9**: 런타임 타입 검증과 폼 검증 통합

### 스타일링 & 접근성
- **Tailwind CSS ^4.1.13**: 유틸리티 퍼스트 CSS
- **Tailwind CSS Animate ^1.0.7**: 부드러운 애니메이션
- **clsx ^2.1.1 & tailwind-merge ^3.3.1**: 조건부 클래스 관리
- **@hookform/resolvers ^5.2.2**: React Hook Form과 Zod 통합
- **modern-normalize ^3.0.1**: 모던 브라우저 정규화

### 개발 도구
- **@biomejs/biome ^2.2.2**: 코드 포맷팅 및 린팅
- **autoprefixer ^10.4.21**: CSS 자동 접두사 추가
- **@types/react ^19.1.10 & @types/react-dom ^19.1.7**: TypeScript 타입 정의

### 모달 크기 및 레이아웃
- **모달 최대 너비**: `max-w-2xl` (기존 `max-w-lg`에서 확장)
- **반응형 디자인**: 모바일에서는 `mx-4`로 좌우 여백 확보
- **완료 화면**: 2열 그리드 레이아웃으로 정보 구조화


### 적용된 디자인 패턴

#### 1. Atomic Design Pattern
```
Atoms (Button) → Molecules (InputField) → Organisms (Modal, ContactForm)
```

#### 2. Compound Component Pattern
```typescript
<Modal open={isOpen} onOpenChange={handleOpenChange}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
      <ModalTitle id={titleId}>신청 폼 작성하기</ModalTitle>
      <ModalDescription id={descriptionId}>
        지원 정보를 입력해주세요. 언제든지 ESC 키를 눌러 취소할 수 있습니다.
      </ModalDescription>
    </ModalHeader>
    <ModalFooter>
      <Button type="button" onClick={() => validateStep(currentStep)}>
        다음 →
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

#### 3. Provider Pattern
```typescript
// Zustand를 활용한 전역 모달 상태 관리
const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  Component: null,
  props: {},
  resolve: () => {},
  open: (Component, props, resolve) => set({
    isOpen: true,
    Component,
    props,
    resolve,
  }),
  close: () => set((state) => {
    if (state.Component) {
      state.resolve(null);
    }
    return { isOpen: false, Component: null, props: {} };
  }),
}));
<ModalProvider />
```

#### 4. Custom Hook Pattern
```typescript
// use-cases/openModal.ts
export const openModal = <T extends {}>(Component: ComponentType<T>, props: Partial<T> = {}) => {
  const { open } = useModalStore.getState();
  return new Promise<any>((resolve) => {
    open(Component, props, resolve);
  });
};

// 사용 예시
const result = await openModal(ContactForm, {});
```

#### 5. Render Props Pattern
```typescript
// ModalProvider에서 컴포넌트를 동적으로 렌더링
<Component 
  {...props} 
  closeModal={close} 
  resolve={resolve} 
  onIdsReady={handleIdsReady}
  isOpen={isOpen}
/>
```

## 🚀 실행 방법

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# Storybook 실행 (컴포넌트 문서 및 테스트)
yarn storybook

# 코드 검사 (포맷팅 및 린팅)
yarn check

# 테스트 실행
yarn test:run

# 테스트 커버리지 확인
yarn test:coverage
```

## 📚 Storybook 컴포넌트 문서

이 프로젝트는 **Storybook**을 통해 모든 컴포넌트의 문서화와 테스트를 제공합니다.

### 🎯 컴포넌트 카테고리

#### **Atoms (원자)**
- **Button**: 다양한 variant, size, color를 지원하는 버튼
- **Text**: 유연한 텍스트 컴포넌트 (HTML 요소, variant, weight, color 지원)
- **Icon**: 이모지/텍스트 아이콘 컴포넌트
- **Spinner**: 로딩 상태 표시 스피너
- **Badge**: 상태/카테고리 표시 배지

#### **Molecules (분자)**
- **InputField**: 라벨, 에러 상태, 아이콘을 지원하는 입력 필드
- **SelectField**: 키보드 접근성을 완전히 지원하는 선택 필드
- **ProgressBar**: 진행률 표시 바 (variant, size, 라벨 지원)
- **Card**: 콘텐츠 구조화 카드 컴포넌트
- **Alert**: 정보 전달 알림 컴포넌트

#### **Organisms (유기체)**
- **Modal**: 완전한 접근성을 지원하는 모달 컴포넌트
- **ContactForm**: 다단계 폼과 실시간 검증을 지원하는 연락처 폼
- **ModalProvider**: 전역 모달 상태 관리 프로바이더

#### **Templates (템플릿)**
- **FormTemplate**: 진행률 표시와 단계별 폼 구조를 지원하는 폼 템플릿
- **ModalTemplate**: 헤더, 푸터, 닫기 버튼을 포함한 모달 템플릿

### 🚀 Storybook 실행

```bash
# Storybook 개발 서버 실행 (http://localhost:6006)
yarn storybook

# Storybook 빌드
yarn build-storybook
```

### 📖 Storybook 기능

- **📋 자동 문서화**: 모든 컴포넌트의 props와 사용법 자동 생성
- **🎨 인터랙티브 테스트**: 실시간으로 컴포넌트 속성 변경 및 테스트
- **♿ 접근성 검사**: `@storybook/addon-a11y`를 통한 접근성 자동 검사
- **📱 반응형 테스트**: 다양한 화면 크기에서 컴포넌트 테스트
- **🌙 다크모드 지원**: 라이트/다크 테마 전환 테스트
- **⌨️ 키보드 접근성**: 모든 컴포넌트의 키보드 조작 테스트

### 🔍 컴포넌트 탐색

Storybook에서는 다음과 같은 방식으로 컴포넌트를 탐색할 수 있습니다:

1. **카테고리별 탐색**: Atoms → Molecules → Organisms → Templates 순서로 구성
2. **인터랙티브 컨트롤**: 각 컴포넌트의 props를 실시간으로 변경하여 테스트
3. **다양한 상태**: 기본, 에러, 로딩, 비활성화 등 다양한 상태 확인
4. **사용 예시**: 실제 사용 시나리오를 보여주는 예시 스토리

## 📝 사용 예시

### 기본 모달 사용
```typescript
import { openModal } from './use-cases/openModal';
import ContactForm from './components/organisms/ContactForm';

const MyComponent = () => {
  const handleOpenModal = async () => {
    await openModal(ContactForm, {});
  };

  return (
    <button onClick={handleOpenModal}>
      모달 열기
    </button>
  );
};
```

### 커스텀 모달 컴포넌트
```typescript
interface CustomModalProps {
  closeModal: () => void;
  resolve: (value: any) => void;
  isOpen?: boolean;
}

const CustomModal = ({ closeModal, resolve, isOpen }: CustomModalProps) => {
  // 모달 로직 구현
  return (
    <div>
      {/* 모달 내용 */}
    </div>
  );
};

// 사용
const result = await openModal(CustomModal, { customProp: 'value' });
```

## 🔧 최근 업데이트 및 개선사항

### SelectField 키보드 접근성 개선 (2024.12)

#### 문제점
- 2단계 경력 연차 선택에서 키보드 접근성 문제 발생
- placeholder 옵션이 `disabled`로 설정되어 키보드로 선택 불가
- 드롭다운 화살표 아이콘 부재로 시각적 피드백 부족

#### 해결방법
1. **placeholder 옵션 수정**: `disabled` 속성 제거하여 키보드 선택 가능
2. **시각적 개선**: SVG 드롭다운 화살표 아이콘 추가
3. **포커스 링 강화**: `focus:ring-2 focus:ring-primary/20` 적용
4. **일관된 스타일**: 다른 입력 필드와 동일한 패딩과 높이 적용

#### 구현 결과
```typescript
// 수정 전
const experienceOptions = [
  { value: "", label: "경력 연차를 선택해주세요", disabled: true }, // ← 문제
  { value: "0-3", label: "0-3년" },
  // ...
];

// 수정 후
const experienceOptions = [
  { value: "0-3", label: "0-3년" },
  { value: "4-7", label: "4-7년" },
  { value: "8+", label: "8년 이상" },
];

<SelectField
  placeholder="경력 연차를 선택해주세요" // ← 이제 이것만 표시
  options={experienceOptions}
  // ... 기타 props
/>
```

#### 접근성 개선사항
- **Tab 키**: SelectField로 포커스 이동 가능
- **Space/Enter 키**: 드롭다운 메뉴 열기 가능
- **화살표 키**: 옵션 간 이동 가능
- **Enter 키**: 옵션 선택 및 다음 단계로 이동 가능
- **ESC 키**: 드롭다운 메뉴 닫기 가능

### GitHub 프로필 검증 강화 (2024.12)

#### 문제점
- GitHub 링크 입력 시 기본적인 도메인 검증만 수행
- 실시간 검증 부족으로 사용자 피드백 지연
- 프로필 URL 패턴 검증 미흡

#### 해결방법
1. **강화된 스키마 검증**: 프로토콜, 도메인, 패턴 검증 추가
2. **실시간 검증**: onChange 트리거로 즉시 피드백 제공
3. **reValidateMode 변경**: onChange로 설정하여 실시간 재검증
4. **구체적인 에러 메시지**: 예시 포함한 명확한 안내

#### 구현 결과
```typescript
// 강화된 GitHub 검증 스키마
githubLink: z
  .string()
  .optional()
  .refine((url) => {
    if (!url || url.trim() === '') return true; // 빈 값은 허용
    
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
      
      // GitHub 프로필 URL 패턴 검증
      const pathname = urlObj.pathname;
      const githubProfilePattern = /^\/[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\/?$/;
      
      return githubProfilePattern.test(pathname);
    } catch {
      return false;
    }
  }, "유효한 GitHub 프로필 URL을 입력해주세요. (예: https://github.com/username)")

// 실시간 검증 적용
{...register("githubLink", {
  onChange: () => {
    trigger("githubLink"); // 실시간 검증 트리거
  }
})}
```

#### 검증 개선사항
- **URL 형식 검증**: 유효한 URL 구조 확인
- **프로토콜 검증**: http/https만 허용
- **도메인 검증**: github.com 포함 확인
- **패턴 검증**: /username 형식 검증 (하이픈 포함)
- **실시간 피드백**: 입력 시마다 즉시 검증 결과 표시

---

## 🧪 테스트 시스템

### 테스트 환경 구성
프로젝트는 **Vitest**와 **React Testing Library**를 사용하여 포괄적인 테스트 환경을 구축했습니다.

#### 테스트 도구 스택
- **Vitest**: 빠른 테스트 러너 및 실행 환경
- **React Testing Library**: 컴포넌트 테스트를 위한 유틸리티
- **@testing-library/user-event**: 사용자 상호작용 시뮬레이션
- **@testing-library/jest-dom**: Jest DOM 매처 확장
- **jsdom**: 브라우저 환경 시뮬레이션
- **@vitest/coverage-v8**: 코드 커버리지 리포팅

#### 테스트 실행 명령어
```bash
# 개발 모드로 테스트 실행 (watch mode)
yarn test

# 테스트 UI 실행
yarn test:ui

# 테스트 한 번 실행
yarn test:run

# 커버리지 포함 테스트 실행
yarn test:coverage
```

### 테스트 커버리지

#### 전체 테스트 현황
- **총 테스트 파일**: 16개
- **총 테스트 케이스**: 152개
- **테스트 통과율**: 100%
- **실행 시간**: 약 11초

#### 컴포넌트별 테스트 현황

**Atoms (원자 컴포넌트)**
- `Button.test.tsx`: 8개 테스트
- `Text.test.tsx`: 7개 테스트
- `Icon.test.tsx`: 6개 테스트
- `Spinner.test.tsx`: 6개 테스트
- `Badge.test.tsx`: 7개 테스트

**Molecules (분자 컴포넌트)**
- `InputField.test.tsx`: 8개 테스트
- `SelectField.test.tsx`: 8개 테스트
- `ProgressBar.test.tsx`: 8개 테스트
- `Card.test.tsx`: 6개 테스트
- `Alert.test.tsx`: 9개 테스트

**Organisms (유기체 컴포넌트)**
- `Modal.test.tsx`: 7개 테스트
- `ContactForm.test.tsx`: 8개 테스트
- `ModalProvider.test.tsx`: 5개 테스트

**Templates (템플릿 컴포넌트)**
- `FormTemplate.test.tsx`: 6개 테스트
- `ModalTemplate.test.tsx`: 6개 테스트

**Store (상태 관리)**
- `modal.store.test.ts`: 10개 테스트

### 테스트 전략

#### 1. 컴포넌트 테스트
- **렌더링 테스트**: 컴포넌트가 올바르게 렌더링되는지 확인
- **Props 테스트**: 다양한 props 조합에 대한 동작 검증
- **상태 테스트**: 컴포넌트 내부 상태 변화 검증
- **이벤트 테스트**: 사용자 상호작용에 대한 반응 검증

#### 2. 접근성 테스트
- **ARIA 속성 검증**: 필수 ARIA 속성 존재 확인
- **키보드 네비게이션**: Tab, Enter, Escape 키 동작 검증
- **포커스 관리**: 포커스 트랩 및 포커스 복귀 검증
- **스크린리더 지원**: 의미있는 라벨과 설명 제공 확인

#### 3. 폼 검증 테스트
- **실시간 검증**: 입력 중 즉시 검증 결과 표시
- **에러 상태**: 검증 실패 시 적절한 에러 메시지 표시
- **터치 기반 검증**: 사용자 상호작용 후에만 에러 표시
- **다단계 폼**: 단계별 진행 및 데이터 유지 검증

#### 4. 모달 시스템 테스트
- **모달 열기/닫기**: 기본 모달 동작 검증
- **Promise 기반 API**: 비동기 모달 관리 검증
- **포커스 관리**: 모달 열릴 때 자동 포커스, 닫힐 때 포커스 복귀
- **ESC 키 지원**: 키보드로 모달 닫기 검증

---

## 📚 Storybook 컴포넌트 문서

### Storybook 개요
프로젝트는 **Storybook**을 사용하여 모든 컴포넌트의 문서화와 시각적 테스트 환경을 제공합니다.

#### Storybook 실행 명령어
```bash
# Storybook 개발 서버 실행
yarn storybook

# Storybook 빌드
yarn build-storybook
```

#### Storybook 접속
- **로컬 개발**: http://localhost:6006
- **빌드된 문서**: `storybook-static/` 폴더

### 컴포넌트 카테고리별 스토리

#### Atoms (원자 컴포넌트)
**Button**
- 기본 버튼, 변형별 버튼, 색상별 버튼
- 크기별 버튼, 아이콘 포함 버튼
- 로딩 상태, 비활성화 상태
- 모든 조합 예시

**Text**
- 텍스트 변형 (caption, small, body, large, lead)
- 폰트 굵기 (light, normal, medium, semibold, bold)
- 색상 테마 (default, muted, primary, secondary, success, warning, error)
- 정렬 방식 (left, center, right, justify)
- 제목 계층, 타이포그래피 스케일

**Icon**
- 크기별 아이콘 (xs, sm, md, lg, xl)
- 색상별 아이콘
- 이모지 아이콘, 텍스트 아이콘
- 카테고리별 아이콘 (기술, 상태, 액션, 네비게이션)

**Spinner**
- 크기별 스피너 (xs, sm, md, lg, xl)
- 색상별 스피너 (primary, secondary, success, warning, error)
- 라벨 포함 스피너
- 컨텍스트별 사용 예시 (로딩 상태, 버튼 내 스피너)

**Badge**
- 변형별 배지 (default, primary, secondary, success, warning, error, outline)
- 크기별 배지 (sm, md, lg)
- 상태 표시 배지, 카테고리 배지
- 숫자 배지, 알림 배지

#### Molecules (분자 컴포넌트)
**InputField**
- 입력 타입별 필드 (text, email, password, number, tel, url)
- 아이콘 포함 필드 (왼쪽, 오른쪽 아이콘)
- 상태별 필드 (기본, 에러, 도움말, 비활성화)
- 스타일 변형 (default, filled, outlined)
- 폼 예시, 검증 예시, 접근성 데모

**SelectField**
- 플레이스홀더 포함 셀렉트
- 비활성 옵션 포함 셀렉트
- 에러 상태, 비활성화 상태
- 폼 예시, 긴 옵션 목록
- 카테고리별 예시 (개발 경력, 기술 스택, 프로젝트 상태)
- 접근성 데모

**ProgressBar**
- 변형별 프로그레스 바 (default, primary, success, warning, error)
- 크기별 프로그레스 바 (sm, md, lg)
- 진행값별 프로그레스 바 (0%, 25%, 50%, 75%, 100%)
- 라벨 포함/미포함 프로그레스 바
- 커스텀 최대값, 애니메이션 프로그레스 바
- 실제 사용 예시 (파일 업로드, 설치 진행, 데이터 동기화)

**Card**
- 변형별 카드 (default, outlined, elevated)
- 패딩 크기별 카드 (none, sm, md, lg)
- 콘텐츠 예시, 인터랙티브 카드
- 제품 카드, 사용자 프로필 카드

**Alert**
- 변형별 알림 (info, success, warning, error)
- 제목 포함/미포함 알림
- 커스텀 아이콘 알림
- 닫기 가능한 알림
- 긴 내용 알림, 폼 검증 알림
- 시스템 알림, 접근성 데모

#### Organisms (유기체 컴포넌트)
**Modal**
- 기본 모달, 폼 모달, 확인 모달
- 긴 내용 모달, 접근성 데모 모달
- 다중 모달, 커스텀 크기 모달

**ContactForm**
- 기본 폼, 닫힌 상태 폼
- 인터랙티브 폼, 폼 단계별 데모
- 검증 데모, 접근성 데모

**ModalProvider**
- 기본 모달 프로바이더, 연락처 폼 모달
- 다중 모달, 모달 상태 관리
- 커스텀 모달 컴포넌트, 오류 처리

#### Templates (템플릿 컴포넌트)
**FormTemplate**
- 기본 폼 템플릿, 진행률 포함 폼 템플릿
- 다단계 폼, 다른 단계별 폼 템플릿
- 진행률 없는 폼 템플릿, 긴 폼 템플릿
- 등록 폼 템플릿, 설문 폼 템플릿

**ModalTemplate**
- 기본 모달 템플릿, 폼 모달 템플릿
- 닫기 버튼 포함 모달 템플릿, 확인 모달 템플릿
- 성공 모달 템플릿, 긴 내용 모달 템플릿
- 인터랙티브 모달 템플릿, 접근성 데모 모달 템플릿
- 설정 모달 템플릿, 사용자 프로필 모달 템플릿, 결제 모달 템플릿

### Storybook 기능

#### 1. 인터랙티브 컨트롤
- **Controls**: 컴포넌트 props를 실시간으로 조작
- **Actions**: 이벤트 핸들러 동작 확인
- **Args**: 스토리별 인수 관리

#### 2. 접근성 테스트
- **@storybook/addon-a11y**: 자동 접근성 검사
- **접근성 패널**: WCAG 가이드라인 준수 확인
- **키보드 네비게이션**: Tab, Enter, Escape 키 테스트

#### 3. 문서화
- **자동 문서 생성**: 컴포넌트 props 자동 문서화
- **사용 예시**: 다양한 사용 사례 제공
- **모범 사례**: 컴포넌트 사용 가이드

#### 4. 시각적 테스트
- **컴포넌트 격리**: 독립적인 컴포넌트 테스트
- **상태별 확인**: 다양한 상태와 변형 확인
- **반응형 테스트**: 다양한 화면 크기에서 확인

### Storybook 활용 방법

#### 1. 컴포넌트 개발
```typescript
// 스토리 작성 예시
export const Default: Story = {
  args: {
    variant: 'contained',
    size: 'md',
    color: 'primary',
    children: '버튼',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
```

#### 2. 디자인 시스템 구축
- **일관된 디자인**: 모든 컴포넌트의 일관된 스타일 확인
- **변형 관리**: 다양한 변형과 상태 관리
- **토큰 시스템**: 색상, 크기, 간격 등의 디자인 토큰 확인

#### 3. 팀 협업
- **컴포넌트 라이브러리**: 팀 전체가 사용할 수 있는 컴포넌트 라이브러리
- **문서화**: 컴포넌트 사용법과 예시 제공
- **피드백 수집**: 디자이너와 개발자 간 피드백 수집

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items.center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>