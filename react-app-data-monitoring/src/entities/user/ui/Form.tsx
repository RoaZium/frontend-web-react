// entities/user/ui/Form.tsx
import React, { useState, useEffect } from 'react';
import type { UserDto, UserCreateRequest, UserUpdateRequest } from '../model/types';

interface FormProps {
  user?: UserDto | null;
  onSubmit?: (data: UserCreateRequest | UserUpdateRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface FormData {
  email: string;
  name: string;
  role: 'admin' | 'user' | 'viewer';
  isActive: boolean;
}

interface FormErrors {
  email?: string;
  name?: string;
  role?: string;
}

const Form: React.FC<FormProps> = ({ 
  user = null, 
  onSubmit, 
  onCancel,
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    role: 'user',
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        name: user.name || '',
        role: user.role || 'user',
        isActive: user.isActive !== undefined ? user.isActive : true,
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = '이메일은 필수입니다.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.name.trim()) {
      newErrors.name = '이름은 필수입니다.';
    }

    if (!formData.role) {
      newErrors.role = '역할을 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | boolean = value;
    
    if (type === 'checkbox') {
      processedValue = (e.target as HTMLInputElement).checked;
    }
    
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

    const submitData = user 
      ? { ...formData } as UserUpdateRequest
      : { ...formData } as UserCreateRequest;

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
      <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>
        {user ? '사용자 수정' : '새 사용자 생성'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            이메일 *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.email ? '#f44336' : '#ddd'
            }}
            placeholder="이메일을 입력하세요"
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            이름 *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.name ? '#f44336' : '#ddd'
            }}
            placeholder="이름을 입력하세요"
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            역할 *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.role ? '#f44336' : '#ddd'
            }}
          >
            <option value="viewer">열람자</option>
            <option value="user">사용자</option>
            <option value="admin">관리자</option>
          </select>
          {errors.role && <div style={errorStyle}>{errors.role}</div>}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500' }}>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            활성 상태
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
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
            {isLoading ? '처리 중...' : (user ? '수정' : '생성')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
