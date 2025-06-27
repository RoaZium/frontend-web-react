// entities/dataitem/api/api.ts
import axios from 'axios';
import { ENV } from '../../../shared/config/env';
import type {
  DataItemDto,
  DataItemInput,
  DataItemFilter
} from '../model/types';

export const dataItemApi = {
  /**
   * 전체 데이터 아이템 조회
   */
  getDataItems: async (params: DataItemFilter = {}): Promise<DataItemDto[]> => {
    const { groupId, code, name, menuOrder } = params;
    const queryParams = new URLSearchParams();
    
    if (groupId) queryParams.append('groupId', groupId);
    if (code) queryParams.append('code', code);
    if (name) queryParams.append('name', name);
    if (menuOrder !== undefined) queryParams.append('menuOrder', menuOrder.toString());
    
    const url = `${ENV.api.baseUrl}/v1/dataitems${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axios.get<DataItemDto[]>(url);
    return response.data;
  },

  /**
   * 데이터 아이템 조회 (ID)
   */
  getDataItemById: async (id: string): Promise<DataItemDto> => {
    const response = await axios.get<DataItemDto>(`${ENV.api.baseUrl}/v1/dataitems/${id}`);
    return response.data;
  },

  /**
   * 데이터 아이템 생성
   */
  createDataItem: async (dataItemData: DataItemInput): Promise<DataItemDto> => {
    const response = await axios.post<DataItemDto>(`${ENV.api.baseUrl}/v1/dataitems`, dataItemData);
    return response.data;
  },

  /**
   * 데이터 아이템 수정
   */
  updateDataItem: async (id: string, dataItemData: DataItemInput): Promise<DataItemDto> => {
    const response = await axios.put<DataItemDto>(`${ENV.api.baseUrl}/v1/dataitems/${id}`, dataItemData);
    return response.data;
  },

  /**
   * 데이터 아이템 삭제
   */
  deleteDataItem: async (id: string): Promise<void> => {
    await axios.delete(`${ENV.api.baseUrl}/v1/dataitems/${id}`);
  }
};
