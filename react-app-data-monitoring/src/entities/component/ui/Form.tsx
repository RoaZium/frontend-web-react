// entities/component/ui/Form.tsx
import React, { useState, useEffect } from 'react';
import type { ComponentDto, ComponentInput } from '../model/types';
import { COMPONENT_CATEGORIES } from '../model/types';

interface FormProps {
  component?: ComponentDto | null;
  slideId?: string;
  onSubmit?: (data: ComponentInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface FormData {
  slideId: string;
  category: string;
  name: string;
  arrangeJson: string;
  dataJson: string;
  styleJson: string;
  textJson: string;
}

interface FormErrors {
  slideId?: string;
  category?: string;
  name?: string;
}

const Form: React.FC<FormProps> = ({ 
  component = null, 
  slideId = '',
  onSubmit, 
  onCancel,
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<FormData>({
    slideId: slideId,
    category: '',
    name: '',
    arrangeJson: '',
    dataJson: '',
    styleJson: '',
    textJson: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (component) {
      setFormData({
        slideId: component.slideId || slideId,
        category: component.category || '',
        name: component.name || '',
        arrangeJson: component.arrangeJson || '',
        dataJson: component.dataJson || '',
        styleJson: component.styleJson || '',
        textJson: component.textJson || ''
      });
    }
  }, [component, slideId]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.slideId.trim()) {
      newErrors.slideId = '슬라이드 ID는 필수입니다.';
    }

    if (!formData.category.trim()) {
      newErrors.category = '카테고리는 필수입니다.';
    }

    if (!formData.name.trim()) {
      newErrors.name = '컴포넌트 이름은 필수입니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    const submitData: ComponentInput = {
      slideId: formData.slideId,
      category: formData.category,
      name: formData.name,
      arrangeJson: formData.arrangeJson || undefined,
      dataJson: formData.dataJson || undefined,
      styleJson: formData.styleJson || undefined,
      textJson: formData.textJson || undefined
    };

    onSubmit?.(submitData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>
          {component ? '컴포넌트 수정' : '새 컴포넌트 생성'}
        </h2>

        {/* 슬라이드 ID */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            슬라이드 ID *
          </label>
          <input
            type="text"
            name="slideId"
            value={formData.slideId}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              borderColor: errors.slideId ? '#f44336' : '#ddd'
            }}
            placeholder="슬라이드 ID를 입력하세요"
          />
          {errors.slideId && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.slideId}
            </div>
          )}
        </div>

        {/* 카테고리 */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            카테고리 *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              borderColor: errors.category ? '#f44336' : '#ddd'
            }}
          >
            <option value="">카테고리를 선택하세요</option>
            <option value={COMPONENT_CATEGORIES.SHAPE}>Shape</option>
            <option value={COMPONENT_CATEGORIES.CHART}>Chart</option>
            <option value={COMPONENT_CATEGORIES.TABLE}>Table</option>
            <option value={COMPONENT_CATEGORIES.IMAGE}>Image</option>
          </select>
          {errors.category && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.category}
            </div>
          )}
        </div>

        {/* 컴포넌트 이름 */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            컴포넌트 이름 *
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
            placeholder="컴포넌트 이름을 입력하세요"
          />
          {errors.name && (
            <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
              {errors.name}
            </div>
          )}
        </div>

        {/* JSON 필드들 */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            배치 정보 (JSON)
          </label>
          <textarea
            name="arrangeJson"
            value={formData.arrangeJson}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
            placeholder='{"x": 0, "y": 0, "width": 100, "height": 100}'
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            데이터 정보 (JSON)
          </label>
          <textarea
            name="dataJson"
            value={formData.dataJson}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
            placeholder='{"source": "api", "endpoint": "/data"}'
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            스타일 정보 (JSON)
          </label>
          <textarea
            name="styleJson"
            value={formData.styleJson}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
            placeholder='{"backgroundColor": "#ffffff", "borderColor": "#000000"}'
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            텍스트 정보 (JSON)
          </label>
          <textarea
            name="textJson"
            value={formData.textJson}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
            placeholder='{"fontSize": 14, "fontFamily": "Arial", "color": "#000000"}'
          />
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
            {isLoading ? '저장 중...' : (component ? '수정' : '생성')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;