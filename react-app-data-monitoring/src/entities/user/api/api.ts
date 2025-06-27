// entities/user/api/api.ts
import axios from 'axios';
import { ENV } from '../../../shared/config/env';
import type {
  UserDto,
  UserCreateRequest,
  UserUpdateRequest,
  UserQueryParams,
} from '../model/types';

export const userApi = {
  /**
   * 전체 사용자 조회
   */
  getUsers: async (params: UserQueryParams = {}): Promise<UserDto[]> => {
    const { email, name, role, isActive } = params;
    const queryParams = new URLSearchParams();
    
    if (email) queryParams.append('email', email);
    if (name) queryParams.append('name', name);
    if (role) queryParams.append('role', role);
    if (isActive !== undefined) queryParams.append('isActive', isActive.toString());
    
    const url = `${ENV.api.baseUrl}/v1/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axios.get<UserDto[]>(url);
    return response.data;
  },

  /**
   * 사용자 조회 (ID)
   */
  getUserById: async (id: string): Promise<UserDto> => {
    const response = await axios.get<UserDto>(`${ENV.api.baseUrl}/v1/users/${id}`);
    return response.data;
  },

  /**
   * 사용자 생성
   */
  createUser: async (userData: UserCreateRequest): Promise<UserDto> => {
    const response = await axios.post<UserDto>(`${ENV.api.baseUrl}/v1/users`, userData);
    return response.data;
  },

  /**
   * 사용자 수정
   */
  updateUser: async (id: string, userData: UserUpdateRequest): Promise<UserDto> => {
    const response = await axios.put<UserDto>(`${ENV.api.baseUrl}/v1/users/${id}`, userData);
    return response.data;
  },

  /**
   * 사용자 삭제
   */
  deleteUser: async (id: string): Promise<void> => {
    await axios.delete(`${ENV.api.baseUrl}/v1/users/${id}`);
  }
};