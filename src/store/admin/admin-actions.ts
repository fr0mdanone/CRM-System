import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  MetaResponse,
  Roles,
  UserFilters,
  UserRolesRequest,
  UserRequest,
} from "../../types/admin";
import { User } from "../../types/auth";
import {
  blockUser,
  deleteUser,
  fetchAllUsers,
  fetchUserById,
  unblockUser,
  updateUserProfile,
  updateUserRoles,
} from "../../api/admin";
import axios from "axios";

const fetchAllUsersThunk = createAsyncThunk<
  MetaResponse<User>,
  UserFilters,
  { rejectValue: string }
>("admin/fetchAllUsers", async (filters, { rejectWithValue }) => {
  try {
    const response = await fetchAllUsers(filters);
    return response;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    return rejectWithValue(errorMessage);
  }
});

const blockUserThunk = createAsyncThunk<User, number, { rejectValue: string }>(
  "admin/blockUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await blockUser(id);
      return response;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Что-то пошло не так...";
      return rejectWithValue(errorMessage);
    }
  },
);

const unblockUserThunk = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>("admin/unblockUser", async (id, { rejectWithValue }) => {
  try {
    const response = await unblockUser(id);
    return response;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    return rejectWithValue(errorMessage);
  }
});

const deleteUserThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("admin/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await deleteUser(id);
    return id;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    return rejectWithValue(errorMessage);
  }
});

const updateUserRolesThunk = createAsyncThunk<
  User,
  { id: number; roles: Roles[] },
  { rejectValue: string }
>("admin/updateUserRoles", async (payload, { rejectWithValue }) => {
  try {
    const response = await updateUserRoles(payload.id, {
      roles: payload.roles,
    });
    return response;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    return rejectWithValue(errorMessage);
  }
});

const fetchUserByIdThunk = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>("admin/fetchUserById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchUserById(id);
    return response;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    return rejectWithValue(errorMessage);
  }
});

const updateUserProfileThunk = createAsyncThunk<
  User,
  { id: number; data: UserRequest },
  { rejectValue: string }
>("admin/updateUserProfile", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await updateUserProfile(id, data);
    return response;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    return rejectWithValue(errorMessage);
  }
});

export {
  fetchAllUsersThunk,
  blockUserThunk,
  unblockUserThunk,
  updateUserRolesThunk,
  deleteUserThunk,
  fetchUserByIdThunk,
  updateUserProfileThunk,
};
