// entities/image/ui/Card.tsx
import React from 'react';
import type { ImageDto } from '../model/types';

interface CardProps {
  image: ImageDto;
  onSelect?: (image: ImageDto) => void;
  onEdit?: (image: ImageDto) => void;
  onDelete?: (imageId: string) => void;
  isSelected?: boolean;
}

const Card: React.FC<CardProps> = ({
  image,
  onSelect,
  onEdit,
  onDelete,
  isSelected = false,
}) => {
  const handleCardClick = () => {
    onSelect?.(image);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(image);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 이미지를 삭제하시겠습니까?')) {
      onDelete?.(image.id);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        backgroundColor: isSelected ? '#e3f2fd' : '#fff',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        minWidth: '300px',
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = '#fff';
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1 }}>
          {/* 이미지 미리보기 */}
          <div style={{ marginBottom: '12px', textAlign: 'center' }}>
            <img
              src={image.path}
              alt={image.name}
              style={{
                maxWidth: '100%',
                maxHeight: '150px',
                objectFit: 'contain',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
              onError={e => {
                e.currentTarget.src =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik02MCA0MEg5MFY2MEg2MFY0MFoiIGZpbGw9IiNEREREREQiLz4KPHRLEH1PSU50PSI3NSA1MCIgZmlsbD0iI0RERERERCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5JbWFnZTwvdGV4dD4KPC9zdmc+';
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginRight: '8px',
              }}
            >
              {image.name}
            </div>
          </div>

          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            경로: {image.path}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            파일 크기: {formatFileSize(image.size)}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            타입: {image.contentType}
          </div>

          <div style={{ fontSize: '12px', color: '#999' }}>
            생성일: {new Date(image.createdAt).toLocaleDateString('ko-KR')}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            수정일: {new Date(image.updatedAt).toLocaleDateString('ko-KR')}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginLeft: '12px',
          }}
        >
          {onEdit && (
            <button
              onClick={handleEditClick}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              수정
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDeleteClick}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
