// Section 엔티티 타입 정의

export interface SectionDto {
  id: string; // UUID format
  userId: string; // UUID format
  name: string;
  menuOrder: number;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
}

// Section 생성/수정을 위한 입력 타입 (ID 제외)
export interface SectionCreateRequest {
  userId: string;
  name: string;
  menuOrder: number;
}

// Section 수정을 위한 입력 타입 (일부 필드만 수정 가능)
export interface SectionUpdateRequest {
  userId?: string;
  name?: string;
  menuOrder?: number;
}

// Section 조회 필터 파라미터
export interface SectionQueryParams {
  userId?: string;
  name?: string;
}

// API 응답 타입
export interface SectionListResponse {
  data: SectionDto[];
}

export interface SectionResponse {
  data: SectionDto;
}

// API 에러 응답 타입
export interface ApiErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}
