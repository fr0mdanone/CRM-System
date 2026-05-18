import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/todos-slice";
import uiReducer from "./ui/ui-slice";
import userReducer from "./user/user-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    ui: uiReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
