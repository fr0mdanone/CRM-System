import {
	Filter,
	TodoRequest,
	Todo,
	MetaResponse,
	TodoInfo,
} from "./todos.types";

import { BASE_URL } from "../constants/todos.constants";

export async function getTodos(
	filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> {
	const response = await fetch(`${BASE_URL}/todos?filter=${filter}`);

	if (!response.ok) {
		throw new Error(
			"Не удалось получить список задач с сервера. Попробуйте позже."
		);
	}
	const resData: MetaResponse<Todo, TodoInfo> = await response.json();
	return resData;
}

export async function addTodo(userData: TodoRequest): Promise<Todo> {
	const response = await fetch(`${BASE_URL}/todos`, {
		method: "POST",
		body: JSON.stringify(userData),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		if (response.status >= 500) {
			throw new Error("Добавить задачу не удалось. Попробуйте позже.");
		} else if (response.status >= 400) {
			throw new Error("Добавить задачу не удалось. Проверьте данные.");
		}
	}
	const resData: Todo = await response.json();
	return resData;
}

export async function deleteTodo(id: number): Promise<void> {
	const response = await fetch(`${BASE_URL}/todos/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		if (response.status === 404) {
			throw new Error("Не удалось удалить задачу. Задача не найдена.");
		} else if (response.status >= 400) {
			throw new Error(
				"Не удалось удалить задачу. Неверный или несуществующий ID задачи."
			);
		} else if (response.status >= 500) {
			throw new Error("Не удалось удалить задачу. Попробуйте позже.");
		}
	}
	return;
}

export async function editTodo(task: Todo): Promise<Todo> {
	const dataToSend = {
		title: task.title,
		isDone: task.isDone,
	};
	const response = await fetch(`${BASE_URL}/todos/${task.id}`, {
		method: "PUT",
		body: JSON.stringify(dataToSend),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		console.log(response.status);
		if (response.status === 400) {
			throw new Error("Не удалось изменить задачу. Проверьте данные.");
		} else if (response.status === 404) {
			throw new Error("Не удалось изменить задачу. Задача не найдена.");
		} else if (response.status >= 500) {
			throw new Error("Не удалось изменить задачу. Попробуйте позже.");
		}
	}
	const resData: Todo = await response.json();
	return resData;
}
