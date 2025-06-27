// entities/section/ui/List.tsx
import React, { useEffect } from 'react';
import { useSectionStore } from '../model/store';
import type { SectionDto, SectionQueryParams } from '../model/types';

interface ListProps {
  filters?: SectionQueryParams;
  onSectionSelect?: (section: SectionDto) => void;
}

const List: React.FC<ListProps> = ({ filters = {}, onSectionSelect }) => {
  const {
    sections,
    isLoading,
    error,
    selectedSection,
    fetchSections,
    setSelectedSection,
  } = useSectionStore();

  useEffect(() => {
    fetchSections(filters);
  }, []);

  const handleSectionSelect = (section: SectionDto) => {
    setSelectedSection(section);
    onSectionSelect?.(section);
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

  if (sections.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div>섹션이 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}
      >
        섹션 목록 ({sections.length}개)
      </div>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {sections.map((section, index) => (
          <div
            key={section.id}
            onClick={() => handleSectionSelect(section)}
            style={{
              padding: '12px 16px',
              borderBottom:
                index < sections.length - 1 ? '1px solid #eee' : 'none',
              backgroundColor:
                selectedSection?.id === section.id ? '#e3f2fd' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => {
              if (selectedSection?.id !== section.id) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={e => {
              if (selectedSection?.id !== section.id) {
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
                {section.name}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                사용자 ID: {section.userId} | 순서: {section.menuOrder}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {new Date(section.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
