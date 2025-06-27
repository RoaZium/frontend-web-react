// entities/user/ui/List.tsx
import React, { useEffect } from 'react';
import { useUserStore } from '../model/store';
import type { UserDto, UserQueryParams } from '../model/types';

interface ListProps {
  filters?: UserQueryParams;
  onUserSelect?: (user: UserDto) => void;
}

const List: React.FC<ListProps> = ({ filters = {}, onUserSelect }) => {
  const { users, isLoading, error, selectedUser, fetchUsers, setSelectedUser } =
    useUserStore();

  useEffect(() => {
    fetchUsers(filters);
  }, []);

  const handleUserSelect = (user: UserDto) => {
    setSelectedUser(user);
    onUserSelect?.(user);
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

  if (users.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div>사용자가 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}
      >
        사용자 목록 ({users.length}개)
      </div>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {users.map((user, index) => (
          <div
            key={user.id}
            onClick={() => handleUserSelect(user)}
            style={{
              padding: '12px 16px',
              borderBottom:
                index < users.length - 1 ? '1px solid #eee' : 'none',
              backgroundColor:
                selectedUser?.id === user.id ? '#e3f2fd' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => {
              if (selectedUser?.id !== user.id) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={e => {
              if (selectedUser?.id !== user.id) {
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
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
              <div style={{ fontSize: '14px', color: '#666' }}>
                이메일: {user.email}
              </div>
              {user.lastLoginAt && (
                <div
                  style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}
                >
                  마지막 로그인:{' '}
                  {new Date(user.lastLoginAt).toLocaleDateString('ko-KR')}
                </div>
              )}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {new Date(user.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
