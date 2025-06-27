// entities/dataitem/ui/Card.tsx
import React from 'react';
import type { DataItemDto } from '../model/types';

interface CardProps {
  dataItem: DataItemDto;
  onSelect?: (dataItem: DataItemDto) => void;
  onEdit?: (dataItem: DataItemDto) => void;
  onDelete?: (dataItemId: string) => void;
  isSelected?: boolean;
}

const Card: React.FC<CardProps> = ({
  dataItem,
  onSelect,
  onEdit,
  onDelete,
  isSelected = false,
}) => {
  const handleCardClick = () => {
    onSelect?.(dataItem);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(dataItem);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 데이터 아이템을 삭제하시겠습니까?')) {
      onDelete?.(dataItem.id);
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
        minWidth: '300px',
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
                fontSize: '16px',
                fontWeight: 'bold',
                marginRight: '8px',
              }}
            >
              {dataItem.name}
            </div>
            <div
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: '#2196f3',
                color: 'white',
              }}
            >
              {dataItem.code}
            </div>
          </div>

          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            그룹 ID: {dataItem.groupId}
          </div>

          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            메뉴 순서: {dataItem.menuOrder}
          </div>

          {dataItem.datasourceProperties && (
            <div
              style={{
                fontSize: '12px',
                color: '#666',
                marginBottom: '8px',
                padding: '4px 8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                fontFamily: 'monospace',
                wordBreak: 'break-all',
              }}
            >
              <strong>데이터소스:</strong> {dataItem.datasourceProperties}
            </div>
          )}

          <div style={{ fontSize: '12px', color: '#999' }}>
            생성일: {new Date(dataItem.createdAt).toLocaleDateString('ko-KR')}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            수정일: {new Date(dataItem.updatedAt).toLocaleDateString('ko-KR')}
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
