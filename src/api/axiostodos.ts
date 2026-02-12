import axios, { AxiosError } from "axios";

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
		const response = await axios<MetaResponse<Todo, TodoInfo>>({
			url: `${BASE_URL}/todos`,
			params: { filter },
		});
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		const status = err.response?.status;
		if (status === 500) {
			throw new Error(
				"Не удалось получить список задач с сервера. Сервер недоступен.",
			);
		} else {
			throw new Error(
				"Не удалось получить список задач с сервера. Причина неизвестна.",
			);
		}
	}
};

export const addTodo = async (userData: TodoRequest): Promise<Todo> => {
	try {
		const response = await axios<Todo>({
			url: `${BASE_URL}/todos`,
			method: "POST",
			data: userData,
		});
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		const status = err.response?.status;
		if (status === 500) {
			throw new Error("Добавить задачу не удалось. Попробуйте позже.");
		} else if (status === 400) {
			throw new Error("Добавить задачу не удалось. Проверьте данные.");
		} else {
			throw new Error("Не удалось связаться с сервером. Проверьте соединение.");
		}
	}
};

export const deleteTodo = async (id: number): Promise<void> => {
	try {
		await axios<string>({
			url: `${BASE_URL}/todos/${id}`,
			method: "DELETE",
		});
	} catch (error) {
		const err = error as AxiosError;
		const status = err.response?.status;
		if (status === 404) {
			throw new Error("Не удалось удалить задачу, задача не найдена");
		} else if (status === 400) {
			throw new Error(
				"Не удалось удалить задачу. Неверный или несуществующий ID задачи",
			);
		} else if (status === 500) {
			throw new Error("Не удалось удалить задачу. Попробуйте позже");
		} else {
			throw new Error("Не удалось удалить задачу. Причина неизвестна");
		}
	}
};

export const editTodo = async (task: Todo): Promise<Todo> => {
	const dataToSend = {
		title: task.title,
		isDone: task.isDone,
	};
	try {
		const response = await axios<Todo>({
			url: `${BASE_URL}/todos/${task.id}`,
			method: "PUT",
			data: dataToSend,
		});
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		const status = err.response?.status;
		if (status === 400) {
			throw new Error("Не удалось изменить задачу. Проверьте данные.");
		} else if (status === 404) {
			throw new Error("Не удалось изменить задачу. Задача не найдена.");
		} else if (status === 500) {
			throw new Error("Не удалось изменить задачу. Сервер недоступен.");
		} else {
			throw new Error("Не удалось изменить задау. Причина неизвестна.");
		}
	}
};
