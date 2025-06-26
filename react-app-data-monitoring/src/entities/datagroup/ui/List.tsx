// entities/datagroup/ui/List.tsx
import React, { useEffect } from 'react';
import { useDataGroupStore } from '../model/store';
import type { DataGroupDto, DataGroupQueryParams } from '../model/types';
import Card from './Card';

interface ListProps {
  filters?: DataGroupQueryParams;
  onDataGroupSelect?: (dataGroup: DataGroupDto) => void;
  onDataGroupEdit?: (dataGroup: DataGroupDto) => void;
  onDataGroupDelete?: (dataGroup: DataGroupDto) => void;
}

const List: React.FC<ListProps> = ({
  filters = {},
  onDataGroupSelect,
  onDataGroupEdit,
  onDataGroupDelete,
}) => {
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

  const handleDataGroupEdit = (dataGroup: DataGroupDto) => {
    onDataGroupEdit?.(dataGroup);
  };

  const handleDataGroupDelete = async (dataGroup: DataGroupDto) => {
    if (window.confirm(`"${dataGroup.name}" 데이터 그룹을 삭제하시겠습니까?`)) {
      try {
        await onDataGroupDelete?.(dataGroup);
      } catch (error) {
        alert('데이터 그룹 삭제 중 오류가 발생했습니다.');
      }
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

  if (dataGroups.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div>데이터 그룹이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="datagroup-list">
      <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        총 {dataGroups.length}개의 데이터 그룹
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {dataGroups.map((dataGroup) => (
          <Card
            key={dataGroup.id}
            dataGroup={dataGroup}
            isSelected={selectedDataGroup?.id === dataGroup.id}
            onSelect={handleDataGroupSelect}
            onEdit={handleDataGroupEdit}
            onDelete={handleDataGroupDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
