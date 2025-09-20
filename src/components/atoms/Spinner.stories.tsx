import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로딩 상태를 표시하는 스피너 컴포넌트입니다. 다양한 size와 color 옵션을 지원하며, 접근성을 고려한 라벨을 제공합니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '스피너 크기',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: '스피너 색상',
    },
    label: {
      control: { type: 'text' },
      description: '스크린리더용 라벨',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Spinner size="xs" />
        <p className="mt-2 text-sm text-gray-600">Extra Small</p>
      </div>
      <div className="text-center">
        <Spinner size="sm" />
        <p className="mt-2 text-sm text-gray-600">Small</p>
      </div>
      <div className="text-center">
        <Spinner size="md" />
        <p className="mt-2 text-sm text-gray-600">Medium</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-2 text-sm text-gray-600">Large</p>
      </div>
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-2 text-sm text-gray-600">Extra Large</p>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Spinner color="primary" size="lg" />
        <p className="mt-2 text-sm text-gray-600">Primary</p>
      </div>
      <div className="text-center">
        <Spinner color="secondary" size="lg" />
        <p className="mt-2 text-sm text-gray-600">Secondary</p>
      </div>
      <div className="text-center">
        <Spinner color="success" size="lg" />
        <p className="mt-2 text-sm text-gray-600">Success</p>
      </div>
      <div className="text-center">
        <Spinner color="warning" size="lg" />
        <p className="mt-2 text-sm text-gray-600">Warning</p>
      </div>
      <div className="text-center">
        <Spinner color="error" size="lg" />
        <p className="mt-2 text-sm text-gray-600">Error</p>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center">
        <Spinner size="lg" label="데이터를 불러오는 중..." />
        <p className="mt-2 text-sm text-gray-600">데이터 로딩</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" label="파일을 업로드하는 중..." />
        <p className="mt-2 text-sm text-gray-600">파일 업로드</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" label="처리 중..." />
        <p className="mt-2 text-sm text-gray-600">일반 처리</p>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-center space-x-4">
        <Spinner size="md" color="primary" label="처리 중..." />
        <span className="text-gray-700">작업을 처리하고 있습니다...</span>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-white border rounded-lg">
        <div className="flex items-center space-x-3">
          <Spinner size="sm" color="primary" />
          <span className="text-sm text-gray-600">페이지 로딩 중...</span>
        </div>
      </div>
      
      <div className="p-4 bg-white border rounded-lg">
        <div className="flex items-center space-x-3">
          <Spinner size="sm" color="success" />
          <span className="text-sm text-gray-600">데이터 저장 중...</span>
        </div>
      </div>
      
      <div className="p-4 bg-white border rounded-lg">
        <div className="flex items-center space-x-3">
          <Spinner size="sm" color="warning" />
          <span className="text-sm text-gray-600">파일 업로드 중...</span>
        </div>
      </div>
      
      <div className="p-4 bg-white border rounded-lg">
        <div className="flex items-center space-x-3">
          <Spinner size="sm" color="error" />
          <span className="text-sm text-gray-600">오류 복구 중...</span>
        </div>
      </div>
    </div>
  ),
};

export const ButtonWithSpinner: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Spinner size="xs" color="primary" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md opacity-75">
          로딩 중...
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Spinner size="sm" color="success" />
        <button className="px-4 py-2 bg-green-600 text-white rounded-md opacity-75">
          저장 중...
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Spinner size="sm" color="warning" />
        <button className="px-4 py-2 bg-yellow-600 text-white rounded-md opacity-75">
          업로드 중...
        </button>
      </div>
    </div>
  ),
};