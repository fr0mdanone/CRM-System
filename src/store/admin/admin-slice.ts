import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/auth";
import {
  blockUserThunk,
  deleteUserThunk,
  fetchAllUsersThunk,
  fetchUserByIdThunk,
  unblockUserThunk,
  updateUserProfileThunk,
  updateUserRolesThunk,
} from "./admin-actions";

interface AdminState {
  users: User[];
  isLoading: boolean;
  currentUser: User | null;
  totalAmount: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const initialState: AdminState = {
  users: [],
  isLoading: false,
  currentUser: null,
  totalAmount: 0,
  sortBy: "id",
  sortOrder: "asc",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.totalAmount = action.payload.meta.totalAmount;
      })
      .addCase(fetchAllUsersThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(blockUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockUserThunk.fulfilled, (state, action) => {
        const user = action.payload;
        const userIndex = state.users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          state.users[userIndex] = user;
        }
        state.isLoading = false;
      })
      .addCase(blockUserThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(unblockUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unblockUserThunk.fulfilled, (state, action) => {
        const user = action.payload;
        const userIndex = state.users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          state.users[userIndex] = user;
        }
        state.isLoading = false;
      })
      .addCase(unblockUserThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.isLoading = false;
        state.totalAmount -= 1;
      })
      .addCase(deleteUserThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserRolesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserRolesThunk.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex((u) => u.id === updatedUser.id);
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
        state.isLoading = false;
      })
      .addCase(updateUserRolesThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserByIdThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfileThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminSlice.reducer;
