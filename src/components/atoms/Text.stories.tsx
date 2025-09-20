import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '재사용 가능한 텍스트 컴포넌트입니다. 다양한 HTML 요소로 렌더링할 수 있으며, variant, weight, color, align 옵션을 지원합니다.',
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: '렌더링할 HTML 요소',
    },
    variant: {
      control: { type: 'select' },
      options: ['body', 'caption', 'small', 'large', 'lead'],
      description: '텍스트 크기 변형',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: '폰트 굵기',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'primary', 'secondary', 'success', 'warning', 'error'],
      description: '텍스트 색상',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: '텍스트 정렬',
    },
    children: {
      control: { type: 'text' },
      description: '텍스트 내용',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '기본 텍스트입니다.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="caption">Caption 텍스트</Text>
      <Text variant="small">Small 텍스트</Text>
      <Text variant="body">Body 텍스트 (기본)</Text>
      <Text variant="large">Large 텍스트</Text>
      <Text variant="lead">Lead 텍스트</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="light">Light 텍스트</Text>
      <Text weight="normal">Normal 텍스트</Text>
      <Text weight="medium">Medium 텍스트</Text>
      <Text weight="semibold">Semibold 텍스트</Text>
      <Text weight="bold">Bold 텍스트</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default 텍스트</Text>
      <Text color="muted">Muted 텍스트</Text>
      <Text color="primary">Primary 텍스트</Text>
      <Text color="secondary">Secondary 텍스트</Text>
      <Text color="success">Success 텍스트</Text>
      <Text color="warning">Warning 텍스트</Text>
      <Text color="error">Error 텍스트</Text>
    </div>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Text align="left">왼쪽 정렬 텍스트</Text>
      <Text align="center">가운데 정렬 텍스트</Text>
      <Text align="right">오른쪽 정렬 텍스트</Text>
      <Text align="justify">
        양쪽 정렬 텍스트입니다. 이 텍스트는 양쪽 정렬로 표시되어 문단이 깔끔하게 정렬됩니다.
      </Text>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text as="h1" variant="large" weight="bold">제목 1</Text>
      <Text as="h2" variant="large" weight="semibold">제목 2</Text>
      <Text as="h3" variant="body" weight="semibold">제목 3</Text>
      <Text as="h4" variant="small" weight="medium">제목 4</Text>
      <Text as="h5" variant="small" weight="medium">제목 5</Text>
      <Text as="h6" variant="caption" weight="medium">제목 6</Text>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: '클릭 가능한 텍스트',
    onClick: () => alert('텍스트가 클릭되었습니다!'),
    className: 'cursor-pointer hover:text-blue-600',
  },
};

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">제목 계층</h3>
        <div className="space-y-2">
          <Text as="h1" variant="large" weight="bold" color="primary">메인 제목</Text>
          <Text as="h2" variant="body" weight="semibold" color="secondary">부제목</Text>
          <Text as="h3" variant="small" weight="medium">소제목</Text>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">본문 텍스트</h3>
        <div className="space-y-2">
          <Text variant="lead" color="default">리드 텍스트 - 중요한 내용을 강조합니다.</Text>
          <Text variant="body" color="default">일반 본문 텍스트입니다. 읽기 쉬운 크기와 간격을 제공합니다.</Text>
          <Text variant="small" color="muted">작은 텍스트 - 부가 정보나 설명에 사용됩니다.</Text>
          <Text variant="caption" color="muted">캡션 텍스트 - 가장 작은 크기의 텍스트입니다.</Text>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">상태별 텍스트</h3>
        <div className="space-y-2">
          <Text color="success" weight="medium">✓ 성공 메시지</Text>
          <Text color="warning" weight="medium">⚠ 경고 메시지</Text>
          <Text color="error" weight="medium">✗ 오류 메시지</Text>
          <Text color="primary" weight="medium">ℹ 정보 메시지</Text>
        </div>
      </div>
    </div>
  ),
};