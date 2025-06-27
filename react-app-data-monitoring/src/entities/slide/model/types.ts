// Slide 엔티티 타입 정의

export interface SlideDto {
  id: string; // UUID format
  sectionId: string; // UUID format
  title: string;
  content: string;
  menuOrder: number;
  isVisible: boolean;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
}

// Slide 생성/수정을 위한 입력 타입 (ID 제외)
export interface SlideCreateRequest {
  sectionId: string;
  title: string;
  content: string;
  menuOrder: number;
  isVisible: boolean;
}

// Slide 수정을 위한 입력 타입 (일부 필드만 수정 가능)
export interface SlideUpdateRequest {
  sectionId?: string;
  title?: string;
  content?: string;
  menuOrder?: number;
  isVisible?: boolean;
}

// Slide 조회 필터 파라미터
export interface SlideQueryParams {
  sectionId?: string;
  title?: string;
  isVisible?: boolean;
}

// API 응답 타입
export interface SlideListResponse {
  data: SlideDto[];
}

export interface SlideResponse {
  data: SlideDto;
}

// API 에러 응답 타입
export interface ApiErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}
