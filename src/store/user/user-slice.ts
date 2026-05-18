import { createSlice } from "@reduxjs/toolkit";
import { Profile, Token } from "../../types/auth";
import { getUserProfileThunk, loginThunk, registerThunk } from "./user-actions";
import { isAuthenticated } from "../../../utils/auth";

interface UserState {
  isAuth: boolean;
  profile: Profile | null;
  isLoading: boolean;
}

const userState: UserState = {
  isAuth: isAuthenticated(),
  profile: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.profile = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isAuth = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isAuth = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.profile = null;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getUserProfileThunk.rejected, (state) => {
        state.profile = null;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
