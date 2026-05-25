import { clearToken, setAccessToken } from "../../utils/auth";
import { publicApi, privateApi } from "../axios/axios";

import { UserRegistration, AuthData, Profile } from "../types/auth";

export const registerUser = async (
  data: UserRegistration,
): Promise<Profile> => {
  const response = await publicApi.post("/auth/signup", data);
  return response.data;
};

export const loginUser = async (data: AuthData): Promise<void> => {
  const response = await publicApi.post("/auth/signin", data);
  setAccessToken(response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
};

export const logoutUser = async (): Promise<void> => {
  try {
    await privateApi.post("/auth/logout");
  } finally {
    clearToken();
    localStorage.removeItem("refreshToken");
  }
};

export const fetchUserProfile = async (): Promise<Profile> => {
  const response = await privateApi.get("/user/profile");
  return response.data;
};

export const silentRefresh = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  const response = await publicApi.post("/auth/refresh", { refreshToken });
  const { accessToken, refreshToken: newRefreshToken } = response.data;
  setAccessToken(accessToken);
  localStorage.setItem("refreshToken", newRefreshToken);
};
