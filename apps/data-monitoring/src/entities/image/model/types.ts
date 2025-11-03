// Image 엔티티 타입 정의

export interface ImageDto {
  id: string; // UUID format
  name: string;
  path: string;
  size: number; // int64
  data?: string[]; // byte array (optional)
  contentType: string;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
}

// Image 생성/수정을 위한 입력 타입 (ID 제외)
export interface ImageCreateRequest {
  name: string;
  path: string;
  size: number;
  data?: string[];
  contentType: string;
}

// Image 수정을 위한 입력 타입 (일부 필드만 수정 가능)
export interface ImageUpdateRequest {
  name?: string;
  path?: string;
  size?: number;
  data?: string[];
  contentType?: string;
}

// Image 조회 필터 파라미터
export interface ImageQueryParams {
  name?: string;
  path?: string;
  contentType?: string;
  size?: number;
}

// API 응답 타입
export interface ImageListResponse {
  data: ImageDto[];
}

export interface ImageResponse {
  data: ImageDto;
}

// API 에러 응답 타입
export interface ApiErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}
