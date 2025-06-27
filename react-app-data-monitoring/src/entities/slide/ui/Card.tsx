// entities/slide/ui/Card.tsx
import React from 'react';
import type { SlideDto } from '../model/types';

interface CardProps {
  slide: SlideDto;
  onSelect?: (slide: SlideDto) => void;
  onEdit?: (slide: SlideDto) => void;
  onDelete?: (slideId: string) => void;
  isSelected?: boolean;
}

const Card: React.FC<CardProps> = ({
  slide,
  onSelect,
  onEdit,
  onDelete,
  isSelected = false,
}) => {
  const handleCardClick = () => {
    onSelect?.(slide);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(slide);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 슬라이드를 삭제하시겠습니까?')) {
      onDelete?.(slide.id);
    }
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
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
        }
      }}
      onMouseLeave={(e) => {
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginRight: '8px',
              }}
            >
              {slide.title}
            </div>
            <span
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: slide.isVisible ? '#4caf50' : '#f44336',
                color: 'white',
              }}
            >
              {slide.isVisible ? '표시' : '숨김'}
            </span>
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            섹션 ID: {slide.sectionId}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            순서: {slide.menuOrder}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#333',
              marginBottom: '8px',
              lineHeight: '1.4',
              maxHeight: '60px',
              overflow: 'hidden',
            }}
          >
            {slide.content.length > 100
              ? `${slide.content.substring(0, 100)}...`
              : slide.content}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            생성일: {new Date(slide.createdAt).toLocaleDateString('ko-KR')}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            수정일: {new Date(slide.updatedAt).toLocaleDateString('ko-KR')}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
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
