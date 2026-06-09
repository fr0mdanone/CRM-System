import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../index";
import {
  fetchUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  silentRefreshToken,
} from "../../api/auth";
import { AuthData, User, UserRegistration } from "../../types/auth";
import { setNotification } from "../ui/ui-slice";
import axios from "axios";
import { logout, setInitialized } from "./auth-slice";

export const registerThunk = createAsyncThunk<
  User,
  { data: UserRegistration; onSuccess: () => void },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "auth/registerUser",
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
  User,
  { authData: AuthData; onSuccess: () => void },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "auth/loginUser",
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
>("auth/logout", async (_, { dispatch }) => {
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

export const fetchUserProfileThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchProfile", async (_, { rejectWithValue }) => {
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
  User,
  void,
  { rejectValue: string }
>("auth/silentRefreshToken", async (_, { dispatch, rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    dispatch(setInitialized());
    return rejectWithValue("Нет рефреш токена");
  }

  try {
    await silentRefreshToken();
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
