import { api } from "../axios/axios";

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
	const response = await api.get<MetaResponse<Todo, TodoInfo>>("/todos", {
		params: { filter },
	});
	return response.data;
};

export const addTodo = async (newTodo: TodoRequest): Promise<Todo> => {
	const response = await api.post<Todo>("/todos", newTodo);
	return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
	await api.delete<string>(`/todos/${id}`);
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
	const dataToSend = {
		title: todo.title,
		isDone: todo.isDone,
	};
	const response = await api.put<Todo>(`/todos/${todo.id}`, dataToSend);
	return response.data;
};
