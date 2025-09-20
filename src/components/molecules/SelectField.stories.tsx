import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from './SelectField';

const meta: Meta<typeof SelectField> = {
  title: 'Molecules/SelectField',
  component: SelectField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '재사용 가능한 선택 필드 컴포넌트입니다. 드롭다운 옵션을 제공하며 키보드 접근성을 완전히 지원합니다.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: '선택 필드 라벨',
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
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    options: {
      control: { type: 'object' },
      description: '선택 옵션 배열',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const experienceOptions = [
  { value: '0-3', label: '0-3년' },
  { value: '4-7', label: '4-7년' },
  { value: '8+', label: '8년 이상' },
];

const countryOptions = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
];

const statusOptions = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'pending', label: '대기중', disabled: true },
];

export const Default: Story = {
  args: {
    label: '경력 연차',
    placeholder: '경력 연차를 선택해주세요',
    options: experienceOptions,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: '국가',
    placeholder: '국가를 선택해주세요',
    options: countryOptions,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: '상태',
    placeholder: '상태를 선택해주세요',
    options: statusOptions,
  },
};

export const ErrorState: Story = {
  args: {
    label: '경력 연차',
    placeholder: '경력 연차를 선택해주세요',
    options: experienceOptions,
    error: '경력 연차를 선택해주세요',
    touched: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '경력 연차',
    placeholder: '경력 연차를 선택해주세요',
    options: experienceOptions,
    disabled: true,
  },
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <SelectField
        label="경력 연차"
        placeholder="경력 연차를 선택해주세요"
        options={experienceOptions}
        required
      />
      <SelectField
        label="국가"
        placeholder="국가를 선택해주세요"
        options={countryOptions}
      />
      <SelectField
        label="상태"
        placeholder="상태를 선택해주세요"
        options={statusOptions}
      />
    </form>
  ),
};

export const LongOptions: Story = {
  args: {
    label: '긴 옵션 목록',
    placeholder: '옵션을 선택해주세요',
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `옵션 ${i + 1} - 이것은 매우 긴 옵션 텍스트입니다`,
    })),
  },
};

export const CategoryExamples: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-lg font-semibold mb-4">개발 경력</h3>
        <SelectField
          label="프론트엔드 경력"
          placeholder="경력을 선택해주세요"
          options={[
            { value: '0-1', label: '0-1년 (신입)' },
            { value: '2-3', label: '2-3년 (주니어)' },
            { value: '4-7', label: '4-7년 (시니어)' },
            { value: '8+', label: '8년 이상 (리드)' },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">기술 스택</h3>
        <SelectField
          label="주요 기술"
          placeholder="기술을 선택해주세요"
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue.js' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">프로젝트 상태</h3>
        <SelectField
          label="현재 상태"
          placeholder="상태를 선택해주세요"
          options={[
            { value: 'planning', label: '기획 단계' },
            { value: 'development', label: '개발 중' },
            { value: 'testing', label: '테스트 중' },
            { value: 'completed', label: '완료' },
            { value: 'on-hold', label: '보류', disabled: true },
          ]}
        />
      </div>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <SelectField
        label="키보드 접근성 테스트"
        placeholder="Tab 키로 이동하고 화살표 키로 선택해보세요"
        options={[
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2' },
          { value: 'option3', label: '옵션 3' },
        ]}
        helperText="키보드만으로도 완전히 조작 가능합니다"
      />
      
      <SelectField
        label="스크린리더 테스트"
        placeholder="스크린리더로 옵션을 확인해보세요"
        options={[
          { value: 'accessible', label: '접근 가능한 옵션' },
          { value: 'readable', label: '읽기 쉬운 옵션' },
          { value: 'navigable', label: '탐색 가능한 옵션' },
        ]}
        helperText="모든 옵션이 스크린리더로 읽힙니다"
      />
    </div>
  ),
};