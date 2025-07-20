import TodoItem from "./TodoItem";

import { useState, useEffect } from "react";

import { getTasks } from "../API/FetchingFunctions";

export default function Tasks({ filter, someProps }) {
	//filter из FilterButtons, someProprs - триггер для обновления UI, нужен пропс ошибки, чтобы передать родителю инфу о том, что возникла ошибка и вывести ее модалкой
	const [updatedTasks, setUpdatedTasks] = useState([]);
	const [error, setError] = useState(null);
	const [trigger, setTrigger] = useState(false); //здесь надо как-то решить с триггером для перерендера UI

	useEffect(() => {
		async function fetchingTasks() {
			try {
				const response = await getTasks(filter);
				setUpdatedTasks(response.data);
			} catch (error) {
				setError(error);
			}
		}
		fetchingTasks();
	}, [someProps, filter, trigger]);

	function triggerFunc() {
		setTrigger(!trigger);
	}

	return (
		<>
			{error && (
				<div>
					<p>{error.message}</p>
					<button type="button" onClick={() => setError(null)}>
						Ok
					</button>
				</div>
			)}
			{!error && (
				<ol>
					{updatedTasks.map((task) => (
						<TodoItem
							key={task.id}
							task={task}
							onSubmittingEditTask={triggerFunc}
						/>
					))}
				</ol>
			)}
		</>
	);
}
