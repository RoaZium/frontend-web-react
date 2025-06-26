// entities/datagroup/model/store.ts
import { create } from 'zustand';
import { dataGroupApi } from '../api/api';
import type { DataGroupDto, DataGroupCreateRequest, DataGroupUpdateRequest, DataGroupQueryParams } from './types';

interface DataGroupState {
  // 상태
  dataGroups: DataGroupDto[];
  selectedDataGroup: DataGroupDto | null;
  isLoading: boolean;
  error: string | null;
  filters: DataGroupQueryParams;

  // 액션
  fetchDataGroups: (filters?: DataGroupQueryParams) => Promise<DataGroupDto[]>;
  fetchDataGroupById: (id: string) => Promise<DataGroupDto>;
  createDataGroup: (dataGroupData: DataGroupCreateRequest) => Promise<DataGroupDto>;
  updateDataGroup: (id: string, dataGroupData: DataGroupUpdateRequest) => Promise<DataGroupDto>;
  deleteDataGroup: (id: string) => Promise<void>;
  setSelectedDataGroup: (dataGroup: DataGroupDto | null) => void;
  setFilters: (filters: Partial<DataGroupQueryParams>) => void;
  resetState: () => void;
}

export const useDataGroupStore = create<DataGroupState>((set, get) => ({
  // 상태
  dataGroups: [],
  selectedDataGroup: null,
  isLoading: false,
  error: null,
  filters: {
    code: '',
    name: ''
  },

  // 액션
  // 데이터 그룹 목록 조회
  fetchDataGroups: async (filters: DataGroupQueryParams = {}): Promise<DataGroupDto[]> => {
    set({ isLoading: true, error: null });
    try {
      const dataGroups = await dataGroupApi.getDataGroups(filters);
      set({ dataGroups, isLoading: false });
      return dataGroups;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 데이터 그룹 단일 조회
  fetchDataGroupById: async (id: string): Promise<DataGroupDto> => {
    set({ isLoading: true, error: null });
    try {
      const dataGroup = await dataGroupApi.getDataGroupById(id);
      set({ selectedDataGroup: dataGroup, isLoading: false });
      return dataGroup;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 데이터 그룹 생성
  createDataGroup: async (dataGroupData: DataGroupCreateRequest): Promise<DataGroupDto> => {
    set({ isLoading: true, error: null });
    try {
      const newDataGroup = await dataGroupApi.createDataGroup(dataGroupData);
      set((state) => ({
        dataGroups: [...state.dataGroups, newDataGroup],
        isLoading: false
      }));
      return newDataGroup;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 데이터 그룹 수정
  updateDataGroup: async (id: string, dataGroupData: DataGroupUpdateRequest): Promise<DataGroupDto> => {
    set({ isLoading: true, error: null });
    try {
      const updatedDataGroup = await dataGroupApi.updateDataGroup(id, dataGroupData);
      set((state) => ({
        dataGroups: state.dataGroups.map(dataGroup =>
          dataGroup.id === id ? updatedDataGroup : dataGroup
        ),
        selectedDataGroup: state.selectedDataGroup?.id === id ? updatedDataGroup : state.selectedDataGroup,
        isLoading: false
      }));
      return updatedDataGroup;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 데이터 그룹 삭제
  deleteDataGroup: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await dataGroupApi.deleteDataGroup(id);
      set((state) => ({
        dataGroups: state.dataGroups.filter(dataGroup => dataGroup.id !== id),
        selectedDataGroup: state.selectedDataGroup?.id === id ? null : state.selectedDataGroup,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 선택된 데이터 그룹 설정
  setSelectedDataGroup: (dataGroup: DataGroupDto | null) => {
    set({ selectedDataGroup: dataGroup });
  },

  // 필터 설정
  setFilters: (filters: Partial<DataGroupQueryParams>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  // 상태 초기화
  resetState: () => {
    set({
      dataGroups: [],
      selectedDataGroup: null,
      isLoading: false,
      error: null,
      filters: { code: '', name: '' }
    });
  }
}));
