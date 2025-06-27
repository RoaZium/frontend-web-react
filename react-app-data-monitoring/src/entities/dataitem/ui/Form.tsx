// entities/dataitem/ui/Form.tsx
import React, { useState, useEffect } from 'react';
import type { DataItemDto, DataItemInput } from '../model/types';

interface FormProps {
  dataItem?: DataItemDto | null;
  onSubmit?: (data: DataItemInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface FormData {
  groupId: string;
  code: string;
  name: string;
  menuOrder: number;
  datasourceProperties: string;
}

interface FormErrors {
  groupId?: string;
  code?: string;
  name?: string;
  menuOrder?: string;
}

const Form: React.FC<FormProps> = ({ 
  dataItem = null, 
  onSubmit, 
  onCancel,
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<FormData>({
    groupId: '',
    code: '',
    name: '',
    menuOrder: 0,
    datasourceProperties: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (dataItem) {
      setFormData({
        groupId: dataItem.groupId || '',
        code: dataItem.code || '',
        name: dataItem.name || '',
        menuOrder: dataItem.menuOrder || 0,
        datasourceProperties: dataItem.datasourceProperties || '',
      });
    }
  }, [dataItem]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.groupId.trim()) {
      newErrors.groupId = '그룹 ID는 필수입니다.';
    }

    if (!formData.code.trim()) {
      newErrors.code = '코드는 필수입니다.';
    }

    if (!formData.name.trim()) {
      newErrors.name = '이름은 필수입니다.';
    }

    if (formData.menuOrder < 0) {
      newErrors.menuOrder = '메뉴 순서는 0 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;

    if (type === 'number') {
      processedValue = parseFloat(value) || 0;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // 해당 필드의 에러 제거
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData: DataItemInput = {
      groupId: formData.groupId,
      code: formData.code,
      name: formData.name,
      menuOrder: formData.menuOrder,
      datasourceProperties: formData.datasourceProperties || undefined,
    };

    onSubmit?.(submitData);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h3>{dataItem ? '데이터 아이템 수정' : '데이터 아이템 생성'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            그룹 ID *
          </label>
          <input
            type="text"
            name="groupId"
            value={formData.groupId}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.groupId ? '1px solid #f44336' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
            placeholder="그룹 ID를 입력하세요"
          />
          {errors.groupId && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.groupId}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            코드 *
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.code ? '1px solid #f44336' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
            placeholder="코드를 입력하세요"
          />
          {errors.code && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.code}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            이름 *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.name ? '1px solid #f44336' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
            placeholder="이름을 입력하세요"
          />
          {errors.name && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            메뉴 순서 *
          </label>
          <input
            type="number"
            name="menuOrder"
            value={formData.menuOrder}
            onChange={handleInputChange}
            min="0"
            style={{
              width: '100%',
              padding: '8px',
              border: errors.menuOrder ? '1px solid #f44336' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
            placeholder="메뉴 순서를 입력하세요"
          />
          {errors.menuOrder && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.menuOrder}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            데이터소스 속성
          </label>
          <textarea
            name="datasourceProperties"
            value={formData.datasourceProperties}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical',
            }}
            placeholder="데이터소스 속성을 입력하세요 (선택사항)"
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
              }}
            >
              취소
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: isLoading ? '#ccc' : '#2196f3',
              color: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            {isLoading ? '처리중...' : (dataItem ? '수정' : '생성')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
