import AddUserTask from "./Components/AddUserTask";
import Tasks from "./Components/Tasks";
import FilterButtons from "./Components/FilterButtons";

import "./App.scss";
import { useState, useEffect } from "react";
import { getTasks } from "./API/FetchingFunctions";

function App() {
	const [error, setError] = useState(null);
	const [updatedTodos, setUpdatedTodos] = useState([]);
	const [filter, setFilter] = useState("all");
	const [todoInfo, setTodoInfo] = useState({});
	const [forceUpdate, setForceUpdate] = useState(false);

	useEffect(() => {
		async function fetchingTasks() {
			try {
				const response = await getTasks(filter);

				console.log("FETCH: response.data ", response.data);

				setUpdatedTodos(response.data);
				setTodoInfo(response.info);
			} catch (error) {
				setError(error);
			}
		}
		fetchingTasks();
	}, [filter, forceUpdate]);

	return (
		<>
			{error && (
				<ErrorModal errorObject={error} onErrorConfirm={() => setError(null)} />
			)}
			{!error && (
				<div>
					<AddUserTask
						onError={setError}
						onAddTask={() => setForceUpdate((prev) => !prev)}
					/>
					<section>
						<FilterButtons
							todoInfo={todoInfo}
							filter={filter}
							onSetFilters={setFilter}
						/>
						<Tasks
							tasks={updatedTodos}
							onUpdateTodos={() => setForceUpdate((prev) => !prev)}
							onError={setError}
						/>
					</section>
				</div>
			)}
		</>
	);
}

export default App;
