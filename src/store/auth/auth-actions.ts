import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import {
  fetchUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  silentRefresh,
} from "../../api/auth";
import { AuthData, Profile, UserRegistration } from "../../types/auth";
import { setNotification } from "../ui/ui-slice";
import axios from "axios";
import { logout } from "./auth-slice";

export const registerThunk = createAsyncThunk<
  Profile,
  { data: UserRegistration; onSuccess: () => void },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "user/registerUser",
  async ({ data, onSuccess }, { dispatch, rejectWithValue }) => {
    try {
      const response = await registerUser(data);
      dispatch(
        setNotification({
          status: "success",
          message: "Вы успешно зарегистрированы!",
        }),
      );
      onSuccess();
      return response;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Что-то пошло не так...";
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginThunk = createAsyncThunk<
  Profile,
  { authData: AuthData; onSuccess: () => void },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "user/loginUser",
  async ({ authData, onSuccess }, { dispatch, rejectWithValue }) => {
    try {
      await loginUser(authData);
      const profile = await fetchUserProfile();
      dispatch(
        setNotification({
          status: "success",
          message: "Вы успешно вошли в систему!",
        }),
      );
      onSuccess();
      return profile;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Что-то пошло не так...";
      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("user/logout", async (_, { dispatch }) => {
  try {
    await logoutUser();
    dispatch(
      setNotification({
        status: "success",
        message: "Вы успешно вышли из системы!",
      }),
    );
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    dispatch(setNotification({ status: "error", message: errorMessage }));
  } finally {
    dispatch(logout());
  }
});

export const getUserProfileThunk = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>("user/getProfile", async (_, { rejectWithValue }) => {
  try {
    const profile = await fetchUserProfile();
    return profile;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    return rejectWithValue(errorMessage);
  }
});

export const silentRefreshThunk = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>("user/silentRefresh", async (_, { dispatch, rejectWithValue }) => {
  try {
    await silentRefresh();
    const profile = await fetchUserProfile();
    return profile;
  } catch (error) {
    dispatch(logout());
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    dispatch(setNotification({ status: "error", message: errorMessage }));
    return rejectWithValue(errorMessage);
  }
});
