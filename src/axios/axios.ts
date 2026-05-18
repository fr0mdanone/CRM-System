import axios from "axios";
import { BASE_URL } from "../constants/todos.constants";
import { logout } from "../store/user/user-slice";
import { store } from "../store";

export const publicApi = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: 5000,
});

export const privateApi = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: 5000,
});

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await publicApi.post("/auth/refresh", {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return privateApi(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
