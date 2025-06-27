// entities/dataitem/ui/List.tsx
import React, { useEffect } from 'react';
import { useDataItemStore } from '../model/store';
import type { DataItemDto, DataItemFilter } from '../model/types';

interface ListProps {
  filters?: DataItemFilter;
  onDataItemSelect?: (dataItem: DataItemDto) => void;
}

const List: React.FC<ListProps> = ({ filters = {}, onDataItemSelect }) => {
  const {
    dataItems,
    isLoading,
    error,
    selectedDataItem,
    fetchDataItems,
    setSelectedDataItem,
  } = useDataItemStore();

  useEffect(() => {
    fetchDataItems(filters);
  }, []);

  const handleDataItemSelect = (dataItem: DataItemDto) => {
    setSelectedDataItem(dataItem);
    onDataItemSelect?.(dataItem);
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
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <div>오류: {error}</div>
      </div>
    );
  }

  if (dataItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div>데이터 아이템이 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <h3>데이터 아이템 목록</h3>
      <div
        style={{
          display: 'grid',
          gap: '8px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        {dataItems.map((dataItem) => (
          <div
            key={dataItem.id}
            onClick={() => handleDataItemSelect(dataItem)}
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: selectedDataItem?.id === dataItem.id ? '#e3f2fd' : '#fff',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedDataItem?.id !== dataItem.id) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedDataItem?.id !== dataItem.id) {
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
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
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                데이터소스: {dataItem.datasourceProperties}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#999' }}>
              생성일: {new Date(dataItem.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
