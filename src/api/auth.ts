import { clearToken, setAccessToken } from "../../utils/auth";
import { publicApi, privateApi } from "../axios/axios";

import {
  UserRegistration,
  AuthData,
  RefreshToken,
  Profile,
  ProfileRequest,
  PasswordRequest,
  Token,
  Role,
} from "../types/auth";

export const registerUser = async (
  data: UserRegistration,
): Promise<Profile> => {
  const response = await publicApi.post("/auth/signup", data);
  return response.data;
};

export const loginUser = async (data: AuthData): Promise<Token> => {
  const response = await publicApi.post("/auth/signin", data);
  setAccessToken(response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await privateApi.post("/auth/logout");
  } finally {
    clearToken();
    localStorage.removeItem("refreshToken");
  }
};

export const getUserProfile = async (): Promise<Profile> => {
  const response = await privateApi.get("/user/profile");
  return response.data;
};
