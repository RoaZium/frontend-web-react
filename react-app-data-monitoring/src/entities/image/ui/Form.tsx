// entities/image/ui/Form.tsx
import React, { useState, useEffect, useRef } from 'react';
import type {
  ImageDto,
  ImageCreateRequest,
  ImageUpdateRequest,
} from '../model/types';

interface FormProps {
  image?: ImageDto | null;
  onSubmit?: (data: ImageCreateRequest | ImageUpdateRequest) => void;
  onUpload?: (file: File) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface FormData {
  name: string;
  path: string;
  size: number;
  data?: string[];
  contentType: string;
}

interface FormErrors {
  name?: string;
  path?: string;
  contentType?: string;
}

const Form: React.FC<FormProps> = ({
  image = null,
  onSubmit,
  onUpload,
  onCancel,
  isLoading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    path: '',
    size: 0,
    data: undefined,
    contentType: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (image) {
      setFormData({
        name: image.name || '',
        path: image.path || '',
        size: image.size || 0,
        data: image.data,
        contentType: image.contentType || '',
      });
      setPreviewUrl(image.path || '');
    }
  }, [image]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름은 필수입니다.';
    }

    if (!formData.path.trim()) {
      newErrors.path = '경로는 필수입니다.';
    }

    if (!formData.contentType.trim()) {
      newErrors.contentType = 'Content Type은 필수입니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;

    if (name === 'size') {
      processedValue = parseInt(value) || 0;
    }

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 정보 자동 설정
      setFormData(prev => ({
        ...prev,
        name: file.name,
        size: file.size,
        contentType: file.type,
      }));

      // 이미지 미리보기
      const reader = new FileReader();
      reader.onload = event => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadFile = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      onUpload?.(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = image
      ? ({ ...formData } as ImageUpdateRequest)
      : ({ ...formData } as ImageCreateRequest);

    onSubmit?.(submitData);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        {image ? '이미지 수정' : '새 이미지 생성'}
      </h2>

      {/* 파일 업로드 섹션 */}
      {!image && onUpload && (
        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>
            파일 업로드
          </h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: '12px' }}
          />
          <button
            type="button"
            onClick={handleUploadFile}
            disabled={!fileInputRef.current?.files?.[0]}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            파일 업로드
          </button>
        </div>
      )}

      {/* 미리보기 */}
      {previewUrl && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>미리보기</h3>
          <img
            src={previewUrl}
            alt="미리보기"
            style={{
              maxWidth: '300px',
              maxHeight: '200px',
              objectFit: 'contain',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
      )}

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
            이름 *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.name ? '#f44336' : '#ddd',
            }}
            placeholder="이미지 이름을 입력하세요"
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
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
            경로 *
          </label>
          <input
            type="text"
            name="path"
            value={formData.path}
            onChange={handleInputChange}
            style={{
              ...inputStyle,
              borderColor: errors.path ? '#f44336' : '#ddd',
            }}
            placeholder="이미지 경로를 입력하세요"
          />
          {errors.path && <div style={errorStyle}>{errors.path}</div>}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              파일 크기 (bytes)
            </label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              min="0"
              style={inputStyle}
              placeholder="0"
            />
            {formData.size > 0 && (
              <div
                style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}
              >
                {formatFileSize(formData.size)}
              </div>
            )}
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Content Type *
            </label>
            <input
              type="text"
              name="contentType"
              value={formData.contentType}
              onChange={handleInputChange}
              style={{
                ...inputStyle,
                borderColor: errors.contentType ? '#f44336' : '#ddd',
              }}
              placeholder="image/jpeg"
            />
            {errors.contentType && (
              <div style={errorStyle}>{errors.contentType}</div>
            )}
          </div>
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
            {isLoading ? '처리 중...' : image ? '수정' : '생성'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
