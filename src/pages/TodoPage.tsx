import AddUserTodo from "../components/AddUserTodo";
import Todos from "../components/Todos";
import FilterButtons from "../components/FilterButtons";
import ErrorModal from "../components/ErrorModal";

import styles from "./TodoPage.module.scss";
import { useState, useEffect } from "react";
import { getTodos } from "../api/todos";
import { Todo, TodoInfo, Filter, MetaResponse } from "../api/todos.types";

const TodoPage: React.FC = () => {
	const [error, setError] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [filter, setFilter] = useState<Filter>("all");
	const [todoInfo, setTodoInfo] = useState<TodoInfo>({
		all: 0,
		completed: 0,
		inWork: 0,
	});

	async function fetchingTodos(): Promise<void> {
		try {
			const response: MetaResponse<Todo, TodoInfo> = await getTodos(filter);

			setTodos(response.data);
			setTodoInfo(response.info!);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	}

	useEffect(() => {
		fetchingTodos();
	}, [filter]);

	return (
		<>
			{error && (
				<ErrorModal errorMessage={error} onErrorConfirm={() => setError("")} />
			)}
			<div className={styles.container}>
				<AddUserTodo
					onError={() => setError(error)}
					onAddTodo={fetchingTodos}
				/>
				<section>
					<FilterButtons
						todoInfo={todoInfo}
						filter={filter}
						onSetFilter={setFilter}
					/>
					<Todos
						todos={todos}
						onUpdateTodos={fetchingTodos}
						onError={() => setError(error)}
					/>
				</section>
			</div>
		</>
	);
};

export default TodoPage;
