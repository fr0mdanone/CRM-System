import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaResponse, Todo, TodoFilter, TodoInfo } from "../../types/todos";
import {
  addTodoThunk,
  deleteTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
} from "./todos-actions";

interface TodoState extends MetaResponse<Todo, TodoInfo> {
  currentFilter: TodoFilter;
  isAdding: boolean;
  isUpdating: boolean;
  isFetching: boolean;
  isDeleting: boolean;
}

const initialState: TodoState = {
  data: [],
  info: {
    all: 0,
    completed: 0,
    inWork: 0,
  },
  meta: {
    totalAmount: 0,
  },
  currentFilter: "all",
  isAdding: false,
  isUpdating: false,
  isFetching: false,
  isDeleting: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload.data;
        state.info = action.payload.info;
        state.meta = action.payload.meta;
      })
      .addCase(fetchTodosThunk.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(addTodoThunk.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.data.push(action.payload);
        if (state.info) {
          state.info.all += 1;
          state.info.inWork += 1;
        }
        state.meta.totalAmount += 1;
        state.isAdding = false;
      })
      .addCase(addTodoThunk.rejected, (state) => {
        state.isAdding = false;
      })
      .addCase(updateTodoThunk.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const existingTodo = state.data.find(
          (todo) => todo.id === updatedTodo.id,
        );
        if (!existingTodo) return;
        if (existingTodo.isDone !== updatedTodo.isDone && state.info) {
          if (updatedTodo.isDone) {
            state.info.completed++;
            state.info.inWork--;
          } else {
            state.info.completed--;
            state.info.inWork++;
          }
        }
        existingTodo.isDone = updatedTodo.isDone;
        existingTodo.title = updatedTodo.title;
        state.isUpdating = false;
      })
      .addCase(updateTodoThunk.rejected, (state) => {
        state.isUpdating = false;
      })
      .addCase(deleteTodoThunk.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        const id = action.payload;
        const existingTodo = state.data.find((todo) => todo.id === id);
        if (!existingTodo) return;
        const wasDone = existingTodo.isDone;
        state.data = state.data.filter((todo) => todo.id !== id);
        if (state.info) {
          state.info.all--;
          wasDone ? state.info.completed-- : state.info.inWork--;
        }
        state.isDeleting = false;
      })
      .addCase(deleteTodoThunk.rejected, (state) => {
        state.isDeleting = false;
      });
  },
});

export const { setFilter } = todosSlice.actions;

export default todosSlice.reducer;
