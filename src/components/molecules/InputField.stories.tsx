import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Molecules/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '재사용 가능한 입력 필드 컴포넌트입니다. 라벨, 에러 상태, 아이콘, 도움말 텍스트를 지원하며 접근성을 고려했습니다.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: '입력 필드 라벨',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: '입력 필드 타입',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    error: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
    touched: {
      control: { type: 'boolean' },
      description: '터치 상태 (에러 표시 여부)',
    },
    helperText: {
      control: { type: 'text' },
      description: '도움말 텍스트',
    },
    leftIcon: {
      control: { type: 'text' },
      description: '왼쪽 아이콘',
    },
    rightIcon: {
      control: { type: 'text' },
      description: '오른쪽 아이콘',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
      description: '입력 필드 스타일 변형',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="텍스트" type="text" placeholder="텍스트를 입력하세요" />
      <InputField label="이메일" type="email" placeholder="이메일을 입력하세요" />
      <InputField label="비밀번호" type="password" placeholder="비밀번호를 입력하세요" />
      <InputField label="전화번호" type="tel" placeholder="전화번호를 입력하세요" />
      <InputField label="URL" type="url" placeholder="URL을 입력하세요" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="사용자명" leftIcon="👤" placeholder="사용자명을 입력하세요" />
      <InputField label="이메일" leftIcon="📧" placeholder="이메일을 입력하세요" />
      <InputField label="비밀번호" leftIcon="🔒" rightIcon="👁️" type="password" placeholder="비밀번호를 입력하세요" />
      <InputField label="검색" leftIcon="🔍" placeholder="검색어를 입력하세요" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="기본 상태" placeholder="기본 상태입니다" />
      <InputField label="에러 상태" placeholder="에러가 있습니다" error="이 필드는 필수입니다" touched />
      <InputField label="도움말" placeholder="도움말이 있습니다" helperText="이 필드에 대한 도움말입니다" />
      <InputField label="비활성화" placeholder="비활성화된 상태입니다" disabled />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="기본 스타일" variant="default" placeholder="기본 스타일입니다" />
      <InputField label="채워진 스타일" variant="filled" placeholder="채워진 스타일입니다" />
      <InputField label="테두리 스타일" variant="outlined" placeholder="테두리 스타일입니다" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <InputField label="이름" type="text" placeholder="홍길동" required />
      <InputField label="이메일" type="email" placeholder="example@email.com" required />
      <InputField label="전화번호" type="tel" placeholder="010-1234-5678" />
      <InputField label="웹사이트" type="url" placeholder="https://example.com" />
    </form>
  ),
};

export const ValidationExamples: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-lg font-semibold mb-4">유효성 검사 예시</h3>
        <div className="space-y-4">
          <InputField 
            label="이메일" 
            type="email" 
            placeholder="올바른 이메일을 입력하세요"
            helperText="유효한 이메일 주소를 입력해주세요"
          />
          <InputField 
            label="비밀번호" 
            type="password" 
            placeholder="비밀번호를 입력하세요"
            helperText="최소 8자 이상, 영문, 숫자, 특수문자 포함"
          />
          <InputField 
            label="전화번호" 
            type="tel" 
            placeholder="010-1234-5678"
            helperText="하이픈(-)을 포함하여 입력해주세요"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">에러 상태 예시</h3>
        <div className="space-y-4">
          <InputField 
            label="이메일" 
            type="email" 
            placeholder="잘못된 이메일"
            error="올바른 이메일 형식이 아닙니다"
            touched
          />
          <InputField 
            label="비밀번호" 
            type="password" 
            placeholder="너무 짧은 비밀번호"
            error="비밀번호는 최소 8자 이상이어야 합니다"
            touched
          />
          <InputField 
            label="전화번호" 
            type="tel" 
            placeholder="잘못된 형식"
            error="올바른 전화번호 형식이 아닙니다"
            touched
          />
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField 
        label="접근성 테스트 필드" 
        placeholder="스크린리더로 테스트해보세요"
        helperText="이 필드는 접근성을 고려하여 설계되었습니다"
        leftIcon="♿"
      />
      <InputField 
        label="키보드 전용 필드" 
        placeholder="Tab 키로 이동해보세요"
        helperText="키보드만으로도 완전히 조작 가능합니다"
        rightIcon="⌨️"
      />
    </div>
  ),
};