// entities/datagroup/ui/List.tsx
import React, { useEffect } from 'react';
import { useDataGroupStore } from '../model/store';
import type { DataGroupDto, DataGroupQueryParams } from '../model/types';

interface ListProps {
  filters?: DataGroupQueryParams;
  onDataGroupSelect?: (dataGroup: DataGroupDto) => void;
}

const List: React.FC<ListProps> = ({ filters = {}, onDataGroupSelect }) => {
  const {
    dataGroups,
    isLoading,
    error,
    selectedDataGroup,
    fetchDataGroups,
    setSelectedDataGroup,
  } = useDataGroupStore();

  useEffect(() => {
    fetchDataGroups(filters);
  }, []);

  const handleDataGroupSelect = (dataGroup: DataGroupDto) => {
    setSelectedDataGroup(dataGroup);
    onDataGroupSelect?.(dataGroup);
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

  if (dataGroups.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div>데이터 그룹이 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}
      >
        데이터 그룹 목록 ({dataGroups.length}개)
      </div>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {dataGroups.map((dataGroup, index) => (
          <div
            key={dataGroup.id}
            onClick={() => handleDataGroupSelect(dataGroup)}
            style={{
              padding: '12px 16px',
              borderBottom:
                index < dataGroups.length - 1 ? '1px solid #eee' : 'none',
              backgroundColor:
                selectedDataGroup?.id === dataGroup.id ? '#e3f2fd' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedDataGroup?.id !== dataGroup.id) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedDataGroup?.id !== dataGroup.id) {
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  marginBottom: '4px',
                }}
              >
                {dataGroup.name}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                코드: {dataGroup.code} | 순서: {dataGroup.menuOrder}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {new Date(dataGroup.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
