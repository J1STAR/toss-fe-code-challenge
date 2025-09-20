import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from './Modal';
import { Button } from '../atoms/Button';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '접근성을 완전히 지원하는 모달 컴포넌트입니다. 포커스 트랩, 키보드 조작, ARIA 속성을 포함합니다.',
      },
    },
  },
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: '모달 열림/닫힘 상태',
    },
    onOpenChange: {
      action: 'openChange',
      description: '모달 상태 변경 핸들러',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalExample = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
  <Modal open={open} onOpenChange={onOpenChange}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <ModalTitle>모달 제목</ModalTitle>
        <ModalDescription>
          이것은 모달 설명입니다. 사용자에게 모달의 목적을 설명합니다.
        </ModalDescription>
      </ModalHeader>
      <div className="py-4">
        <p className="text-gray-600">
          모달 내용이 여기에 표시됩니다. 다양한 컴포넌트를 포함할 수 있습니다.
        </p>
      </div>
      <ModalFooter>
        <Button variant="outlined" onClick={() => onOpenChange(false)}>
          취소
        </Button>
        <Button onClick={() => onOpenChange(false)}>
          확인
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <ModalExample open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>폼 모달 열기</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>사용자 정보 입력</ModalTitle>
              <ModalDescription>
                사용자 정보를 입력해주세요.
              </ModalDescription>
            </ModalHeader>
            <form className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">이름</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="이메일을 입력하세요"
                />
              </div>
            </form>
            <ModalFooter>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>
                저장
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const ConfirmationModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button color="error" onClick={() => setOpen(true)}>삭제하기</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
              <ModalDescription>
                이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button color="error" onClick={() => setOpen(false)}>
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const LargeContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>긴 내용 모달 열기</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalOverlay />
          <ModalContent className="max-w-4xl">
            <ModalHeader>
              <ModalTitle>긴 내용 모달</ModalTitle>
              <ModalDescription>
                스크롤이 필요한 긴 내용을 포함하는 모달입니다.
              </ModalDescription>
            </ModalHeader>
            <div className="py-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
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
            </div>
            <ModalFooter>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>접근성 데모 모달</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>접근성 기능 데모</ModalTitle>
              <ModalDescription>
                이 모달은 다음과 같은 접근성 기능을 포함합니다:
              </ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>ARIA 속성:</strong> aria-modal, aria-labelledby, aria-describedby</li>
                <li>• <strong>포커스 트랩:</strong> Tab 키로 모달 내 요소들 간 순환</li>
                <li>• <strong>키보드 조작:</strong> ESC 키로 모달 닫기</li>
                <li>• <strong>스크린리더 지원:</strong> 의미있는 라벨과 설명</li>
                <li>• <strong>포커스 관리:</strong> 모달 열릴 때 자동 포커스</li>
              </ul>
            </div>
            <ModalFooter>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const MultipleModals: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    
    return (
      <div className="space-x-4">
        <Button onClick={() => setFirstOpen(true)}>첫 번째 모달</Button>
        <Button onClick={() => setSecondOpen(true)}>두 번째 모달</Button>
        
        <Modal open={firstOpen} onOpenChange={setFirstOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>첫 번째 모달</ModalTitle>
              <ModalDescription>이것은 첫 번째 모달입니다.</ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <p className="text-gray-600">첫 번째 모달의 내용입니다.</p>
            </div>
            <ModalFooter>
              <Button onClick={() => setFirstOpen(false)}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        <Modal open={secondOpen} onOpenChange={setSecondOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>두 번째 모달</ModalTitle>
              <ModalDescription>이것은 두 번째 모달입니다.</ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <p className="text-gray-600">두 번째 모달의 내용입니다.</p>
            </div>
            <ModalFooter>
              <Button onClick={() => setSecondOpen(false)}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const CustomSizes: Story = {
  render: () => {
    const [smallOpen, setSmallOpen] = useState(false);
    const [largeOpen, setLargeOpen] = useState(false);
    
    return (
      <div className="space-x-4">
        <Button onClick={() => setSmallOpen(true)}>작은 모달</Button>
        <Button onClick={() => setLargeOpen(true)}>큰 모달</Button>
        
        <Modal open={smallOpen} onOpenChange={setSmallOpen}>
          <ModalOverlay />
          <ModalContent className="max-w-sm">
            <ModalHeader>
              <ModalTitle>작은 모달</ModalTitle>
            </ModalHeader>
            <div className="py-4">
              <p className="text-gray-600">작은 크기의 모달입니다.</p>
            </div>
            <ModalFooter>
              <Button onClick={() => setSmallOpen(false)}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        <Modal open={largeOpen} onOpenChange={setLargeOpen}>
          <ModalOverlay />
          <ModalContent className="max-w-6xl">
            <ModalHeader>
              <ModalTitle>큰 모달</ModalTitle>
            </ModalHeader>
            <div className="py-4">
              <p className="text-gray-600">큰 크기의 모달입니다. 더 많은 내용을 표시할 수 있습니다.</p>
            </div>
            <ModalFooter>
              <Button onClick={() => setLargeOpen(false)}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};