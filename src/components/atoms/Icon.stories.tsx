import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '재사용 가능한 아이콘 컴포넌트입니다. 이모지나 텍스트 아이콘을 표시하며, 다양한 size와 color 옵션을 지원합니다.',
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      description: '아이콘 이름 (이모지 또는 텍스트)',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '아이콘 크기',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'muted'],
      description: '아이콘 색상',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '⭐',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="⭐" size="xs" />
      <Icon name="⭐" size="sm" />
      <Icon name="⭐" size="md" />
      <Icon name="⭐" size="lg" />
      <Icon name="⭐" size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="🎯" color="default" />
      <Icon name="🎯" color="primary" />
      <Icon name="🎯" color="secondary" />
      <Icon name="🎯" color="success" />
      <Icon name="🎯" color="warning" />
      <Icon name="🎯" color="error" />
      <Icon name="🎯" color="muted" />
    </div>
  ),
};

export const EmojiIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Icon name="🚀" size="lg" />
      <Icon name="💡" size="lg" />
      <Icon name="🎨" size="lg" />
      <Icon name="⚡" size="lg" />
      <Icon name="🔧" size="lg" />
      <Icon name="📱" size="lg" />
      <Icon name="⌨️" size="lg" />
      <Icon name="🎯" size="lg" />
    </div>
  ),
};

export const TextIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Icon name="✓" size="lg" color="success" />
      <Icon name="✕" size="lg" color="error" />
      <Icon name="!" size="lg" color="warning" />
      <Icon name="?" size="lg" color="primary" />
      <Icon name="→" size="lg" color="secondary" />
      <Icon name="←" size="lg" color="secondary" />
      <Icon name="↑" size="lg" color="secondary" />
      <Icon name="↓" size="lg" color="secondary" />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    name: '❤️',
    size: 'lg',
    onClick: () => alert('아이콘이 클릭되었습니다!'),
    className: 'cursor-pointer hover:scale-110 transition-transform',
  },
};

export const CategoryIcons: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">기술 아이콘</h3>
        <div className="flex flex-wrap gap-4">
          <Icon name="💻" size="lg" />
          <Icon name="🌐" size="lg" />
          <Icon name="📊" size="lg" />
          <Icon name="🔐" size="lg" />
          <Icon name="⚙️" size="lg" />
          <Icon name="🔧" size="lg" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">상태 아이콘</h3>
        <div className="flex flex-wrap gap-4">
          <Icon name="✅" size="lg" color="success" />
          <Icon name="❌" size="lg" color="error" />
          <Icon name="⚠️" size="lg" color="warning" />
          <Icon name="ℹ️" size="lg" color="primary" />
          <Icon name="⏳" size="lg" color="muted" />
          <Icon name="🔄" size="lg" color="secondary" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">액션 아이콘</h3>
        <div className="flex flex-wrap gap-4">
          <Icon name="➕" size="lg" color="success" />
          <Icon name="➖" size="lg" color="error" />
          <Icon name="✏️" size="lg" color="primary" />
          <Icon name="🗑️" size="lg" color="error" />
          <Icon name="📁" size="lg" color="secondary" />
          <Icon name="📄" size="lg" color="secondary" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">네비게이션 아이콘</h3>
        <div className="flex flex-wrap gap-4">
          <Icon name="🏠" size="lg" />
          <Icon name="👤" size="lg" />
          <Icon name="⚙️" size="lg" />
          <Icon name="📧" size="lg" />
          <Icon name="🔔" size="lg" />
          <Icon name="🔍" size="lg" />
        </div>
      </div>
    </div>
  ),
};