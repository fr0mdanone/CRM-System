import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/auth";
import {
  fetchUserProfileThunk,
  loginThunk,
  registerThunk,
  silentRefreshThunk,
} from "./auth-actions";
import { clearAccessToken } from "../../../utils/auth";

interface AuthState {
  isAuth: boolean;
  profile: User | null;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  isProfileLoading: boolean;
  isInitialized: boolean;
}

const authState: AuthState = {
  isAuth: false,
  profile: null,
  isLoginLoading: false,
  isRegisterLoading: false,
  isProfileLoading: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.profile = null;
      clearAccessToken();
      localStorage.removeItem("refreshToken");
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(silentRefreshThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(silentRefreshThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoading = false;
        state.isAuth = true;
        state.isInitialized = true;
      })
      .addCase(silentRefreshThunk.rejected, (state) => {
        state.profile = null;
        state.isProfileLoading = false;
        state.isAuth = false;
        state.isInitialized = true;
      })
      .addCase(loginThunk.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isAuth = true;
        state.isLoginLoading = false;
        state.isInitialized = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.profile = null;
        state.isAuth = false;
        state.isLoginLoading = false;
        state.isInitialized = true;
        clearAccessToken();
        localStorage.removeItem("refreshToken");
      })
      .addCase(registerThunk.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isRegisterLoading = false;
        state.isInitialized = true;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.profile = null;
        state.isRegisterLoading = false;
        state.isInitialized = true;
      })
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoading = false;
        state.isInitialized = true;
      })
      .addCase(fetchUserProfileThunk.rejected, (state) => {
        state.profile = null;
        state.isProfileLoading = false;
        state.isInitialized = true;
      });
  },
});

export const { logout, setInitialized } = authSlice.actions;

export default authSlice.reducer;
