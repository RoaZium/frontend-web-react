// entities/component/ui/List.tsx
import React, { useEffect } from 'react';
import { useComponentStore } from '../model/store';
import type { ComponentDto, ComponentFilter } from '../model/types';

interface ListProps {
  filters?: ComponentFilter;
  onComponentSelect?: (component: ComponentDto) => void;
}

const List: React.FC<ListProps> = ({ filters = {}, onComponentSelect }) => {
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
    <div style={{ padding: '16px' }}>
      <div
        style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}
      >
        컴포넌트 목록 ({components.length}개)
      </div>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {components.map((component, index) => (
          <div
            key={component.id}
            onClick={() => handleComponentSelect(component)}
            style={{
              padding: '12px 16px',
              borderBottom:
                index < components.length - 1 ? '1px solid #eee' : 'none',
              backgroundColor:
                selectedComponent?.id === component.id ? '#e3f2fd' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => {
              if (selectedComponent?.id !== component.id) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={e => {
              if (selectedComponent?.id !== component.id) {
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
                {component.name}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                카테고리: {component.category} | 슬라이드 ID:{' '}
                {component.slideId}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {new Date(component.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
