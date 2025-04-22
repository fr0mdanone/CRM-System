export async function getTasks(status) {
	const response = await fetch(
		`https://easydev.club/api/v1/todos?filter=${status}`
	);

	if (!response.ok) {
		throw new Error(
			"Не удалось получить список задач с сервера. Попробуйте позже."
		);
	}
	const resData = await response.json();
	return resData;
}

export async function addTask(userData) {
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
	const resData = await response.json();
	return resData;
}

export async function deleteTask(id) {
	const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		if (response.stats >= 500) {
			throw new Error("Не удалось удалить задачу. Попробуйте позже");
		} else if (response.status >= 400) {
			throw new Error(
				"Не удалось удалить задачу. Неверный или несуществующий ID задачи."
			);
		} else if (response.status === 404) {
			throw new Error("Не удалось удалить задачу. Задача не найдена.");
		}
	}
	const resData = await response.json();
	return resData;
}

export async function editTask(task) {
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
		if (response.status >= 500) {
			throw new Error("Не удалось изменить задачу. Попробуйте позже.");
		} else if (response.status === 404) {
			throw new Error("Не удалось изменить задачу. Задача не найдена.");
		} else if (response.status === 400) {
			throw new Error("Не удалось изменить задачу. Проверьте данные.");
		}
	}
	const resData = await response.json();
	return resData;
}
