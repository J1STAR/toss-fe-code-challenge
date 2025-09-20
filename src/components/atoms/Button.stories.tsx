import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '재사용 가능한 버튼 컴포넌트입니다. 다양한 variant, size, color 옵션을 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text', 'ghost'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼의 크기',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: '버튼의 색상 테마',
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태 표시',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    leftIcon: {
      control: { type: 'text' },
      description: '왼쪽 아이콘 (이모지 또는 텍스트)',
    },
    rightIcon: {
      control: { type: 'text' },
      description: '오른쪽 아이콘 (이모지 또는 텍스트)',
    },
    children: {
      control: { type: 'text' },
      description: '버튼 텍스트',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon="🚀">Launch</Button>
      <Button rightIcon="→">Next</Button>
      <Button leftIcon="💾" rightIcon="✓">Save</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: '로딩 중...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    children: '클릭하세요',
    onClick: () => alert('버튼이 클릭되었습니다!'),
  },
};

export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary 색상</h3>
        <div className="flex flex-wrap gap-4">
          <Button color="primary" variant="contained">Contained</Button>
          <Button color="primary" variant="outlined">Outlined</Button>
          <Button color="primary" variant="text">Text</Button>
          <Button color="primary" variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Success 색상</h3>
        <div className="flex flex-wrap gap-4">
          <Button color="success" variant="contained">Contained</Button>
          <Button color="success" variant="outlined">Outlined</Button>
          <Button color="success" variant="text">Text</Button>
          <Button color="success" variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Error 색상</h3>
        <div className="flex flex-wrap gap-4">
          <Button color="error" variant="contained">Contained</Button>
          <Button color="error" variant="outlined">Outlined</Button>
          <Button color="error" variant="text">Text</Button>
          <Button color="error" variant="ghost">Ghost</Button>
        </div>
      </div>
    </div>
  ),
};