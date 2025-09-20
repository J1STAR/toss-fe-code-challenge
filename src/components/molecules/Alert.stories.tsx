import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사용자에게 중요한 정보를 전달하는 알림 컴포넌트입니다. 다양한 variant와 아이콘을 지원하며 접근성을 고려했습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: '알림 타입',
    },
    title: {
      control: { type: 'text' },
      description: '알림 제목',
    },
    description: {
      control: { type: 'text' },
      description: '알림 설명',
    },
    icon: {
      control: { type: 'text' },
      description: '커스텀 아이콘 (기본 아이콘을 덮어씀)',
    },
    dismissible: {
      control: { type: 'boolean' },
      description: '닫기 버튼 표시 여부',
    },
    onDismiss: {
      action: 'dismissed',
      description: '닫기 버튼 클릭 핸들러',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: '기본 알림 메시지입니다.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert variant="info" title="정보" description="이것은 정보 알림입니다." />
      <Alert variant="success" title="성공" description="작업이 성공적으로 완료되었습니다." />
      <Alert variant="warning" title="경고" description="주의가 필요한 상황입니다." />
      <Alert variant="error" title="오류" description="오류가 발생했습니다." />
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert variant="info" title="업데이트 알림" description="새로운 기능이 추가되었습니다." />
      <Alert variant="success" title="저장 완료" description="파일이 성공적으로 저장되었습니다." />
      <Alert variant="warning" title="주의사항" description="이 작업은 되돌릴 수 없습니다." />
      <Alert variant="error" title="연결 실패" description="서버에 연결할 수 없습니다." />
    </div>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert variant="info" description="간단한 정보 메시지입니다." />
      <Alert variant="success" description="작업이 완료되었습니다." />
      <Alert variant="warning" description="주의가 필요합니다." />
      <Alert variant="error" description="오류가 발생했습니다." />
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert variant="info" title="커스텀 아이콘" description="사용자 정의 아이콘을 사용합니다." icon="💡" />
      <Alert variant="success" title="커스텀 아이콘" description="사용자 정의 아이콘을 사용합니다." icon="🎉" />
      <Alert variant="warning" title="커스텀 아이콘" description="사용자 정의 아이콘을 사용합니다." icon="⚠️" />
      <Alert variant="error" title="커스텀 아이콘" description="사용자 정의 아이콘을 사용합니다." icon="🚨" />
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert 
        variant="info" 
        title="닫을 수 있는 알림" 
        description="이 알림은 닫기 버튼이 있습니다." 
        dismissible 
        onDismiss={() => alert('알림이 닫혔습니다!')}
      />
      <Alert 
        variant="success" 
        title="성공 알림" 
        description="작업이 완료되었습니다." 
        dismissible 
        onDismiss={() => alert('성공 알림이 닫혔습니다!')}
      />
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert 
        variant="warning" 
        title="긴 내용의 알림" 
        description="이것은 매우 긴 설명을 포함하는 알림입니다. 여러 줄에 걸쳐 표시되며 사용자에게 중요한 정보를 전달합니다. 이런 종류의 알림은 사용자가 충분히 읽을 수 있도록 적절한 공간을 제공해야 합니다."
      />
    </div>
  ),
};

export const FormValidation: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert 
        variant="error" 
        title="입력 오류" 
        description="다음 필드에 오류가 있습니다: 이메일 형식이 올바르지 않습니다, 비밀번호는 최소 8자 이상이어야 합니다."
      />
      <Alert 
        variant="success" 
        title="검증 통과" 
        description="모든 필드가 올바르게 입력되었습니다."
      />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    variant: 'info',
    title: '인터랙티브 알림',
    description: '이 알림은 클릭할 수 있습니다.',
    onClick: () => alert('알림이 클릭되었습니다!'),
    className: 'cursor-pointer hover:opacity-80',
  },
};

export const SystemNotifications: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert 
        variant="info" 
        title="시스템 업데이트" 
        description="새로운 버전이 사용 가능합니다. 업데이트를 진행하시겠습니까?"
        icon="🔄"
      />
      <Alert 
        variant="success" 
        title="백업 완료" 
        description="데이터 백업이 성공적으로 완료되었습니다."
        icon="💾"
      />
      <Alert 
        variant="warning" 
        title="저장 공간 부족" 
        description="디스크 공간이 부족합니다. 불필요한 파일을 삭제해주세요."
        icon="💿"
      />
      <Alert 
        variant="error" 
        title="연결 오류" 
        description="네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요."
        icon="🌐"
      />
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Alert 
        variant="info" 
        title="접근성 정보" 
        description="이 알림은 스크린리더로 읽힙니다. role='alert' 속성을 사용하여 즉시 사용자에게 전달됩니다."
        icon="♿"
      />
      <Alert 
        variant="success" 
        title="키보드 접근성" 
        description="Tab 키로 포커스를 받을 수 있고, Enter 키로 상호작용할 수 있습니다."
        icon="⌨️"
      />
    </div>
  ),
};

export const RealWorldScenarios: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-lg font-semibold mb-4">사용자 액션 피드백</h3>
        <div className="space-y-4">
          <Alert variant="success" title="저장 완료" description="문서가 성공적으로 저장되었습니다." />
          <Alert variant="error" title="삭제 실패" description="파일을 삭제할 수 없습니다. 권한을 확인해주세요." />
          <Alert variant="warning" title="변경사항 있음" description="저장되지 않은 변경사항이 있습니다." />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">시스템 상태</h3>
        <div className="space-y-4">
          <Alert variant="info" title="유지보수 예정" description="시스템 유지보수가 내일 오전 2시에 예정되어 있습니다." />
          <Alert variant="warning" title="성능 저하" description="현재 시스템 성능이 저하되고 있습니다." />
          <Alert variant="error" title="서비스 중단" description="일부 서비스가 일시적으로 중단되었습니다." />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">보안 알림</h3>
        <div className="space-y-4">
          <Alert variant="warning" title="보안 경고" description="의심스러운 로그인 시도가 감지되었습니다." />
          <Alert variant="error" title="계정 잠금" description="너무 많은 로그인 시도로 계정이 잠겼습니다." />
          <Alert variant="success" title="보안 업데이트" description="보안 패치가 성공적으로 적용되었습니다." />
        </div>
      </div>
    </div>
  ),
};