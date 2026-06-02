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
}

const authState: AuthState = {
  isAuth: false,
  profile: null,
  isLoginLoading: false,
  isRegisterLoading: false,
  isProfileLoading: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(silentRefreshThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(silentRefreshThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoading = false;
      })
      .addCase(silentRefreshThunk.rejected, (state) => {
        state.profile = null;
        state.isProfileLoading = false;
      })
      .addCase(loginThunk.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isAuth = true;
        state.isLoginLoading = false;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.profile = null;
        state.isAuth = false;
        state.isLoginLoading = false;
        clearAccessToken();
        localStorage.removeItem("refreshToken");
      })
      .addCase(registerThunk.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isRegisterLoading = false;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.profile = null;
        state.isRegisterLoading = false;
      })
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoading = false;
      })
      .addCase(fetchUserProfileThunk.rejected, (state) => {
        state.profile = null;
        state.isProfileLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
