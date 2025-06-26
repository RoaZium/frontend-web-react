// entities/component/ui/List.tsx
import React, { useEffect } from 'react';
import { useComponentStore } from '../model/store';
import type { ComponentDto, ComponentFilter } from '../model/types';
import Card from './Card';

interface ListProps {
  filters?: ComponentFilter;
  onComponentSelect?: (component: ComponentDto) => void;
  onComponentEdit?: (component: ComponentDto) => void;
  onComponentDelete?: (component: ComponentDto) => void;
}

const List: React.FC<ListProps> = ({
  filters = {},
  onComponentSelect,
  onComponentEdit,
  onComponentDelete,
}) => {
  const {
    components,
    isLoading,
    error,
    selectedComponent,
    fetchComponents,
    setSelectedComponent,
  } = useComponentStore();

  useEffect(() => {
    fetchComponents(filters);
  }, []);

  const handleComponentSelect = (component: ComponentDto) => {
    setSelectedComponent(component);
    onComponentSelect?.(component);
  };

  const handleComponentEdit = (component: ComponentDto) => {
    onComponentEdit?.(component);
  };

  const handleComponentDelete = async (component: ComponentDto) => {
    if (window.confirm(`"${component.name}" 컴포넌트를 삭제하시겠습니까?`)) {
      try {
        await onComponentDelete?.(component);
      } catch (error) {
        alert('컴포넌트 삭제 중 오류가 발생했습니다.');
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

  if (components.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div>컴포넌트가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="component-list">
      <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        총 {components.length}개의 컴포넌트
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {components.map((component) => (
          <Card
            key={component.id}
            component={component}
            isSelected={selectedComponent?.id === component.id}
            onSelect={handleComponentSelect}
            onEdit={handleComponentEdit}
            onDelete={handleComponentDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
