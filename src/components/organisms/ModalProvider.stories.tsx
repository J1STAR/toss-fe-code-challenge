import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ModalProvider from './ModalProvider';
import { Button } from '../atoms/Button';
import { openModal } from '../../use-cases/openModal';
import ContactForm from './ContactForm';

const meta: Meta<typeof ModalProvider> = {
  title: 'Organisms/ModalProvider',
  component: ModalProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '전역 모달 상태를 관리하는 프로바이더 컴포넌트입니다. Zustand 스토어를 통해 모달을 동적으로 렌더링합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 테스트용 간단한 모달 컴포넌트
const TestModal = ({ closeModal, resolve }: { closeModal: () => void; resolve: (value: any) => void }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-lg font-semibold mb-2">테스트 모달</h2>
      <p className="text-gray-600">이것은 테스트용 모달입니다.</p>
    </div>
    <div className="flex justify-end space-x-2">
      <Button variant="outlined" onClick={closeModal}>
        취소
      </Button>
      <Button onClick={() => {
        resolve('테스트 데이터');
        closeModal();
      }}>
        확인
      </Button>
    </div>
  </div>
);

export const Default: Story = {
  render: () => {
    const [result, setResult] = useState(null);
    
    const handleOpenModal = async () => {
      try {
        const data = await openModal(TestModal, {});
        setResult(data);
      } catch (error) {
        console.error('모달 오류:', error);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Button onClick={handleOpenModal}>
            테스트 모달 열기
          </Button>
        </div>
        
        {result && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ 모달 결과:</h3>
            <p className="text-green-700">{result}</p>
          </div>
        )}
        
        <ModalProvider />
      </div>
    );
  },
};

export const ContactFormModal: Story = {
  render: () => {
    const [result, setResult] = useState(null);
    
    const handleOpenContactForm = async () => {
      try {
        const data = await openModal(ContactForm, {});
        setResult(data);
      } catch (error) {
        console.error('모달 오류:', error);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Button onClick={handleOpenContactForm}>
            연락처 폼 열기
          </Button>
        </div>
        
        {result && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">📋 폼 제출 결과:</h3>
            <pre className="text-sm text-blue-700">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        
        <ModalProvider />
      </div>
    );
  },
};

export const MultipleModals: Story = {
  render: () => {
    const [results, setResults] = useState<any[]>([]);
    
    const handleOpenModal1 = async () => {
      try {
        const data = await openModal(TestModal, {});
        setResults(prev => [...prev, { type: 'Modal 1', data }]);
      } catch (error) {
        console.error('모달 오류:', error);
      }
    };
    
    const handleOpenModal2 = async () => {
      try {
        const data = await openModal(ContactForm, {});
        setResults(prev => [...prev, { type: 'Contact Form', data }]);
      } catch (error) {
        console.error('모달 오류:', error);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4 space-x-2">
          <Button onClick={handleOpenModal1}>
            모달 1 열기
          </Button>
          <Button onClick={handleOpenModal2}>
            연락처 폼 열기
          </Button>
        </div>
        
        {results.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">모달 결과들:</h3>
            {results.map((result, index) => (
              <div key={index} className="p-3 bg-gray-50 border rounded-lg">
                <p className="text-sm"><strong>{result.type}:</strong> {JSON.stringify(result.data)}</p>
              </div>
            ))}
          </div>
        )}
        
        <ModalProvider />
      </div>
    );
  },
};

export const ModalStates: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    
    const handleOpenModal = async () => {
      setIsOpen(true);
      try {
        const data = await openModal(TestModal, {});
        setModalData(data);
      } catch (error) {
        console.error('모달 오류:', error);
      } finally {
        setIsOpen(false);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Button onClick={handleOpenModal} disabled={isOpen}>
            {isOpen ? '모달 열림...' : '모달 열기'}
          </Button>
        </div>
        
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">모달 상태:</h3>
          <p className="text-sm">열림: {isOpen ? '✅' : '❌'}</p>
          <p className="text-sm">데이터: {modalData ? JSON.stringify(modalData) : '없음'}</p>
        </div>
        
        <ModalProvider />
      </div>
    );
  },
};

export const CustomModalComponents: Story = {
  render: () => {
    const [results, setResults] = useState<any[]>([]);
    
    // 다양한 커스텀 모달 컴포넌트들
    const InfoModal = ({ closeModal, resolve }: { closeModal: () => void; resolve: (value: any) => void }) => (
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">ℹ️</span>
          </div>
          <h2 className="text-lg font-semibold">정보</h2>
          <p className="text-gray-600">이것은 정보 모달입니다.</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outlined" onClick={closeModal}>닫기</Button>
          <Button onClick={() => { resolve('info'); closeModal(); }}>확인</Button>
        </div>
      </div>
    );
    
    const WarningModal = ({ closeModal, resolve }: { closeModal: () => void; resolve: (value: any) => void }) => (
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-lg font-semibold">경고</h2>
          <p className="text-gray-600">이 작업은 되돌릴 수 없습니다.</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outlined" onClick={closeModal}>취소</Button>
          <Button color="error" onClick={() => { resolve('warning'); closeModal(); }}>계속</Button>
        </div>
      </div>
    );
    
    const SuccessModal = ({ closeModal, resolve }: { closeModal: () => void; resolve: (value: any) => void }) => (
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-lg font-semibold">성공</h2>
          <p className="text-gray-600">작업이 성공적으로 완료되었습니다.</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => { resolve('success'); closeModal(); }}>확인</Button>
        </div>
      </div>
    );
    
    const openInfoModal = async () => {
      try {
        const data = await openModal(InfoModal, {});
        setResults(prev => [...prev, { type: 'Info Modal', data }]);
      } catch (error) {
        console.error('모달 오류:', error);
      }
    };
    
    const openWarningModal = async () => {
      try {
        const data = await openModal(WarningModal, {});
        setResults(prev => [...prev, { type: 'Warning Modal', data }]);
      } catch (error) {
        console.error('모달 오류:', error);
      }
    };
    
    const openSuccessModal = async () => {
      try {
        const data = await openModal(SuccessModal, {});
        setResults(prev => [...prev, { type: 'Success Modal', data }]);
      } catch (error) {
        console.error('모달 오류:', error);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4 space-x-2">
          <Button onClick={openInfoModal}>정보 모달</Button>
          <Button onClick={openWarningModal}>경고 모달</Button>
          <Button onClick={openSuccessModal}>성공 모달</Button>
        </div>
        
        {results.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">모달 결과들:</h3>
            {results.map((result, index) => (
              <div key={index} className="p-3 bg-gray-50 border rounded-lg">
                <p className="text-sm"><strong>{result.type}:</strong> {JSON.stringify(result.data)}</p>
              </div>
            ))}
          </div>
        )}
        
        <ModalProvider />
      </div>
    );
  },
};

export const ErrorHandling: Story = {
  render: () => {
    const [errors, setErrors] = useState<string[]>([]);
    
    const handleOpenModal = async () => {
      try {
        // 존재하지 않는 컴포넌트로 테스트
        const data = await openModal(null as any, {});
        console.log('예상치 못한 성공:', data);
      } catch (error) {
        setErrors(prev => [...prev, `오류: ${error}`]);
      }
    };
    
    const handleOpenModalWithError = async () => {
      try {
        const ErrorModal = ({ closeModal }: { closeModal: () => void }) => {
          throw new Error('모달 내부 오류');
        };
        
        const data = await openModal(ErrorModal, {});
        console.log('예상치 못한 성공:', data);
      } catch (error) {
        setErrors(prev => [...prev, `모달 오류: ${error}`]);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4 space-x-2">
          <Button onClick={handleOpenModal}>오류 테스트 1</Button>
          <Button onClick={handleOpenModalWithError}>오류 테스트 2</Button>
        </div>
        
        {errors.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold text-red-600">오류 로그:</h3>
            {errors.map((error, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            ))}
          </div>
        )}
        
        <ModalProvider />
      </div>
    );
  },
};