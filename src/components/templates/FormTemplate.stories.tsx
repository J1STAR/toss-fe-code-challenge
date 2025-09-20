import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormTemplate } from './FormTemplate';
import { InputField } from '../molecules/InputField';
import { SelectField } from '../molecules/SelectField';
import { Button } from '../atoms/Button';

const meta: Meta<typeof FormTemplate> = {
  title: 'Templates/FormTemplate',
  component: FormTemplate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '폼 레이아웃을 제공하는 템플릿 컴포넌트입니다. 진행률 표시와 단계별 폼 구조를 지원합니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '폼 제목',
    },
    description: {
      control: { type: 'text' },
      description: '폼 설명',
    },
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
      description: '현재 단계',
    },
    totalSteps: {
      control: { type: 'number', min: 1, max: 5 },
      description: '전체 단계 수',
    },
    showProgress: {
      control: { type: 'boolean' },
      description: '진행률 표시 여부',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '기본 폼',
    description: '기본 폼 템플릿입니다.',
    children: (
      <div className="space-y-4">
        <InputField label="이름" placeholder="이름을 입력하세요" />
        <InputField label="이메일" type="email" placeholder="이메일을 입력하세요" />
      </div>
    ),
  },
};

export const WithProgress: Story = {
  args: {
    title: '단계별 폼',
    description: '진행률이 표시되는 단계별 폼입니다.',
    currentStep: 2,
    totalSteps: 3,
    showProgress: true,
    children: (
      <div className="space-y-4">
        <SelectField
          label="경력 연차"
          placeholder="경력 연차를 선택해주세요"
          options={[
            { value: '0-3', label: '0-3년' },
            { value: '4-7', label: '4-7년' },
            { value: '8+', label: '8년 이상' },
          ]}
        />
      </div>
    ),
  },
};

export const MultiStepForm: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    
    const steps = [
      {
        title: '👤 기본 정보',
        description: '이름과 이메일을 입력해주세요.',
        content: (
          <div className="space-y-4">
            <InputField label="이름" placeholder="홍길동" />
            <InputField label="이메일" type="email" placeholder="example@email.com" />
          </div>
        ),
      },
      {
        title: '💼 경력 정보',
        description: '경력 연차를 선택해주세요.',
        content: (
          <div className="space-y-4">
            <SelectField
              label="FE 경력 연차"
              placeholder="경력 연차를 선택해주세요"
              options={[
                { value: '0-3', label: '0-3년' },
                { value: '4-7', label: '4-7년' },
                { value: '8+', label: '8년 이상' },
              ]}
            />
          </div>
        ),
      },
      {
        title: '🔗 GitHub 정보',
        description: 'GitHub 프로필 링크를 입력해주세요. (선택사항)',
        content: (
          <div className="space-y-4">
            <InputField 
              label="GitHub 링크" 
              type="url" 
              placeholder="https://github.com/username"
              helperText="GitHub 프로필 URL을 입력해주세요. (선택사항)"
            />
          </div>
        ),
      },
    ];
    
    const currentStepData = steps[currentStep - 1];
    
    return (
      <div className="w-full max-w-2xl">
        <FormTemplate
          title={currentStepData.title}
          description={currentStepData.description}
          currentStep={currentStep}
          totalSteps={totalSteps}
          showProgress={true}
        >
          {currentStepData.content}
        </FormTemplate>
        
        <div className="mt-6 flex justify-between">
          <Button
            variant="outlined"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            이전
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep === totalSteps}
          >
            다음
          </Button>
        </div>
      </div>
    );
  },
};

