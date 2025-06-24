/**
 * Component DTO 타입 정의
 */
export interface ComponentDto {
  id: string; // UUID string
  slideId: string; // UUID string (required)
  category: string; // string (required) - 'shape', 'chart', 'table', 'image'
  name: string; // string (required)
  arrangeJson?: string; // string (optional)
  dataJson?: string; // string (optional) 
  styleJson?: string; // string (optional)
  textJson?: string; // string (optional)
  createdAt: string; // date-time string (required)
  updatedAt: string; // date-time string (required)
}

/**
 * Component 생성/수정을 위한 입력 타입
 */
export interface ComponentInput {
  slideId: string;
  category: string;
  name: string;
  arrangeJson?: string;
  dataJson?: string;
  styleJson?: string;
  textJson?: string;
}

/**
 * Component 카테고리 상수
 */
export const COMPONENT_CATEGORIES = {
  SHAPE: 'shape',
  CHART: 'chart', 
  TABLE: 'table',
  IMAGE: 'image'
} as const;

export type ComponentCategory = typeof COMPONENT_CATEGORIES[keyof typeof COMPONENT_CATEGORIES];

/**
 * Component 필터 타입
 */
export interface ComponentFilter {
  slideId?: string; // UUID string (optional)
  category?: string; // string (optional)
  name?: string; // string (optional)
}