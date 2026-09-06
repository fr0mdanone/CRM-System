import { privateApi } from "../axios/axios";
import {
  MetaResponse,
  UserFilters,
  UserRequest,
  UserRolesRequest,
} from "../types/admin";
import { User } from "../types/auth";

export const fetchAllUsers = async (
  filters: UserFilters,
): Promise<MetaResponse<User>> => {
  const response = await privateApi.get<MetaResponse<User>>("/admin/users", {
    params: filters,
  });
  return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await privateApi.get<User>(`/admin/users/${id}`);
  return response.data;
};

export const updateUserProfile = async (
  id: number,
  data: UserRequest,
): Promise<User> => {
  const response = await privateApi.put<User>(`/admin/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await privateApi.delete<string>(`/admin/users/${id}`);
};

export const blockUser = async (id: number): Promise<User> => {
  const response = await privateApi.post<User>(`/admin/users/${id}/block`);
  return response.data;
};

export const unblockUser = async (id: number): Promise<User> => {
  const response = await privateApi.post<User>(`/admin/users/${id}/unblock`);
  return response.data;
};

export const updateUserRoles = async (
  id: number,
  data: UserRolesRequest,
): Promise<User> => {
  const response = await privateApi.post<User>(
    `/admin/users/${id}/rights`,
    data,
  );
  return response.data;
};
