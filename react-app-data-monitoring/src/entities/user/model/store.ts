// entities/user/model/store.ts
import { create } from 'zustand';
import { userApi } from '../api/api';
import type { UserDto, UserCreateRequest, UserUpdateRequest, UserQueryParams } from './types';

interface UserState {
  // 상태
  users: UserDto[];
  selectedUser: UserDto | null;
  isLoading: boolean;
  error: string | null;
  filters: UserQueryParams;

  // 액션
  fetchUsers: (filters?: UserQueryParams) => Promise<UserDto[]>;
  fetchUserById: (id: string) => Promise<UserDto>;
  createUser: (userData: UserCreateRequest) => Promise<UserDto>;
  updateUser: (id: string, userData: UserUpdateRequest) => Promise<UserDto>;
  deleteUser: (id: string) => Promise<void>;
  setSelectedUser: (user: UserDto | null) => void;
  setFilters: (filters: Partial<UserQueryParams>) => void;
  resetState: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  // 상태
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  filters: {
    email: '',
    name: '',
    role: undefined,
    isActive: undefined
  },

  // 액션
  // 사용자 목록 조회
  fetchUsers: async (filters: UserQueryParams = {}): Promise<UserDto[]> => {
    set({ isLoading: true, error: null });
    try {
      const users = await userApi.getUsers(filters);
      set({ users, isLoading: false });
      return users;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 사용자 단일 조회
  fetchUserById: async (id: string): Promise<UserDto> => {
    set({ isLoading: true, error: null });
    try {
      const user = await userApi.getUserById(id);
      set({ selectedUser: user, isLoading: false });
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 사용자 생성
  createUser: async (userData: UserCreateRequest): Promise<UserDto> => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await userApi.createUser(userData);
      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false
      }));
      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 사용자 수정
  updateUser: async (id: string, userData: UserUpdateRequest): Promise<UserDto> => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userApi.updateUser(id, userData);
      set((state) => ({
        users: state.users.map(user =>
          user.id === id ? updatedUser : user
        ),
        selectedUser: state.selectedUser?.id === id ? updatedUser : state.selectedUser,
        isLoading: false
      }));
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 사용자 삭제
  deleteUser: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await userApi.deleteUser(id);
      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // 선택된 사용자 설정
  setSelectedUser: (user: UserDto | null) => {
    set({ selectedUser: user });
  },

  // 필터 설정
  setFilters: (filters: Partial<UserQueryParams>) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  // 상태 초기화
  resetState: () => {
    set({
      users: [],
      selectedUser: null,
      isLoading: false,
      error: null,
      filters: { email: '', name: '', role: undefined, isActive: undefined }
    });
  }
}));