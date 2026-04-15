import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationStatuses = "error" | "success" | "info";

interface NotificationData {
	status: NotificationStatuses;
	title: string;
	message: string;
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
				message: action.payload.message,
			};
		},
		clearNotification: (state) => {
			state.notification = null;
		},
		setIsLocked: (state, action: PayloadAction<boolean>) => {
			state.isLocked = action.payload;
		},
	},
});

export const { setNotification, clearNotification, setIsLocked } =
	uiSlice.actions;

export default uiSlice.reducer;
