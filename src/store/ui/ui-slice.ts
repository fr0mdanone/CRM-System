import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationStatuses = "error" | "success" | "info";

interface NotificationData {
  status: NotificationStatuses;
  title: string;
  description: string;
}

interface notificationState {
  notification: NotificationData | null;
  isLocked: boolean;
}

const initialState: notificationState = {
  notification: null,
  isLocked: false,
};

const titles: Record<NotificationStatuses, string> = {
  error: "Ошибка!",
  success: "Выполнено!",
  info: "Внимание!",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{ status: NotificationStatuses; message: string }>,
    ) => {
      state.notification = {
        status: action.payload.status,
        title: titles[action.payload.status],
        description: action.payload.message,
      };
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    setIsLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type.endsWith("/rejected") &&
        !action.type.includes("auth/silentRefreshToken"),
      (state: notificationState, action: PayloadAction<string>) => {
        state.notification = {
          status: "error",
          title: titles["error"],
          description: (action.payload as string) || "Произошла ошибка",
        };
      },
    );
  },
});

export const { setNotification, clearNotification, setIsLocked } =
  uiSlice.actions;

export default uiSlice.reducer;
