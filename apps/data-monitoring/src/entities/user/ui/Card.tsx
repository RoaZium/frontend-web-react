// entities/user/ui/Card.tsx
import React from 'react';
import type { UserDto } from '../model/types';

interface CardProps {
  user: UserDto;
  onSelect?: (user: UserDto) => void;
  onEdit?: (user: UserDto) => void;
  onDelete?: (userId: string) => void;
  isSelected?: boolean;
}

const Card: React.FC<CardProps> = ({
  user,
  onSelect,
  onEdit,
  onDelete,
  isSelected = false,
}) => {
  const handleCardClick = () => {
    onSelect?.(user);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(user);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      onDelete?.(user.id);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return '#f44336';
      case 'user':
        return '#2196f3';
      case 'viewer':
        return '#4caf50';
      default:
        return '#666';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return '관리자';
      case 'user':
        return '사용자';
      case 'viewer':
        return '열람자';
      default:
        return role;
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
              {user.name}
            </div>
            <span
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: getRoleColor(user.role),
                color: 'white',
                marginRight: '8px',
              }}
            >
              {getRoleText(user.role)}
            </span>
            <span
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: user.isActive ? '#4caf50' : '#f44336',
                color: 'white',
              }}
            >
              {user.isActive ? '활성' : '비활성'}
            </span>
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            이메일: {user.email}
          </div>
          {user.lastLoginAt && (
            <div
              style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}
            >
              마지막 로그인:{' '}
              {new Date(user.lastLoginAt).toLocaleDateString('ko-KR')}
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#999' }}>
            생성일: {new Date(user.createdAt).toLocaleDateString('ko-KR')}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            수정일: {new Date(user.updatedAt).toLocaleDateString('ko-KR')}
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
