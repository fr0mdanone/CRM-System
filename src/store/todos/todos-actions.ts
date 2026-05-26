import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../../api/todos";
import { MetaResponse, Todo, TodoInfo } from "../../types/todos";
import { setNotification } from "../ui/ui-slice";
import axios from "axios";

export const fetchTodosThunk = createAsyncThunk<
  MetaResponse<Todo, TodoInfo>,
  void,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>("todos/fetchTodos", async (_, { getState, rejectWithValue }) => {
  const filter = getState().todos.currentFilter;
  try {
    const todosData = await fetchTodos(filter);
    return todosData;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Произошла непредвиденная ошибка";
    return rejectWithValue(errorMessage);
  }
});

export const addTodoThunk = createAsyncThunk<
  Todo,
  string,
  { dispatch: AppDispatch; rejectValue: string }
>("todos/addTodo", async (title, { dispatch, rejectWithValue }) => {
  const newTodo = {
    title,
    isDone: false,
  };
  try {
    const response = await addTodo(newTodo);
    dispatch(
      setNotification({
        status: "success",
        message: "Задача успешно добавлена",
      }),
    );
    return response;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Произошла непредвиденная ошибка";
    return rejectWithValue(errorMessage);
  }
});

export const updateTodoThunk = createAsyncThunk<
  Todo,
  Todo,
  { dispatch: AppDispatch; rejectValue: string }
>("todos/updateTodo", async (todo, { dispatch, rejectWithValue }) => {
  try {
    const response = await updateTodo(todo);
    dispatch(
      setNotification({
        status: "success",
        message: "Задача успешно обновлена",
      }),
    );
    return response;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Произошла непредвиденная ошибка";
    return rejectWithValue(errorMessage);
  }
});

export const deleteTodoThunk = createAsyncThunk<
  number,
  number,
  { dispatch: AppDispatch; rejectValue: string }
>("todos/deleteTodo", async (id, { dispatch, rejectWithValue }) => {
  try {
    await deleteTodo(id);
    dispatch(
      setNotification({ status: "success", message: "Задача успешно удалена" }),
    );
    return id;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Произошла непредвиденная ошибка";
    return rejectWithValue(errorMessage);
  }
});
