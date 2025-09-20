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

#### ② 컴포넌트 모듈화: Atomic Design Pattern 적용
재사용 가능하고 확장 가능한 컴포넌트 구조를 위해 Atomic Design Pattern을 적용했습니다.

```
src/components/
├── atoms/           # Button (기본 UI 컴포넌트)
├── molecules/       # InputField (조합된 컴포넌트)
└── organisms/       # Modal, ContactForm, ModalProvider (복합 컴포넌트)
```

- **Atoms**: 재사용 가능한 기본 컴포넌트 (Button)
- **Molecules**: 여러 atoms를 조합한 기능적 컴포넌트 (InputField)
- **Organisms**: 완전한 기능을 가진 복합 컴포넌트 (Modal, ContactForm)

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
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('github.com');
      } catch {
        return false;
      }
    }, "유효한 GitHub 링크를 입력해주세요."),
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
        <select {...register("experience")} onKeyDown={handleKeyPress}>
          <option value="">경력 연차를 선택해주세요</option>
          <option value="0-3">0-3년</option>
          <option value="4-7">4-7년</option>
          <option value="8+">8년 이상</option>
        </select>
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

# 코드 검사 (포맷팅 및 린팅)
yarn check
```

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


---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items.center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>