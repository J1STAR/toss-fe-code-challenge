import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '상태나 카테고리를 표시하는 배지 컴포넌트입니다. 다양한 variant와 size 옵션을 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'outline'],
      description: '배지 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '배지 크기',
    },
    children: {
      control: { type: 'text' },
      description: '배지 텍스트',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">완료</Badge>
      <Badge variant="warning">진행중</Badge>
      <Badge variant="error">오류</Badge>
      <Badge variant="primary">새로운</Badge>
      <Badge variant="secondary">대기중</Badge>
    </div>
  ),
};

export const CategoryBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="primary">React</Badge>
      <Badge variant="primary">TypeScript</Badge>
      <Badge variant="primary">Tailwind</Badge>
      <Badge variant="outline">JavaScript</Badge>
      <Badge variant="outline">CSS</Badge>
      <Badge variant="outline">HTML</Badge>
    </div>
  ),
};

export const NumberBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="error">99+</Badge>
      <Badge variant="warning">5</Badge>
      <Badge variant="success">✓</Badge>
      <Badge variant="primary">NEW</Badge>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: '클릭 가능',
    onClick: () => alert('배지가 클릭되었습니다!'),
    className: 'cursor-pointer hover:opacity-80',
  },
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">알림 배지</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="error" size="sm">3</Badge>
          <Badge variant="warning" size="sm">12</Badge>
          <Badge variant="success" size="sm">✓</Badge>
          <Badge variant="primary" size="sm">NEW</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">상태 표시</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="success">온라인</Badge>
          <Badge variant="warning">자리비움</Badge>
          <Badge variant="error">오프라인</Badge>
          <Badge variant="secondary">대기중</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">우선순위</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="error">긴급</Badge>
          <Badge variant="warning">높음</Badge>
          <Badge variant="primary">보통</Badge>
          <Badge variant="secondary">낮음</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">진행 상태</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="success">완료</Badge>
          <Badge variant="warning">진행중</Badge>
          <Badge variant="primary">시작</Badge>
          <Badge variant="secondary">대기</Badge>
          <Badge variant="error">중단</Badge>
        </div>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span className="font-medium">사용자 이름</span>
        </div>
        <Badge variant="success">온라인</Badge>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <span className="font-medium">프로젝트 관리자</span>
        </div>
        <Badge variant="primary">관리자</Badge>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
          <span className="font-medium">일반 사용자</span>
        </div>
        <Badge variant="secondary">사용자</Badge>
      </div>
    </div>
  ),
};