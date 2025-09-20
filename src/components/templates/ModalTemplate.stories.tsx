import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ModalTemplate } from './ModalTemplate';
import { Button } from '../atoms/Button';
import { InputField } from '../molecules/InputField';
import { Alert } from '../molecules/Alert';

const meta: Meta<typeof ModalTemplate> = {
  title: 'Templates/ModalTemplate',
  component: ModalTemplate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '모달 레이아웃을 제공하는 템플릿 컴포넌트입니다. 헤더, 푸터, 닫기 버튼을 포함한 완전한 모달 구조를 지원합니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '모달 제목',
    },
    description: {
      control: { type: 'text' },
      description: '모달 설명',
    },
    titleId: {
      control: { type: 'text' },
      description: '제목 ARIA ID',
    },
    descriptionId: {
      control: { type: 'text' },
      description: '설명 ARIA ID',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: '닫기 버튼 표시 여부',
    },
    onClose: {
      action: 'close',
      description: '닫기 버튼 클릭 핸들러',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '기본 모달',
    description: '기본 모달 템플릿입니다.',
    children: (
      <div className="space-y-4">
        <p className="text-gray-600">모달 내용이 여기에 표시됩니다.</p>
      </div>
    ),
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outlined">취소</Button>
        <Button>확인</Button>
      </div>
    ),
  },
};

export const WithForm: Story = {
  args: {
    title: '폼 모달',
    description: '폼을 포함한 모달입니다.',
    children: (
      <div className="space-y-4">
        <InputField label="이름" placeholder="이름을 입력하세요" />
        <InputField label="이메일" type="email" placeholder="이메일을 입력하세요" />
      </div>
    ),
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outlined">취소</Button>
        <Button>저장</Button>
      </div>
    ),
  },
};

export const WithCloseButton: Story = {
  args: {
    title: '닫기 버튼 있는 모달',
    description: '닫기 버튼이 있는 모달입니다.',
    showCloseButton: true,
    children: (
      <div className="space-y-4">
        <p className="text-gray-600">이 모달은 우상단에 닫기 버튼이 있습니다.</p>
        <Alert variant="info" description="ESC 키를 눌러도 모달을 닫을 수 있습니다." />
      </div>
    ),
    footer: (
      <div className="flex justify-end">
        <Button>확인</Button>
      </div>
    ),
  },
};

export const ConfirmationModal: Story = {
  args: {
    title: '정말 삭제하시겠습니까?',
    description: '이 작업은 되돌릴 수 없습니다.',
    children: (
      <div className="space-y-4">
        <Alert variant="error" description="삭제된 데이터는 복구할 수 없습니다." />
        <p className="text-gray-600">정말로 삭제하시겠습니까?</p>
      </div>
    ),
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outlined">취소</Button>
        <Button color="error">삭제</Button>
      </div>
    ),
  },
};

export const SuccessModal: Story = {
  args: {
    title: '성공!',
    description: '작업이 성공적으로 완료되었습니다.',
    children: (
      <div className="space-y-4">
        <Alert variant="success" description="모든 작업이 완료되었습니다." />
        <p className="text-gray-600">변경사항이 저장되었습니다.</p>
      </div>
    ),
    footer: (
      <div className="flex justify-end">
        <Button>확인</Button>
      </div>
    ),
  },
};

