// User 엔티티 타입 정의

export interface UserDto {
  id: string; // UUID format
  email: string;
  name: string;
  role: 'admin' | 'user' | 'viewer';
  isActive: boolean;
  lastLoginAt: string | null; // ISO date-time string
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
}

// User 생성/수정을 위한 입력 타입 (ID 제외)
export interface UserCreateRequest {
  email: string;
  name: string;
  role: 'admin' | 'user' | 'viewer';
  isActive: boolean;
}

// User 수정을 위한 입력 타입 (일부 필드만 수정 가능)
export interface UserUpdateRequest {
  email?: string;
  name?: string;
  role?: 'admin' | 'user' | 'viewer';
  isActive?: boolean;
}

// User 조회 필터 파라미터
export interface UserQueryParams {
  email?: string;
  name?: string;
  role?: 'admin' | 'user' | 'viewer';
  isActive?: boolean;
}

// API 응답 타입
export interface UserListResponse {
  data: UserDto[];
}

export interface UserResponse {
  data: UserDto;
}

// API 에러 응답 타입
export interface ApiErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}