export const DifferentSteps: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <FormTemplate
        title="단계 1/3"
        description="첫 번째 단계입니다."
        currentStep={1}
        totalSteps={3}
        showProgress={true}
      >
        <div className="space-y-4">
          <InputField label="이름" placeholder="이름을 입력하세요" />
          <InputField label="이메일" type="email" placeholder="이메일을 입력하세요" />
        </div>
      </FormTemplate>
      
      <FormTemplate
        title="단계 2/3"
        description="두 번째 단계입니다."
        currentStep={2}
        totalSteps={3}
        showProgress={true}
      >
        <div className="space-y-4">
          <SelectField
            label="경력 연차"
            placeholder="경력 연차를 선택해주세요"
            options={[
              { value: '0-3', label: '0-3년' },
              { value: '4-7', label: '4-7년' },
              { value: '8+', label: '8년 이상' },
            ]}
          />
        </div>
      </FormTemplate>
      
      <FormTemplate
        title="단계 3/3"
        description="마지막 단계입니다."
        currentStep={3}
        totalSteps={3}
        showProgress={true}
      >
        <div className="space-y-4">
          <InputField 
            label="GitHub 링크" 
            type="url" 
            placeholder="https://github.com/username"
            helperText="선택사항입니다"
          />
        </div>
      </FormTemplate>
    </div>
  ),
};

export const WithoutProgress: Story = {
  args: {
    title: '진행률 없는 폼',
    description: '진행률 표시 없이 단순한 폼입니다.',
    currentStep: 1,
    totalSteps: 1,
    showProgress: false,
    children: (
      <div className="space-y-4">
        <InputField label="제목" placeholder="제목을 입력하세요" />
        <div>
          <label className="block text-sm font-medium mb-2">내용</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="내용을 입력하세요"
          />
        </div>
      </div>
    ),
  },
};

export const LongForm: Story = {
  args: {
    title: '긴 폼',
    description: '여러 필드를 포함하는 긴 폼입니다.',
    currentStep: 1,
    totalSteps: 1,
    showProgress: false,
    children: (
      <div className="space-y-4">
        <InputField label="이름" placeholder="이름을 입력하세요" />
        <InputField label="이메일" type="email" placeholder="이메일을 입력하세요" />
        <InputField label="전화번호" type="tel" placeholder="전화번호를 입력하세요" />
        <InputField label="회사" placeholder="회사명을 입력하세요" />
        <InputField label="직책" placeholder="직책을 입력하세요" />
        <SelectField
          label="경력 연차"
          placeholder="경력 연차를 선택해주세요"
          options={[
            { value: '0-1', label: '0-1년' },
            { value: '2-3', label: '2-3년' },
            { value: '4-5', label: '4-5년' },
            { value: '6-10', label: '6-10년' },
            { value: '10+', label: '10년 이상' },
          ]}
        />
        <div>
          <label className="block text-sm font-medium mb-2">자기소개</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="자기소개를 입력하세요"
          />
        </div>
      </div>
    ),
  },
};

export const RegistrationForm: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    
    const steps = [
      {
        title: '📝 개인정보',
        description: '기본 개인정보를 입력해주세요.',
        content: (
          <div className="space-y-4">
            <InputField label="이름" placeholder="홍길동" required />
            <InputField label="이메일" type="email" placeholder="example@email.com" required />
            <InputField label="전화번호" type="tel" placeholder="010-1234-5678" />
          </div>
        ),
      },
      {
        title: '🏢 회사정보',
        description: '회사 정보를 입력해주세요.',
        content: (
          <div className="space-y-4">
            <InputField label="회사명" placeholder="회사명을 입력하세요" />
            <InputField label="부서" placeholder="부서명을 입력하세요" />
            <InputField label="직책" placeholder="직책을 입력하세요" />
          </div>
        ),
      },
      {
        title: '💼 경력정보',
        description: '경력 정보를 입력해주세요.',
        content: (
          <div className="space-y-4">
            <SelectField
              label="총 경력"
              placeholder="총 경력을 선택해주세요"
              options={[
                { value: '0-1', label: '0-1년 (신입)' },
                { value: '2-3', label: '2-3년 (주니어)' },
                { value: '4-7', label: '4-7년 (시니어)' },
                { value: '8+', label: '8년 이상 (리드)' },
              ]}
            />
            <SelectField
              label="프론트엔드 경력"
              placeholder="프론트엔드 경력을 선택해주세요"
              options={[
                { value: '0-1', label: '0-1년' },
                { value: '2-3', label: '2-3년' },
                { value: '4-7', label: '4-7년' },
                { value: '8+', label: '8년 이상' },
              ]}
            />
          </div>
        ),
      },
      {
        title: '🔗 추가정보',
        description: '추가 정보를 입력해주세요. (선택사항)',
        content: (
          <div className="space-y-4">
            <InputField 
              label="GitHub 프로필" 
              type="url" 
              placeholder="https://github.com/username"
              helperText="GitHub 프로필 URL을 입력해주세요"
            />
            <InputField 
              label="포트폴리오" 
              type="url" 
              placeholder="https://portfolio.com"
              helperText="포트폴리오 사이트 URL을 입력해주세요"
            />
            <div>
              <label className="block text-sm font-medium mb-2">자기소개</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="간단한 자기소개를 입력해주세요"
              />
            </div>
          </div>
        ),
      },
    ];
    
    const currentStepData = steps[currentStep - 1];
    
    return (
      <div className="w-full max-w-2xl">
        <FormTemplate
          title={currentStepData.title}
          description={currentStepData.description}
          currentStep={currentStep}
          totalSteps={totalSteps}
          showProgress={true}
        >
          {currentStepData.content}
        </FormTemplate>
        
        <div className="mt-6 flex justify-between">
          <Button
            variant="outlined"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            이전
          </Button>
          {currentStep === totalSteps ? (
            <Button onClick={() => alert('등록이 완료되었습니다!')}>
              등록 완료
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            >
              다음
            </Button>
          )}
        </div>
      </div>
    );
  },
};

