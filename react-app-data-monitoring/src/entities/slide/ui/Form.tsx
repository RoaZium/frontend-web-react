// entities/slide/ui/Form.tsx
import React, { useState, useEffect } from 'react';
import type {
  SlideDto,
  SlideCreateRequest,
  SlideUpdateRequest,
} from '../model/types';

interface FormProps {
  slide?: SlideDto | null;
  onSubmit?: (data: SlideCreateRequest | SlideUpdateRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface FormData {
  userId: string;
  presentationId: string;
  sectionId: string;
  name: string;
  menuOrder: number;
  presentationOrder: number;
  propertiesJson: string;
}

interface FormErrors {
  userId?: string;
  name?: string;
  menuOrder?: string;
}

const Form: React.FC<FormProps> = ({
  slide = null,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    presentationId: '',
    sectionId: '',
    name: '',
    menuOrder: 0,
    presentationOrder: 0,
    propertiesJson: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (slide) {
      setFormData({
        userId: slide.userId || '',
        presentationId: slide.presentationId || '',
        sectionId: slide.sectionId || '',
        name: slide.name || '',
        menuOrder: slide.menuOrder || 0,
        presentationOrder: slide.presentationOrder || 0,
        propertiesJson: slide.propertiesJson || '',
      });
    }
  }, [slide]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.userId.trim()) {
      newErrors.userId = '사용자 ID는 필수입니다.';
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;

    if (type === 'number') {
      processedValue = parseFloat(value) || 0;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));

    // 해당 필드의 에러 제거
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData: SlideCreateRequest | SlideUpdateRequest = {
      userId: formData.userId,
      presentationId: formData.presentationId || undefined,
      sectionId: formData.sectionId || undefined,
      name: formData.name,
      menuOrder: formData.menuOrder,
      presentationOrder: formData.presentationOrder || undefined,
      propertiesJson: formData.propertiesJson || undefined,
    };

    onSubmit?.(submitData);
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const errorStyle = {
    color: '#f44336',
    fontSize: '12px',
    marginTop: '4px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '24px', color: '#333' }}>
        {slide ? '슬라이드 수정' : '슬라이드 생성'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>사용자 ID *</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.userId ? '#f44336' : '#ddd',
            }}
            placeholder="사용자 ID를 입력하세요"
          />
          {errors.userId && <div style={errorStyle}>{errors.userId}</div>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>프레젠테이션 ID</label>
          <input
            type="text"
            name="presentationId"
            value={formData.presentationId}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="프레젠테이션 ID를 입력하세요 (선택사항)"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>섹션 ID</label>
          <input
            type="text"
            name="sectionId"
            value={formData.sectionId}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="섹션 ID를 입력하세요 (선택사항)"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>이름 *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.name ? '#f44336' : '#ddd',
            }}
            placeholder="슬라이드 이름을 입력하세요"
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>메뉴 순서 *</label>
          <input
            type="number"
            name="menuOrder"
            value={formData.menuOrder}
            onChange={handleInputChange}
            min="0"
            style={{
              ...inputStyle,
              borderColor: errors.menuOrder ? '#f44336' : '#ddd',
            }}
            placeholder="메뉴 순서를 입력하세요"
          />
          {errors.menuOrder && <div style={errorStyle}>{errors.menuOrder}</div>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>프레젠테이션 순서</label>
          <input
            type="number"
            name="presentationOrder"
            value={formData.presentationOrder}
            onChange={handleInputChange}
            min="0"
            style={inputStyle}
            placeholder="프레젠테이션 순서를 입력하세요 (선택사항)"
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>속성 JSON</label>
          <textarea
            name="propertiesJson"
            value={formData.propertiesJson}
            onChange={handleInputChange}
            rows={4}
            style={{
              ...inputStyle,
              resize: 'vertical',
              fontFamily: 'monospace',
            }}
            placeholder="JSON 형태의 속성을 입력하세요 (선택사항)"
          />
        </div>

        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff',
                color: '#666',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              취소
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: isLoading ? '#ccc' : '#2196f3',
              color: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isLoading ? '처리중...' : slide ? '수정' : '생성'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
