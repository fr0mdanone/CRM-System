import { useState, useEffect } from "react";

import "./App.css";
import AddUserTask from "./Components/AddUserTask";
import Tasks from "./Components/Tasks";
import FilterButtons from "./Components/FilterButtons";
import EditModal from "./Components/EditModal";
import ErrorModal from "./Components/ErrorModal";

import {
	getTasks,
	deleteTask,
	addTask,
	editTask,
} from "./API/FetchingFunctions";

function App() {
	const [error, setError] = useState();
	const [updatedTasks, setUpdatedTasks] = useState([]);
	const [filter, setFilter] = useState("all");
	const [isEditing, setIsEditing] = useState();

	function setTasksFilter(id) {
		setFilter(id);
	}

	useEffect(() => {
		async function fetchingTasks() {
			try {
				const response = await getTasks(filter);
				console.log(response);

				setUpdatedTasks(response.data);
			} catch (error) {
				setError(error);
			}
		}
		fetchingTasks();
	}, [filter]);

	async function deletingTask(id) {
		try {
			await deleteTask(id);
			setUpdatedTasks((prevTasksArray) =>
				prevTasksArray.filter((task) => task.id != id)
			);
		} catch (error) {
			setError(error);
		}
	}

	async function addingTask(taskTitle) {
		try {
			const userData = {
				title: taskTitle,
				isDone: false,
			};

			const response = await addTask(userData);
			console.log(response);
			setUpdatedTasks((prevTasksArray) => [...prevTasksArray, response]);
		} catch (error) {
			setError(error);
		}
	}

	function editingData(task) {
		setIsEditing(task);
	}

	async function submittingChanges(task) {
		try {
			await editTask(task);
			const updatingEditingTasks = updatedTasks.map((oldTask) => {
				return oldTask.id === task.id ? task : oldTask;
			});
			setUpdatedTasks(updatingEditingTasks);
		} catch (error) {
			setError(error);
		}
	}

	return (
		<>
			{isEditing && (
				<EditModal
					incomingTask={isEditing}
					onSaveChanges={submittingChanges}
					onCancelChanges={() => {
						setIsEditing(null);
					}}
				/>
			)}
			{error && (
				<ErrorModal error={error} onErrorConfirm={() => setError(null)} />
			)}
			<AddUserTask onAddTask={addingTask} />
			<section>
				<FilterButtons onClick={setTasksFilter} />
				<Tasks
					tasks={updatedTasks}
					onDelete={deletingTask}
					onEdit={editingData}
				/>
			</section>
		</>
	);
}

export default App;
