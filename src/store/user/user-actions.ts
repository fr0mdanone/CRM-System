import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../../api/auth";
import { AuthData, Profile, Token, UserRegistration } from "../../types/auth";
import { setNotification } from "../ui/ui-slice";
import axios from "axios";
import { logout } from "./user-slice";

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
  Token,
  { authData: AuthData; onSuccess: () => void },
  { rejectValue: string; dispatch: AppDispatch }
>(
  "user/loginUser",
  async ({ authData, onSuccess }, { dispatch, rejectWithValue }) => {
    try {
      const token = await loginUser(authData);
      dispatch(
        setNotification({
          status: "success",
          message: "Вы успешно вошли в систему!",
        }),
      );
      onSuccess();
      return token;
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
    const profile = await getUserProfile();
    return profile;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Что-то пошло не так...";
    return rejectWithValue(errorMessage);
  }
});
