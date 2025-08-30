import {
	Filter,
	TodoRequest,
	Todo,
	MetaResponse,
	TodoInfo,
} from "../types/types";

export async function getTasks(
	status: Filter
): Promise<MetaResponse<Todo, TodoInfo>> {
	const response = await fetch(
		`https://easydev.club/api/v1/todos?filter=${status}`
	);

	if (!response.ok) {
		throw new Error(
			"Не удалось получить список задач с сервера. Попробуйте позже."
		);
	}
	const resData: MetaResponse<Todo, TodoInfo> = await response.json();
	return resData;
}

export async function addTask(userData: TodoRequest): Promise<Todo> {
	const response = await fetch("https://easydev.club/api/v1/todos", {
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

export async function deleteTask(id: number): Promise<void> {
	const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		if (response.status === 404) {
			throw new Error("Не удалось удалить задачу. Попробуйте позже");
		} else if (response.status >= 400) {
			throw new Error(
				"Не удалось удалить задачу. Неверный или несуществующий ID задачи."
			);
		} else if (response.status >= 500) {
			throw new Error("Не удалось удалить задачу. Задача не найдена.");
		}
	}
	return;
}

export async function editTask(task: Todo): Promise<Todo> {
	const dataToSend = {
		title: task.title,
		isDone: task.isDone,
	};
	const response = await fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
		method: "PUT",
		body: JSON.stringify(dataToSend),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		if (response.status === 400) {
			throw new Error("Не удалось изменить задачу. Попробуйте позже.");
		} else if (response.status === 404) {
			throw new Error("Не удалось изменить задачу. Задача не найдена.");
		} else if (response.status >= 500) {
			throw new Error("Не удалось изменить задачу. Проверьте данные.");
		}
	}
	const resData: Todo = await response.json();
	return resData;
}