export const SurveyForm: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    
    const steps = [
      {
        title: '📊 기본 정보',
        description: '설문 참여를 위한 기본 정보를 입력해주세요.',
        content: (
          <div className="space-y-4">
            <InputField label="이름" placeholder="이름을 입력하세요" />
            <InputField label="이메일" type="email" placeholder="이메일을 입력하세요" />
            <SelectField
              label="연령대"
              placeholder="연령대를 선택해주세요"
              options={[
                { value: '10s', label: '10대' },
                { value: '20s', label: '20대' },
                { value: '30s', label: '30대' },
                { value: '40s', label: '40대' },
                { value: '50s+', label: '50대 이상' },
              ]}
            />
          </div>
        ),
      },
      {
        title: '💻 기술 경험',
        description: '기술 사용 경험에 대해 답변해주세요.',
        content: (
          <div className="space-y-4">
            <SelectField
              label="주요 개발 언어"
              placeholder="주요 개발 언어를 선택해주세요"
              options={[
                { value: 'javascript', label: 'JavaScript' },
                { value: 'typescript', label: 'TypeScript' },
                { value: 'python', label: 'Python' },
                { value: 'java', label: 'Java' },
                { value: 'csharp', label: 'C#' },
                { value: 'other', label: '기타' },
              ]}
            />
            <SelectField
              label="프론트엔드 프레임워크"
              placeholder="사용하는 프레임워크를 선택해주세요"
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue.js' },
                { value: 'angular', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'none', label: '사용하지 않음' },
              ]}
            />
          </div>
        ),
      },
      {
        title: '📝 추가 의견',
        description: '추가 의견이나 제안사항이 있다면 입력해주세요.',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">만족도</label>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="radio" name="satisfaction" value={rating} className="mr-2" />
                    {rating}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">추가 의견</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="의견이나 제안사항을 자유롭게 입력해주세요"
              />
            </div>
          </div>
        ),
      },
    ];
    
    const currentStepData = steps[currentStep - 1];
    
    return (
      <div className="w-full max-w-2xl">
        <FormTemplate
          title={currentStepData.title}
          description={currentStepData.description}
          currentStep={currentStep}
          totalSteps={totalSteps}
          showProgress={true}
        >
          {currentStepData.content}
        </FormTemplate>
        
        <div className="mt-6 flex justify-between">
          <Button
            variant="outlined"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            이전
          </Button>
          {currentStep === totalSteps ? (
            <Button onClick={() => alert('설문이 완료되었습니다!')}>
              설문 완료
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            >
              다음
            </Button>
          )}
        </div>
      </div>
    );
  },
};