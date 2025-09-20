import React from "react";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";
import { Card } from "../molecules/Card";
import ContactForm from "../organisms/ContactForm";
import { openModal } from "../../use-cases/openModal";

const HomePage = () => {
  const handleOpenModal = async () => {
    try {
      await openModal(ContactForm, {});
    } catch (error) {
      console.error("모달 오류:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only">
        <a 
          href="#main-content" 
          className="absolute top-4 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          메인 콘텐츠로 건너뛰기
        </a>
        <a 
          href="#features" 
          className="absolute top-4 left-48 z-50 bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          기능 섹션으로 건너뛰기
        </a>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <Text as="h1" variant="large" weight="bold">
                접근성 모달 가이드
              </Text>
            </div>
            <Button onClick={handleOpenModal} size="lg">
              신청 폼 작성하기
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-12" role="main">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <section className="mb-16 text-center" aria-labelledby="hero-title">
            <Text as="h1" id="hero-title" variant="large" weight="bold" className="mb-6 text-5xl tracking-tight">
              현대적인 웹 접근성의
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}새로운 표준
              </span>
            </Text>
            <Text variant="large" color="muted" className="mb-8">
              React와 TypeScript로 구현된 접근성을 고려한 모달 컴포넌트의 모든 것을 알아보세요.
            </Text>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={handleOpenModal} size="xl">
                🚀 신청 폼 작성하기
              </Button>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" className="mb-20" aria-labelledby="features-title">
            <Text as="h2" id="features-title" variant="large" weight="bold" className="mb-12 text-center text-3xl">
              핵심 기능
            </Text>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group p-8 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 text-4xl" aria-hidden="true">🎯</div>
                <Text as="h3" variant="large" weight="semibold" className="mb-3">
                  완벽한 접근성
                </Text>
                <Text color="muted">
                  ARIA 속성, 포커스 관리, 스크린리더 지원으로 모든 사용자가 쉽게 사용할 수 있습니다.
                </Text>
              </Card>
              <Card className="group p-8 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 text-4xl" aria-hidden="true">⌨️</div>
                <Text as="h3" variant="large" weight="semibold" className="mb-3">
                  키보드 조작
                </Text>
                <Text color="muted">
                  ESC로 닫기, Tab으로 이동, 포커스 트랩으로 마우스 없이도 완전한 조작이 가능합니다.
                </Text>
              </Card>
              <Card className="group p-8 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 text-4xl" aria-hidden="true">📱</div>
                <Text as="h3" variant="large" weight="semibold" className="mb-3">
                  반응형 디자인
                </Text>
                <Text color="muted">
                  모바일부터 데스크톱까지 모든 화면 크기에서 완벽하게 작동합니다.
                </Text>
              </Card>
              <Card className="group p-8 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 text-4xl" aria-hidden="true">🎨</div>
                <Text as="h3" variant="large" weight="semibold" className="mb-3">
                  현대적 UI
                </Text>
                <Text color="muted">
                  Tailwind CSS와 부드러운 애니메이션으로 아름다운 사용자 경험을 제공합니다.
                </Text>
              </Card>
              <Card className="group p-8 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 text-4xl" aria-hidden="true">⚡</div>
                <Text as="h3" variant="large" weight="semibold" className="mb-3">
                  성능 최적화
                </Text>
                <Text color="muted">
                  불필요한 리렌더링을 방지하고 최적화된 코드로 빠른 성능을 보장합니다.
                </Text>
              </Card>
              <Card className="group p-8 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 text-4xl" aria-hidden="true">🔧</div>
                <Text as="h3" variant="large" weight="semibold" className="mb-3">
                  개발자 친화적
                </Text>
                <Text color="muted">
                  TypeScript로 타입 안정성을 보장하고 재사용 가능한 컴포넌트 구조를 제공합니다.
                </Text>
              </Card>
            </div>
          </section>

          {/* Detailed Guide */}
          <section className="mb-20" aria-labelledby="guide-title">
            <Text as="h2" id="guide-title" variant="large" weight="bold" className="mb-12 text-center text-3xl">
              구현 가이드
            </Text>
            <div className="space-y-12">
              <Card className="p-8 shadow-lg">
                <Text as="h3" variant="large" weight="semibold" className="mb-4 text-2xl">
                  🎯 접근성 구현
                </Text>
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  <Text color="muted" className="mb-4">
                    웹 접근성은 모든 사용자가 웹사이트를 효과적으로 사용할 수 있도록 하는 중요한 요소입니다. 
                    우리의 모달 컴포넌트는 다음과 같은 접근성 기능을 포함합니다:
                  </Text>
                  <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
                    <li>• <strong>ARIA 속성:</strong> <code>aria-modal</code>, <code>aria-labelledby</code>, <code>aria-describedby</code>로 스크린리더 지원</li>
                    <li>• <strong>포커스 관리:</strong> 모달 열릴 때 자동 포커스, 닫힐 때 원래 위치로 복귀</li>
                    <li>• <strong>포커스 트랩:</strong> Tab 키로 모달 내 요소들 간 순환, 모달 밖으로 포커스 이동 방지</li>
                    <li>• <strong>키보드 조작:</strong> ESC 키로 모달 닫기, 모든 기능을 키보드만으로 조작 가능</li>
                    <li>• <strong>스크린리더 지원:</strong> 실시간 오류 메시지 알림, 의미있는 라벨 제공</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 shadow-lg">
                <Text as="h3" variant="large" weight="semibold" className="mb-4 text-2xl">
                  🎨 사용자 경험 설계
                </Text>
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  <Text color="muted" className="mb-4">
                    좋은 사용자 경험은 직관적이고 일관된 인터페이스에서 시작됩니다. 
                    우리는 다음과 같은 UX 원칙을 적용했습니다:
                  </Text>
                  <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
                    <li>• <strong>직관적 인터랙션:</strong> 사용자가 예상하는 방식으로 동작하는 인터페이스</li>
                    <li>• <strong>시각적 피드백:</strong> 로딩 상태, 호버 효과, 포커스 표시로 명확한 피드백</li>
                    <li>• <strong>일관된 디자인:</strong> 전체 애플리케이션에서 통일된 디자인 언어</li>
                    <li>• <strong>반응형 레이아웃:</strong> 모든 기기에서 최적화된 경험</li>
                    <li>• <strong>애니메이션:</strong> 부드럽고 의미있는 전환 효과</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 shadow-lg">
                <Text as="h3" variant="large" weight="semibold" className="mb-4 text-2xl">
                  ⚡ 성능 최적화
                </Text>
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  <Text color="muted" className="mb-4">
                    빠른 로딩과 부드러운 애니메이션은 사용자 경험의 핵심입니다. 
                    다음과 같은 최적화 기법을 적용했습니다:
                  </Text>
                  <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
                    <li>• <strong>React 최적화:</strong> useCallback, useMemo를 활용한 불필요한 리렌더링 방지</li>
                    <li>• <strong>조건부 렌더링:</strong> 모달이 닫혀있을 때는 DOM에 렌더링하지 않음</li>
                    <li>• <strong>이벤트 최적화:</strong> 적절한 이벤트 리스너 관리로 메모리 누수 방지</li>
                    <li>• <strong>CSS 최적화:</strong> Tailwind CSS의 유틸리티 클래스로 최적화된 스타일</li>
                    <li>• <strong>애니메이션 최적화:</strong> CSS transform과 opacity를 활용한 하드웨어 가속</li>
                  </ul>
                </div>
              </Card>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-20" aria-labelledby="examples-title">
            <Text as="h2" id="examples-title" variant="large" weight="bold" className="mb-12 text-center text-3xl">
              사용 예시
            </Text>
            <Card className="p-8 shadow-lg bg-slate-900 text-slate-100">
              <Text as="h3" variant="large" weight="semibold" className="mb-4 text-xl">
                기본 사용법
              </Text>
              <pre className="overflow-x-auto text-sm">
                <code>{`import { openModal } from './use-cases/openModal';
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
};`}</code>
              </pre>
            </Card>
          </section>

          {/* Keyboard Shortcuts */}
          <section className="mb-20" aria-labelledby="shortcuts-title">
            <Text as="h2" id="shortcuts-title" variant="large" weight="bold" className="mb-12 text-center text-3xl">
              키보드 단축키
            </Text>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6 shadow-lg">
                <Text as="h3" variant="large" weight="semibold" className="mb-4 text-lg">
                  모달 조작
                </Text>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Text color="muted">모달 닫기</Text>
                    <kbd className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">ESC</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text color="muted">다음 요소로 이동</Text>
                    <kbd className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">Tab</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text color="muted">이전 요소로 이동</Text>
                    <kbd className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">Shift + Tab</kbd>
                  </div>
                </div>
              </Card>
              <Card className="p-6 shadow-lg">
                <Text as="h3" variant="large" weight="semibold" className="mb-4 text-lg">
                  폼 조작
                </Text>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Text color="muted">폼 제출</Text>
                    <kbd className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">Enter</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text color="muted">입력 필드 포커스</Text>
                    <kbd className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">Tab</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text color="muted">버튼 활성화</Text>
                    <kbd className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">Space</kbd>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center" aria-labelledby="cta-title">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-white">
              <Text as="h2" id="cta-title" variant="large" weight="bold" className="mb-4 text-3xl">
                지금 바로 체험해보세요!
              </Text>
              <Text variant="large" className="mb-8 opacity-90">
                접근성을 고려한 모달의 모든 기능을 직접 경험해보세요.
              </Text>
              <Button 
                onClick={handleOpenModal} 
                variant="outlined"
                color="secondary"
                size="xl"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                🚀 신청 폼 작성하기
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80" role="contentinfo">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <Text variant="small">
              React + TypeScript + Tailwind CSS로 제작되었습니다.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
