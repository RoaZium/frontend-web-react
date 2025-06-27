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
  sectionId: string;
  title: string;
  content: string;
  menuOrder: number;
  isVisible: boolean;
}

interface FormErrors {
  sectionId?: string;
  title?: string;
  content?: string;
  menuOrder?: string;
}

const Form: React.FC<FormProps> = ({
  slide = null,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    sectionId: '',
    title: '',
    content: '',
    menuOrder: 0,
    isVisible: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (slide) {
      setFormData({
        sectionId: slide.sectionId || '',
        title: slide.title || '',
        content: slide.content || '',
        menuOrder: slide.menuOrder || 0,
        isVisible: slide.isVisible !== undefined ? slide.isVisible : true,
      });
    }
  }, [slide]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.sectionId.trim()) {
      newErrors.sectionId = '섹션 ID는 필수입니다.';
    }

    if (!formData.title.trim()) {
      newErrors.title = '제목은 필수입니다.';
    }

    if (!formData.content.trim()) {
      newErrors.content = '내용은 필수입니다.';
    }

    if (formData.menuOrder < 0) {
      newErrors.menuOrder = '순서는 0 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let processedValue: string | number | boolean = value;

    if (name === 'menuOrder') {
      processedValue = parseInt(value) || 0;
    } else if (type === 'checkbox') {
      processedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // 에러 상태 클리어
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
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

    const submitData = slide
      ? ({ ...formData } as SlideUpdateRequest)
      : ({ ...formData } as SlideCreateRequest);

    onSubmit?.(submitData);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  const errorStyle: React.CSSProperties = {
    color: '#f44336',
    fontSize: '12px',
    marginTop: '4px',
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px' }}>
      <h2
        style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}
      >
        {slide ? '슬라이드 수정' : '새 슬라이드 생성'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            섹션 ID *
          </label>
          <input
            type="text"
            name="sectionId"
            value={formData.sectionId}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.sectionId ? '#f44336' : '#ddd',
            }}
            placeholder="섹션 ID를 입력하세요"
          />
          {errors.sectionId && <div style={errorStyle}>{errors.sectionId}</div>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            제목 *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.title ? '#f44336' : '#ddd',
            }}
            placeholder="슬라이드 제목을 입력하세요"
          />
          {errors.title && <div style={errorStyle}>{errors.title}</div>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            내용 *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={5}
            style={{
              ...inputStyle,
              borderColor: errors.content ? '#f44336' : '#ddd',
              resize: 'vertical',
            }}
            placeholder="슬라이드 내용을 입력하세요"
          />
          {errors.content && <div style={errorStyle}>{errors.content}</div>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            메뉴 순서
          </label>
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
            placeholder="0"
          />
          {errors.menuOrder && <div style={errorStyle}>{errors.menuOrder}</div>}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            표시 여부
          </label>
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
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff',
                color: '#333',
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
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: isLoading ? '#ccc' : '#2196f3',
              color: '#fff',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            {isLoading ? '처리 중...' : slide ? '수정' : '생성'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
