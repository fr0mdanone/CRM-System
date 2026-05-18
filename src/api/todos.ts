import { privateApi } from "../axios/axios";

import {
  TodoFilter,
  TodoRequest,
  Todo,
  MetaResponse,
  TodoInfo,
} from "../types/todos";

export const getTodos = async (
  filter: TodoFilter,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await privateApi.get<MetaResponse<Todo, TodoInfo>>(
    "/todos",
    {
      params: { filter },
    },
  );
  return response.data;
};

export const addTodo = async (newTodo: TodoRequest): Promise<Todo> => {
  const response = await privateApi.post<Todo>("/todos", newTodo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await privateApi.delete<string>(`/todos/${id}`);
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const data = {
    title: todo.title,
    isDone: todo.isDone,
  };
  const response = await privateApi.put<Todo>(`/todos/${todo.id}`, data);
  return response.data;
};
