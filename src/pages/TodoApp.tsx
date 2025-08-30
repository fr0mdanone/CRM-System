import AddUserTask from "../Components/AddUserTask";
import Todos from "../Components/Todos";
import FilterButtons from "../Components/FilterButtons";
import ErrorModal from "../Components/ErrorModal";

import { useState, useEffect } from "react";
import { getTasks } from "../API/FetchingFunctions";
import { Todo, TodoInfo, Filter } from "../types/types";

export default function TodoApp() {
	const [error, setError] = useState<Error | null>(null); // error instaceof Error или че-то такое, как-то там провести проверку по классу через if, useState<Error | null>
	const [updatedTodos, setUpdatedTodos] = useState<Todo[]>([]);
	const [filter, setFilter] = useState<Filter>("all");
	const [todoInfo, setTodoInfo] = useState<TodoInfo | undefined>();
	const [forceUpdate, setForceUpdate] = useState(false);

	useEffect(() => {
		async function fetchingTasks() {
			try {
				const response = await getTasks(filter);

				setUpdatedTodos(response.data);
				setTodoInfo(response.info);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			}
		}
		fetchingTasks();
	}, [filter, forceUpdate]);

	return (
		<>
			{error && (
				<ErrorModal errorObject={error} onErrorConfirm={() => setError(null)} />
			)}
			<div className="flexContainer">
				<AddUserTask
					onError={() => setError(error)}
					onAddTask={() => setForceUpdate((prev) => !prev)}
				/>
				<section>
					<FilterButtons
						todoInfo={todoInfo}
						filter={filter}
						onSetFilters={setFilter}
					/>
					<Todos
						tasks={updatedTodos}
						onUpdateTodos={() => setForceUpdate((prev) => !prev)}
						onError={() => setError(error)}
					/>
				</section>
			</div>
		</>
	);
}
