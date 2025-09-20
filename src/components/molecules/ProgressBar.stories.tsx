import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '진행률을 시각적으로 표시하는 프로그레스 바 컴포넌트입니다. 다양한 variant와 size 옵션을 지원하며 접근성을 고려했습니다.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: '현재 값',
    },
    max: {
      control: { type: 'number' },
      description: '최대 값',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '프로그레스 바 크기',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: '프로그레스 바 색상 변형',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: '라벨 표시 여부',
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={30} variant="default" showLabel label="기본" />
      <ProgressBar value={50} variant="primary" showLabel label="주요" />
      <ProgressBar value={70} variant="success" showLabel label="성공" />
      <ProgressBar value={40} variant="warning" showLabel label="경고" />
      <ProgressBar value={20} variant="error" showLabel label="오류" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={50} size="sm" showLabel label="Small" />
      <ProgressBar value={50} size="md" showLabel label="Medium" />
      <ProgressBar value={50} size="lg" showLabel label="Large" />
    </div>
  ),
};

export const ProgressValues: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={0} showLabel label="시작" />
      <ProgressBar value={25} showLabel label="25%" />
      <ProgressBar value={50} showLabel label="50%" />
      <ProgressBar value={75} showLabel label="75%" />
      <ProgressBar value={100} showLabel label="완료" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={30} variant="primary" />
      <ProgressBar value={60} variant="success" />
      <ProgressBar value={90} variant="warning" />
    </div>
  ),
};

export const CustomMax: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={3} max={10} showLabel label="3/10" />
      <ProgressBar value={7} max={10} showLabel label="7/10" />
      <ProgressBar value={150} max={200} showLabel label="150/200" />
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm text-gray-600 mb-2">파일 업로드 중...</p>
        <ProgressBar value={45} variant="primary" showLabel label="45%" />
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">설치 진행 중...</p>
        <ProgressBar value={80} variant="success" showLabel label="80%" />
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">오류 발생</p>
        <ProgressBar value={30} variant="error" showLabel label="30%" />
      </div>
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    
    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="w-80">
        <ProgressBar value={progress} variant="primary" showLabel label={`${progress}%`} />
      </div>
    );
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-lg font-semibold mb-4">파일 업로드</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>document.pdf</span>
            <span>75%</span>
          </div>
          <ProgressBar value={75} variant="primary" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">설치 진행</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>패키지 설치 중...</span>
            <span>3/5</span>
          </div>
          <ProgressBar value={60} variant="success" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">데이터 동기화</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>서버와 동기화 중...</span>
            <span>90%</span>
          </div>
          <ProgressBar value={90} variant="warning" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">오류 복구</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>오류 복구 중...</span>
            <span>25%</span>
          </div>
          <ProgressBar value={25} variant="error" />
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h3 className="text-lg font-semibold mb-2">접근성 테스트</h3>
        <ProgressBar 
          value={65} 
          variant="primary" 
          showLabel 
          label="65% 완료"
          aria-label="작업 진행률 65%"
        />
        <p className="text-sm text-gray-600 mt-2">
          스크린리더가 진행률을 음성으로 알려줍니다.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">키보드 접근성</h3>
        <ProgressBar 
          value={80} 
          variant="success" 
          showLabel 
          label="80% 완료"
          tabIndex={0}
        />
        <p className="text-sm text-gray-600 mt-2">
          Tab 키로 포커스를 받을 수 있습니다.
        </p>
      </div>
    </div>
  ),
};