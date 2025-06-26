// entities/datagroup/ui/Form.tsx
import React, { useState, useEffect } from 'react';
import type { DataGroupDto, DataGroupCreateRequest, DataGroupUpdateRequest } from '../model/types';

interface FormProps {
  dataGroup?: DataGroupDto | null;
  onSubmit?: (data: DataGroupCreateRequest | DataGroupUpdateRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface FormData {
  code: string;
  name: string;
  menuOrder: number;
}

interface FormErrors {
  code?: string;
  name?: string;
  menuOrder?: string;
}

const Form: React.FC<FormProps> = ({ 
  dataGroup = null, 
  onSubmit, 
  onCancel,
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<FormData>({
    code: '',
    name: '',
    menuOrder: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (dataGroup) {
      setFormData({
        code: dataGroup.code || '',
        name: dataGroup.name || '',
        menuOrder: dataGroup.menuOrder || 0,
      });
    }
  }, [dataGroup]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = '코드는 필수입니다.';
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
      [name]: processedValue
    }));

    // 에러 상태 클리어
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData: DataGroupCreateRequest | DataGroupUpdateRequest = {
      code: formData.code,
      name: formData.name,
      menuOrder: formData.menuOrder
    };

    onSubmit?.(submitData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>
          {dataGroup ? '데이터 그룹 수정' : '새 데이터 그룹 생성'}
        </h2>

        {/* 코드 */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            코드 *
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              borderColor: errors.code ? '#f44336' : '#ddd'
            }}
            placeholder="데이터 그룹 코드를 입력하세요"
          />
          {errors.code && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.code}
            </div>
          )}
        </div>

        {/* 이름 */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
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
              borderColor: errors.name ? '#f44336' : '#ddd'
            }}
            placeholder="데이터 그룹 이름을 입력하세요"
          />
          {errors.name && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.name}
            </div>
          )}
        </div>

        {/* 순서 */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
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
              borderColor: errors.menuOrder ? '#f44336' : '#ddd'
            }}
            placeholder="메뉴 순서를 입력하세요"
          />
          {errors.menuOrder && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.menuOrder}
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#fff',
              cursor: 'pointer',
              fontSize: '14px'
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
              fontSize: '14px'
            }}
          >
            {isLoading ? '저장 중...' : (dataGroup ? '수정' : '생성')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
