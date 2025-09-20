import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '재사용 가능한 카드 컴포넌트입니다. 다양한 variant와 padding 옵션을 지원하며 콘텐츠를 구조화하여 표시합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
      description: '카드 스타일 변형',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: '카드 내부 패딩',
    },
    children: {
      control: { type: 'text' },
      description: '카드 내용',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '기본 카드 내용입니다.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Card variant="default">
        <h3 className="text-lg font-semibold mb-2">기본 카드</h3>
        <p className="text-gray-600">기본 스타일의 카드입니다.</p>
      </Card>
      <Card variant="outlined">
        <h3 className="text-lg font-semibold mb-2">테두리 카드</h3>
        <p className="text-gray-600">테두리가 있는 카드입니다.</p>
      </Card>
      <Card variant="elevated">
        <h3 className="text-lg font-semibold mb-2">그림자 카드</h3>
        <p className="text-gray-600">그림자가 있는 카드입니다.</p>
      </Card>
    </div>
  ),
};

export const PaddingSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Card padding="none" className="border">
        <div className="p-4 bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">패딩 없음</h3>
          <p className="text-gray-600">패딩이 없는 카드입니다.</p>
        </div>
      </Card>
      <Card padding="sm">
        <h3 className="text-lg font-semibold mb-2">작은 패딩</h3>
        <p className="text-gray-600">작은 패딩의 카드입니다.</p>
      </Card>
      <Card padding="md">
        <h3 className="text-lg font-semibold mb-2">중간 패딩</h3>
        <p className="text-gray-600">중간 패딩의 카드입니다.</p>
      </Card>
      <Card padding="lg">
        <h3 className="text-lg font-semibold mb-2">큰 패딩</h3>
        <p className="text-gray-600">큰 패딩의 카드입니다.</p>
      </Card>
    </div>
  ),
};

export const ContentExamples: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      <Card variant="elevated">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
            🎯
          </div>
          <div>
            <h3 className="text-lg font-semibold">완벽한 접근성</h3>
            <p className="text-sm text-gray-600">ARIA 속성과 포커스 관리</p>
          </div>
        </div>
        <p className="text-gray-700">
          모든 사용자가 쉽게 사용할 수 있도록 접근성을 고려한 컴포넌트입니다.
        </p>
      </Card>
      
      <Card variant="outlined">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
            ⌨️
          </div>
          <div>
            <h3 className="text-lg font-semibold">키보드 조작</h3>
            <p className="text-sm text-gray-600">완전한 키보드 지원</p>
          </div>
        </div>
        <p className="text-gray-700">
          마우스 없이도 모든 기능을 키보드만으로 조작할 수 있습니다.
        </p>
      </Card>
      
      <Card variant="default">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl">
            📱
          </div>
          <div>
            <h3 className="text-lg font-semibold">반응형 디자인</h3>
            <p className="text-sm text-gray-600">모든 기기 지원</p>
          </div>
        </div>
        <p className="text-gray-700">
          모바일부터 데스크톱까지 모든 화면 크기에서 완벽하게 작동합니다.
        </p>
      </Card>
      
      <Card variant="elevated">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl">
            ⚡
          </div>
          <div>
            <h3 className="text-lg font-semibold">성능 최적화</h3>
            <p className="text-sm text-gray-600">빠른 로딩과 부드러운 애니메이션</p>
          </div>
        </div>
        <p className="text-gray-700">
          최적화된 코드로 빠른 성능과 부드러운 사용자 경험을 제공합니다.
        </p>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: '클릭 가능한 카드',
    onClick: () => alert('카드가 클릭되었습니다!'),
    className: 'cursor-pointer hover:shadow-lg transition-shadow',
  },
};

export const ProductCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
      <Card variant="elevated" className="hover:shadow-xl transition-shadow">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💻</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">웹 개발</h3>
          <p className="text-gray-600 mb-4">
            현대적인 웹 애플리케이션을 구축합니다.
          </p>
          <div className="text-sm text-gray-500">
            React, TypeScript, Tailwind CSS
          </div>
        </div>
      </Card>
      
      <Card variant="outlined" className="hover:shadow-lg transition-shadow">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">모바일 앱</h3>
          <p className="text-gray-600 mb-4">
            크로스 플랫폼 모바일 앱을 개발합니다.
          </p>
          <div className="text-sm text-gray-500">
            React Native, Flutter
          </div>
        </div>
      </Card>
      
      <Card variant="default" className="hover:shadow-lg transition-shadow">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">☁️</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">클라우드 서비스</h3>
          <p className="text-gray-600 mb-4">
            확장 가능한 클라우드 솔루션을 제공합니다.
          </p>
          <div className="text-sm text-gray-500">
            AWS, Azure, Google Cloud
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const UserProfileCards: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Card variant="elevated">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-gray-600">Frontend Developer</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-gray-500">온라인</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card variant="outlined">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
            AS
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Alice Smith</h3>
            <p className="text-sm text-gray-600">Backend Developer</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span className="text-xs text-gray-500">자리비움</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card variant="default">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
            BJ
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Bob Johnson</h3>
            <p className="text-sm text-gray-600">Full Stack Developer</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-xs text-gray-500">오프라인</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ),
};