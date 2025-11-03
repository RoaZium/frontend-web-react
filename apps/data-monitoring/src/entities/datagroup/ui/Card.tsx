// entities/datagroup/ui/Card.tsx
import React from 'react';
import type { DataGroupDto } from '../model/types';

interface CardProps {
  dataGroup: DataGroupDto;
  onSelect?: (dataGroup: DataGroupDto) => void;
  onEdit?: (dataGroup: DataGroupDto) => void;
  onDelete?: (dataGroup: DataGroupDto) => void;
  isSelected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  dataGroup,
  onSelect,
  onEdit,
  onDelete,
  isSelected = false,
}) => {
  const handleCardClick = () => {
    onSelect?.(dataGroup);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(dataGroup);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(dataGroup);
  };

  return (
    <div
      className={`datagroup-card ${isSelected ? 'selected' : ''}`}
      onClick={handleCardClick}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#e3f2fd' : '#fff',
        borderColor: isSelected ? '#2196f3' : '#ddd',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        className="datagroup-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
            {dataGroup.name}
          </h3>
        </div>
        <div
          className="datagroup-actions"
          style={{ display: 'flex', gap: '4px' }}
        >
          <button
            onClick={handleEditClick}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            수정
          </button>
          <button
            onClick={handleDeleteClick}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              border: '1px solid #f44336',
              borderRadius: '4px',
              background: '#fff',
              color: '#f44336',
              cursor: 'pointer',
            }}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="datagroup-details" style={{ marginTop: '12px' }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
          코드: <span style={{ fontWeight: '500' }}>{dataGroup.code}</span>
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
          순서: <span style={{ fontWeight: '500' }}>{dataGroup.menuOrder}</span>
        </div>
        <div style={{ fontSize: '12px', color: '#999' }}>
          생성: {new Date(dataGroup.createdAt).toLocaleDateString('ko-KR')}
        </div>
        <div style={{ fontSize: '12px', color: '#999' }}>
          수정: {new Date(dataGroup.updatedAt).toLocaleDateString('ko-KR')}
        </div>
      </div>
    </div>
  );
};

export default Card;