export const LongContentModal: Story = {
  args: {
    title: '긴 내용 모달',
    description: '스크롤이 필요한 긴 내용을 포함하는 모달입니다.',
    children: (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">섹션 {i + 1}</h3>
            <p className="text-gray-600">
              이것은 긴 내용의 예시입니다. 모달 내에서 스크롤이 가능하며,
              포커스 트랩이 올바르게 작동합니다. 사용자는 ESC 키를 눌러 모달을 닫을 수 있고,
              Tab 키로 모달 내 요소들 간에 이동할 수 있습니다.
            </p>
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outlined">취소</Button>
        <Button>확인</Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    
    const handleSubmit = () => {
      alert(`제출된 데이터: ${JSON.stringify(formData)}`);
      setIsOpen(false);
    };
    
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>인터랙티브 모달 열기</Button>
        
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <ModalTemplate
                title="사용자 정보 입력"
                description="사용자 정보를 입력해주세요."
                showCloseButton={true}
                onClose={() => setIsOpen(false)}
                footer={
                  <div className="flex justify-end space-x-2">
                    <Button variant="outlined" onClick={() => setIsOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleSubmit}>
                      제출
                    </Button>
                  </div>
                }
              >
                <div className="space-y-4">
                  <InputField
                    label="이름"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="이름을 입력하세요"
                  />
                  <InputField
                    label="이메일"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </ModalTemplate>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  args: {
    title: '접근성 데모 모달',
    description: '이 모달은 다음과 같은 접근성 기능을 포함합니다:',
    titleId: 'modal-title',
    descriptionId: 'modal-description',
    children: (
      <div className="space-y-4">
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• <strong>ARIA 속성:</strong> aria-modal, aria-labelledby, aria-describedby</li>
          <li>• <strong>포커스 트랩:</strong> Tab 키로 모달 내 요소들 간 순환</li>
          <li>• <strong>키보드 조작:</strong> ESC 키로 모달 닫기</li>
          <li>• <strong>스크린리더 지원:</strong> 의미있는 라벨과 설명</li>
          <li>• <strong>포커스 관리:</strong> 모달 열릴 때 자동 포커스</li>
        </ul>
        <Alert variant="info" description="이 모달은 웹 접근성 가이드라인을 완전히 준수합니다." />
      </div>
    ),
    footer: (
      <div className="flex justify-end">
        <Button>확인</Button>
      </div>
    ),
  },
};

export const SettingsModal: Story = {
  args: {
    title: '설정',
    description: '애플리케이션 설정을 변경할 수 있습니다.',
    showCloseButton: true,
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">일반 설정</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="dark-mode" className="text-sm font-medium">다크 모드</label>
              <input id="dark-mode" type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="notifications" className="text-sm font-medium">알림 허용</label>
              <input id="notifications" type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="auto-save" className="text-sm font-medium">자동 저장</label>
              <input id="auto-save" type="checkbox" className="rounded" defaultChecked />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">언어 설정</h3>
          <label htmlFor="language-select" className="sr-only">언어 선택</label>
          <select id="language-select" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">테마 색상</h3>
          <div className="flex space-x-2" role="group" aria-label="테마 색상 선택">
            <button className="w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-700" aria-label="파란색 테마"></button>
            <button className="w-8 h-8 bg-green-500 rounded-full border-2 border-transparent" aria-label="초록색 테마"></button>
            <button className="w-8 h-8 bg-purple-500 rounded-full border-2 border-transparent" aria-label="보라색 테마"></button>
            <button className="w-8 h-8 bg-red-500 rounded-full border-2 border-transparent" aria-label="빨간색 테마"></button>
          </div>
        </div>
      </div>
    ),
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outlined">취소</Button>
        <Button>저장</Button>
      </div>
    ),
  },
};

export const UserProfileModal: Story = {
  args: {
    title: '프로필 편집',
    description: '사용자 프로필 정보를 편집할 수 있습니다.',
    showCloseButton: true,
    children: (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4">
            JD
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800" aria-label="프로필 사진 변경">프로필 사진 변경</button>
        </div>
        
        <div className="space-y-4">
          <InputField label="이름" placeholder="홍길동" />
          <InputField label="이메일" type="email" placeholder="example@email.com" />
          <InputField label="전화번호" type="tel" placeholder="010-1234-5678" />
          <InputField label="회사" placeholder="회사명" />
          <InputField label="직책" placeholder="직책" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">자기소개</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="간단한 자기소개를 입력해주세요"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">관심 기술</label>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'Python'].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {tech}
              </span>
            ))}
            <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50" aria-label="기술 추가">
              + 추가
            </button>
          </div>
        </div>
      </div>
    ),
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outlined">취소</Button>
        <Button>저장</Button>
      </div>
    ),
  },
};

export const PaymentModal: Story = {
  args: {
    title: '결제 정보',
    description: '결제 정보를 입력해주세요.',
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">주문 요약</h3>
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <span>프리미엄 플랜</span>
              <span className="font-semibold">₩29,900</span>
            </div>
            <div className="flex justify-between">
              <span>할인 (-10%)</span>
              <span className="text-green-600">-₩2,990</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>총 금액</span>
              <span>₩26,910</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">결제 수단</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="radio" name="payment" value="card" className="mr-3" defaultChecked aria-label="신용카드 결제" />
              <span>💳 신용카드</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" value="bank" className="mr-3" aria-label="계좌이체 결제" />
              <span>🏦 계좌이체</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" value="paypal" className="mr-3" aria-label="PayPal 결제" />
              <span>💳 PayPal</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <InputField label="카드 번호" placeholder="1234 5678 9012 3456" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="만료일" placeholder="MM/YY" />
            <InputField label="CVC" placeholder="123" />
          </div>
          <InputField label="카드 소유자명" placeholder="홍길동" />
        </div>
        
        <Alert variant="info" description="결제 정보는 안전하게 암호화되어 전송됩니다." />
      </div>
    ),
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outlined">취소</Button>
        <Button>₩26,910 결제하기</Button>
      </div>
    ),
  },
};