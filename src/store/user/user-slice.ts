import { createSlice } from "@reduxjs/toolkit";
import { Profile, Token } from "../../types/auth";
import {
  getUserProfileThunk,
  loginThunk,
  registerThunk,
  silentRefreshThunk,
} from "./user-actions";
import { clearToken } from "../../../utils/auth";

interface UserState {
  isAuth: boolean;
  profile: Profile | null;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  isProfileLoading: boolean;
}

const userState: UserState = {
  isAuth: false,
  profile: null,
  isLoginLoading: false,
  isRegisterLoading: false,
  isProfileLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.profile = null;
      clearToken();
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
        clearToken();
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
      .addCase(getUserProfileThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoading = false;
      })
      .addCase(getUserProfileThunk.rejected, (state) => {
        state.profile = null;
        state.isProfileLoading = false;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
