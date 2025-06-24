// entities/component/api/api.ts
import axios from 'axios';
import type { ComponentDto, ComponentInput, ComponentFilter } from '../model/types';

const BASE_URL = 'http://127.0.0.1:8081/api/v1';

export const componentApi = {
  /**
   * 전체 컴포넌트 조회
   */
  getComponents: async (params: ComponentFilter = {}): Promise<ComponentDto[]> => {
    const { slideId, category, name } = params;
    const queryParams = new URLSearchParams();
    
    if (slideId) queryParams.append('slideId', slideId);
    if (category) queryParams.append('category', category);
    if (name) queryParams.append('name', name);
    
    const url = `${BASE_URL}/components${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axios.get<ComponentDto[]>(url);
    return response.data;
  },

  /**
   * 컴포넌트 조회 (ID)
   */
  getComponentById: async (id: string): Promise<ComponentDto> => {
    const response = await axios.get<ComponentDto>(`${BASE_URL}/components/${id}`);
    return response.data;
  },

  /**
   * 컴포넌트 생성
   */
  createComponent: async (componentData: ComponentInput): Promise<ComponentDto> => {
    const response = await axios.post<ComponentDto>(`${BASE_URL}/components`, componentData);
    return response.data;
  },

  /**
   * 컴포넌트 수정
   */
  updateComponent: async (id: string, componentData: ComponentInput): Promise<ComponentDto> => {
    const response = await axios.put<ComponentDto>(`${BASE_URL}/components/${id}`, componentData);
    return response.data;
  },

  /**
   * 컴포넌트 삭제
   */
  deleteComponent: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/components/${id}`);
  }
};