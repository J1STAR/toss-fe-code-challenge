import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ContactForm, { type ContactFormData } from './ContactForm';

const meta: Meta<typeof ContactForm> = {
  title: 'Organisms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다단계 폼을 포함한 연락처 폼 컴포넌트입니다. 실시간 검증, 키보드 접근성, 완료 화면을 지원합니다.',
      },
    },
  },
  argTypes: {
    closeModal: {
      action: 'closeModal',
      description: '모달 닫기 핸들러',
    },
    resolve: {
      action: 'resolve',
      description: '폼 데이터 해결 핸들러',
    },
    onIdsReady: {
      action: 'idsReady',
      description: 'ARIA ID 준비 완료 핸들러',
    },
    isOpen: {
      control: { type: 'boolean' },
      description: '모달 열림 상태',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ContactFormWrapper = ({ isOpen = true }: { isOpen?: boolean }) => {
  const [data, setData] = useState(null);
  
  const handleCloseModal = () => {
    console.log('모달이 닫혔습니다');
  };
  
  const handleResolve = (formData: any) => {
    console.log('폼 데이터:', formData);
    setData(formData);
  };
  
  const handleIdsReady = (titleId: string, descriptionId: string) => {
    console.log('ARIA IDs 준비됨:', { titleId, descriptionId });
  };

  return (
    <div className="w-full max-w-2xl">
      <ContactForm
        closeModal={handleCloseModal}
        resolve={handleResolve}
        onIdsReady={handleIdsReady}
        isOpen={isOpen}
      />
      {data && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">제출된 데이터:</h3>
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <ContactFormWrapper />,
};

export const Closed: Story = {
  render: () => <ContactFormWrapper isOpen={false} />,
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
    
    const handleCloseModal = () => {
      setIsOpen(false);
    };
    
    const handleResolve = (formData: any) => {
      setSubmittedData(formData);
    };
    
    const handleIdsReady = (titleId: string, descriptionId: string) => {
      console.log('ARIA IDs:', { titleId, descriptionId });
    };

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            연락처 폼 열기
          </button>
        </div>
        
        {isOpen && (
          <ContactForm
            closeModal={handleCloseModal}
            resolve={handleResolve}
            onIdsReady={handleIdsReady}
            isOpen={isOpen}
          />
        )}
        
        {submittedData && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ 폼 제출 완료!</h3>
            <div className="text-sm text-green-700">
              <p><strong>이름:</strong> {submittedData.name}</p>
              <p><strong>이메일:</strong> {submittedData.email}</p>
              <p><strong>경력:</strong> {submittedData.experience}년</p>
              {submittedData.githubLink && (
                <p><strong>GitHub:</strong> {submittedData.githubLink}</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const FormSteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    
    return (
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">폼 단계별 데모</h2>
          <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                className={`px-4 py-2 rounded-md ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                단계 {step}
              </button>
            ))}
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">👤 기본 정보</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">이름</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">이메일 주소</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@company.com"
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">💼 경력 정보</h3>
              <div>
                <label htmlFor="form-steps-experience" className="block text-sm font-medium mb-2">FE 경력 연차</label>
                <select id="form-steps-experience" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">경력 연차를 선택해주세요</option>
                  <option value="0-3">0-3년</option>
                  <option value="4-7">4-7년</option>
                  <option value="8+">8년 이상</option>
                </select>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">🔗 GitHub 정보</h3>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub 링크 (선택사항)</label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>팁:</strong> GitHub 프로필 URL을 입력해주세요. (선택사항) 예: https://github.com/username
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const ValidationDemo: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      experience: '',
      githubLink: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    const validateField = (name: string, value: string) => {
      const newErrors = { ...errors };
      
      switch (name) {
        case 'name':
          if (!value.trim()) {
            newErrors.name = '이름을 입력해주세요';
          } else {
            delete newErrors.name;
          }
          break;
        case 'email':
          if (!value.trim()) {
            newErrors.email = '이메일을 입력해주세요';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다';
          } else {
            delete newErrors.email;
          }
          break;
        case 'experience':
          if (!value) {
            newErrors.experience = '경력 연차를 선택해주세요';
          } else {
            delete newErrors.experience;
          }
          break;
        case 'githubLink':
          if (value && !/^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/.test(value)) {
            newErrors.githubLink = '올바른 GitHub 프로필 URL이 아닙니다';
          } else {
            delete newErrors.githubLink;
          }
          break;
      }
      
      setErrors(newErrors);
    };
    
    const handleChange = (name: string, value: string) => {
      setFormData(prev => ({ ...prev, [name]: value }));
      validateField(name, value);
    };
    
    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">실시간 검증 데모</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">이름 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="이름을 입력하세요"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">이메일 *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="이메일을 입력하세요"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="experience-select" className="block text-sm font-medium mb-2">경력 연차 *</label>
            <select
              id="experience-select"
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.experience ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">경력 연차를 선택해주세요</option>
              <option value="0-3">0-3년</option>
              <option value="4-7">4-7년</option>
              <option value="8+">8년 이상</option>
            </select>
            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">GitHub 링크 (선택사항)</label>
            <input
              type="url"
              value={formData.githubLink}
              onChange={(e) => handleChange('githubLink', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.githubLink ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://github.com/username"
            />
            {errors.githubLink && <p className="text-red-500 text-sm mt-1">{errors.githubLink}</p>}
            <p className="text-gray-500 text-sm mt-1">예: https://github.com/username</p>
          </div>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">현재 폼 데이터:</h3>
          <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
          
          <h3 className="font-semibold mb-2 mt-4">검증 오류:</h3>
          <pre className="text-sm text-red-600">{JSON.stringify(errors, null, 2)}</pre>
        </div>
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            접근성 데모 폼 열기
          </button>
        </div>
        
        {isOpen && (
          <ContactForm
            closeModal={() => setIsOpen(false)}
            resolve={(data) => console.log('폼 데이터:', data)}
            onIdsReady={(titleId, descriptionId) => console.log('ARIA IDs:', { titleId, descriptionId })}
            isOpen={isOpen}
          />
        )}
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">♿ 접근성 기능</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>키보드 네비게이션:</strong> Tab 키로 필드 간 이동, Enter 키로 다음 단계</li>
            <li>• <strong>스크린리더 지원:</strong> 모든 필드에 적절한 라벨과 설명</li>
            <li>• <strong>ARIA 속성:</strong> aria-describedby, aria-invalid, aria-required</li>
            <li>• <strong>포커스 관리:</strong> 단계 변경 시 자동 포커스</li>
            <li>• <strong>실시간 피드백:</strong> 입력 중 즉시 검증 결과 제공</li>
          </ul>
        </div>
      </div>
    );
  },
};