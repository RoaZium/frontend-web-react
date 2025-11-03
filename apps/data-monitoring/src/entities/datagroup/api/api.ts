// entities/datagroup/api/api.ts
import axios from 'axios';
import { ENV } from '../../../shared/config/env';
import type {
  DataGroupDto,
  DataGroupCreateRequest,
  DataGroupUpdateRequest,
  DataGroupQueryParams,
} from '../model/types';

export const dataGroupApi = {
  /**
   * 전체 데이터 그룹 조회
   */
  getDataGroups: async (
    params: DataGroupQueryParams = {}
  ): Promise<DataGroupDto[]> => {
    const { code, name } = params;
    const queryParams = new URLSearchParams();

    if (code) queryParams.append('code', code);
    if (name) queryParams.append('name', name);

    const url = `${ENV.api.baseUrl}/v1/datagroups${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axios.get<DataGroupDto[]>(url);
    return response.data;
  },

  /**
   * 데이터 그룹 조회 (ID)
   */
  getDataGroupById: async (id: string): Promise<DataGroupDto> => {
    const response = await axios.get<DataGroupDto>(
      `${ENV.api.baseUrl}/v1/datagroups/${id}`
    );
    return response.data;
  },

  /**
   * 데이터 그룹 생성
   */
  createDataGroup: async (
    dataGroupData: DataGroupCreateRequest
  ): Promise<DataGroupDto> => {
    const response = await axios.post<DataGroupDto>(
      `${ENV.api.baseUrl}/v1/datagroups`,
      dataGroupData
    );
    return response.data;
  },

  /**
   * 데이터 그룹 수정
   */
  updateDataGroup: async (
    id: string,
    dataGroupData: DataGroupUpdateRequest
  ): Promise<DataGroupDto> => {
    const response = await axios.put<DataGroupDto>(
      `${ENV.api.baseUrl}/v1/datagroups/${id}`,
      dataGroupData
    );
    return response.data;
  },

  /**
   * 데이터 그룹 삭제
   */
  deleteDataGroup: async (id: string): Promise<void> => {
    await axios.delete(`${ENV.api.baseUrl}/v1/datagroups/${id}`);
  },
};
