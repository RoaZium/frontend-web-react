// entities/image/ui/List.tsx
import React, { useEffect } from 'react';
import { useImageStore } from '../model/store';
import type { ImageDto, ImageQueryParams } from '../model/types';

interface ListProps {
  filters?: ImageQueryParams;
  onImageSelect?: (image: ImageDto) => void;
}

const List: React.FC<ListProps> = ({ filters = {}, onImageSelect }) => {
  const {
    images,
    isLoading,
    error,
    selectedImage,
    fetchImages,
    setSelectedImage,
  } = useImageStore();

  useEffect(() => {
    fetchImages(filters);
  }, []);

  const handleImageSelect = (image: ImageDto) => {
    setSelectedImage(image);
    onImageSelect?.(image);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#f44336' }}>
        <div>오류가 발생했습니다: {error}</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div>이미지가 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}
      >
        이미지 목록 ({images.length}개)
      </div>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => handleImageSelect(image)}
            style={{
              padding: '12px 16px',
              borderBottom:
                index < images.length - 1 ? '1px solid #eee' : 'none',
              backgroundColor:
                selectedImage?.id === image.id ? '#e3f2fd' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedImage?.id !== image.id) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedImage?.id !== image.id) {
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '12px' }}>
                <img
                  src={image.path}
                  alt={image.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+';
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    marginBottom: '4px',
                  }}
                >
                  {image.name}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  경로: {image.path}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                  {formatFileSize(image.size)} | {image.contentType}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {new Date(image.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
