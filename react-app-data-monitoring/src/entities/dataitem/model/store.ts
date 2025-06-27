// entities/dataitem/model/store.ts
import { create } from 'zustand';
import { dataItemApi } from '../api/api';
import type { DataItemDto, DataItemInput, DataItemFilter } from './types';

interface DataItemState {
  // 상태
  dataItems: DataItemDto[];
  selectedDataItem: DataItemDto | null;
  isLoading: boolean;
  error: string | null;
  filters: DataItemFilter;

  // 액션
  fetchDataItems: (filters?: DataItemFilter) => Promise<DataItemDto[]>;
  fetchDataItemById: (id: string) => Promise<DataItemDto>;
  createDataItem: (dataItemData: DataItemInput) => Promise<DataItemDto>;
  updateDataItem: (id: string, dataItemData: DataItemInput) => Promise<DataItemDto>;
  deleteDataItem: (id: string) => Promise<void>;
  setSelectedDataItem: (dataItem: DataItemDto | null) => void;
  setFilters: (filters: Partial<DataItemFilter>) => void;
  resetState: () => void;
}

export const useDataItemStore = create<DataItemState>((set) => ({
  // 상태
  dataItems: [],
  selectedDataItem: null,
  isLoading: false,
  error: null,
  filters: {
    groupId: '',
    code: '',
    name: '',
    menuOrder: undefined
  },

  // 액션
  // 데이터 아이템 목록 조회
  fetchDataItems: async (filters: DataItemFilter = {}): Promise<DataItemDto[]> => {
    set({ isLoading: true, error: null });
    try {
      const dataItems = await dataItemApi.getDataItems(filters);
      set({ dataItems, isLoading: false });
      return dataItems;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 데이터 아이템 단일 조회
  fetchDataItemById: async (id: string): Promise<DataItemDto> => {
    set({ isLoading: true, error: null });
    try {
      const dataItem = await dataItemApi.getDataItemById(id);
      set({ selectedDataItem: dataItem, isLoading: false });
      return dataItem;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 데이터 아이템 생성
  createDataItem: async (dataItemData: DataItemInput): Promise<DataItemDto> => {
    set({ isLoading: true, error: null });
    try {
      const newDataItem = await dataItemApi.createDataItem(dataItemData);
      set((state) => ({
        dataItems: [...state.dataItems, newDataItem],
        isLoading: false
      }));
      return newDataItem;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 데이터 아이템 수정
  updateDataItem: async (id: string, dataItemData: DataItemInput): Promise<DataItemDto> => {
    set({ isLoading: true, error: null });
    try {
      const updatedDataItem = await dataItemApi.updateDataItem(id, dataItemData);
      set((state) => ({
        dataItems: state.dataItems.map(item => 
          item.id === id ? updatedDataItem : item
        ),
        selectedDataItem: state.selectedDataItem?.id === id ? updatedDataItem : state.selectedDataItem,
        isLoading: false
      }));
      return updatedDataItem;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 데이터 아이템 삭제
  deleteDataItem: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await dataItemApi.deleteDataItem(id);
      set((state) => ({
        dataItems: state.dataItems.filter(item => item.id !== id),
        selectedDataItem: state.selectedDataItem?.id === id ? null : state.selectedDataItem,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 선택된 데이터 아이템 설정
  setSelectedDataItem: (dataItem: DataItemDto | null) => {
    set({ selectedDataItem: dataItem });
  },

  // 필터 설정
  setFilters: (filters: Partial<DataItemFilter>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters }
    }));
  },

  // 상태 초기화
  resetState: () => {
    set({
      dataItems: [],
      selectedDataItem: null,
      isLoading: false,
      error: null,
      filters: {
        groupId: '',
        code: '',
        name: '',
        menuOrder: undefined
      }
    });
  }
}));
