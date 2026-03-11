import { api } from "../axios/axios";

import {
	TodoFilter,
	TodoRequest,
	Todo,
	MetaResponse,
	TodoInfo,
} from "../types/todos";

import { BASE_URL } from "../constants/todos.constants";

export const getTodos = async (
	filter: TodoFilter,
): Promise<MetaResponse<Todo, TodoInfo>> => {
	try {
		const response = await api.get<MetaResponse<Todo, TodoInfo>>("/todos", {
			params: { filter },
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const addTodo = async (newTodo: TodoRequest): Promise<Todo> => {
	try {
		const response = await api.post<Todo>("/todos", newTodo);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteTodo = async (id: number): Promise<void> => {
	try {
		await api.delete<string>(`/todos/${id}`);
	} catch (error) {
		throw error;
	}
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
	const dataToSend = {
		title: todo.title,
		isDone: todo.isDone,
	};
	try {
		const response = await api.put<Todo>(
			`${BASE_URL}/todos/${todo.id}`,
			dataToSend,
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
