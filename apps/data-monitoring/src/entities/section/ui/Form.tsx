// entities/section/ui/Form.tsx
import React, { useState, useEffect } from 'react';
import type {
  SectionDto,
  SectionCreateRequest,
  SectionUpdateRequest,
} from '../model/types';

interface FormProps {
  section?: SectionDto | null;
  onSubmit?: (data: SectionCreateRequest | SectionUpdateRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface FormData {
  userId: string;
  name: string;
  menuOrder: number;
}

interface FormErrors {
  userId?: string;
  name?: string;
  menuOrder?: string;
}

const Form: React.FC<FormProps> = ({
  section = null,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    name: '',
    menuOrder: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (section) {
      setFormData({
        userId: section.userId || '',
        name: section.name || '',
        menuOrder: section.menuOrder || 0,
      });
    }
  }, [section]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.userId.trim()) {
      newErrors.userId = '사용자 ID는 필수입니다.';
    }

    if (!formData.name.trim()) {
      newErrors.name = '이름은 필수입니다.';
    }

    if (formData.menuOrder < 0) {
      newErrors.menuOrder = '순서는 0 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const processedValue = name === 'menuOrder' ? parseInt(value) || 0 : value;

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));

    // 에러 상태 클리어
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData: SectionCreateRequest | SectionUpdateRequest = {
      userId: formData.userId,
      name: formData.name,
      menuOrder: formData.menuOrder,
    };

    onSubmit?.(submitData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>
          {section ? '섹션 수정' : '새 섹션 생성'}
        </h2>

        {/* 사용자 ID */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}
          >
            사용자 ID *
          </label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              borderColor: errors.userId ? '#f44336' : '#ddd',
            }}
            placeholder="사용자 ID를 입력하세요"
          />
          {errors.userId && (
            <div
              style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}
            >
              {errors.userId}
            </div>
          )}
        </div>

        {/* 이름 */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}
          >
            이름 *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              borderColor: errors.name ? '#f44336' : '#ddd',
            }}
            placeholder="섹션 이름을 입력하세요"
          />
          {errors.name && (
            <div
              style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}
            >
              {errors.name}
            </div>
          )}
        </div>

        {/* 순서 */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}
          >
            순서
          </label>
          <input
            type="number"
            name="menuOrder"
            value={formData.menuOrder}
            onChange={handleInputChange}
            min="0"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              borderColor: errors.menuOrder ? '#f44336' : '#ddd',
            }}
            placeholder="메뉴 순서를 입력하세요"
          />
          {errors.menuOrder && (
            <div
              style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}
            >
              {errors.menuOrder}
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              background: isLoading ? '#ccc' : '#2196f3',
              color: '#fff',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            {isLoading ? '저장 중...' : section ? '수정' : '생성'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
