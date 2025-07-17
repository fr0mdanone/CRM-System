import { useState, useEffect } from "react";

import { getTasks } from "../API/FetchingFunctions";

export default function Tasks({ filter, someProps, onError }) {
	//filter из FilterButtons, someProprs - триггер для обновления UI, нужен пропс ошибки, чтобы передать родителю инфу о том, что возникла ошибка и вывести ее модалкой
	const [updatedTasks, setUpdatedTasks] = useState([]);

	useEffect(() => {
		async function fetchingTasks() {
			try {
				const response = await getTasks(filter);
				setUpdatedTasks(response.data);
			} catch (error) {
				onError(error);
			}
		}
		fetchingTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [someProps, filter]);

	return (
		<ol>
			{updatedTasks.map((task) => (
				<TodoItem task={task} />
			))}
		</ol>
	);
}
