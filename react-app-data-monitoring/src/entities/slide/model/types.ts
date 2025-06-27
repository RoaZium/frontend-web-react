// Slide 엔티티 타입 정의

export interface SlideDto {
  id: string; // UUID format
  userId: string; // UUID format
  presentationId?: string; // UUID format (optional)
  sectionId?: string; // UUID format (optional)
  name: string;
  menuOrder: number; // int32
  presentationOrder?: number; // int32 (optional)
  propertiesJson?: string; // optional
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
}

// Slide 생성/수정을 위한 입력 타입 (ID 제외)
export interface SlideCreateRequest {
  userId: string;
  presentationId?: string;
  sectionId?: string;
  name: string;
  menuOrder: number;
  presentationOrder?: number;
  propertiesJson?: string;
}

// Slide 수정을 위한 입력 타입 (일부 필드만 수정 가능)
export interface SlideUpdateRequest {
  userId?: string;
  presentationId?: string;
  sectionId?: string;
  name?: string;
  menuOrder?: number;
  presentationOrder?: number;
  propertiesJson?: string;
}

// Slide 조회 필터 파라미터
export interface SlideQueryParams {
  userId?: string;
  presentationId?: string;
  sectionId?: string;
  name?: string;
  menuOrder?: number;
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
