// entities/slide/ui/List.tsx
import React, { useEffect } from 'react';
import { useSlideStore } from '../model/store';
import type { SlideDto, SlideQueryParams } from '../model/types';

interface ListProps {
  filters?: SlideQueryParams;
  onSlideSelect?: (slide: SlideDto) => void;
}

const List: React.FC<ListProps> = ({ filters = {}, onSlideSelect }) => {
  const {
    slides,
    isLoading,
    error,
    selectedSlide,
    fetchSlides,
    setSelectedSlide,
  } = useSlideStore();

  useEffect(() => {
    fetchSlides(filters);
  }, []);

  const handleSlideSelect = (slide: SlideDto) => {
    setSelectedSlide(slide);
    onSlideSelect?.(slide);
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

  if (slides.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div>슬라이드가 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}
      >
        슬라이드 목록 ({slides.length}개)
      </div>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => handleSlideSelect(slide)}
            style={{
              padding: '12px 16px',
              borderBottom:
                index < slides.length - 1 ? '1px solid #eee' : 'none',
              backgroundColor:
                selectedSlide?.id === slide.id ? '#e3f2fd' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedSlide?.id !== slide.id) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSlide?.id !== slide.id) {
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
                {slide.title}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                섹션 ID: {slide.sectionId} | 순서: {slide.menuOrder} | 상태:{' '}
                {slide.isVisible ? '표시' : '숨김'}
              </div>
              <div
                style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}
              >
                {slide.content.length > 50
                  ? `${slide.content.substring(0, 50)}...`
                  : slide.content}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {new Date(slide.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
