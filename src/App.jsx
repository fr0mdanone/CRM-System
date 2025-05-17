import { useState, useEffect } from "react";

import "./App.scss";
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
	const [tasksInfo, setTasksInfo] = useState({});

	function setTasksFilter(id) {
		setFilter(id);
	}

	useEffect(() => {
		async function fetchingTasks() {
			try {
				const response = await getTasks(filter);

				console.log("FETCH: response.data ", response.data);

				setUpdatedTasks(response.data);
				setTasksInfo(response.info);
			} catch (error) {
				setError(error);
			}
		}
		fetchingTasks();
		console.log("FETCH: filter ", filter);
	}, [filter]);

	async function deletingTask(id) {
		try {
			await deleteTask(id);
			setUpdatedTasks((prevTasksArray) =>
				prevTasksArray.filter((task) => task.id != id)
			);
			const refreshed = await getTasks(filter);
			setUpdatedTasks(refreshed.data);
			setTasksInfo(refreshed.info);
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
			setUpdatedTasks((prevTasksArray) => [...prevTasksArray, response]);
			const refreshed = await getTasks(filter);
			setUpdatedTasks(refreshed.data);
			setTasksInfo(refreshed.info);
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
			const updatingEditedTasks = updatedTasks.map((oldTask) => {
				return oldTask.id === task.id ? task : oldTask;
			});
			setUpdatedTasks(updatingEditedTasks);
			const refreshed = await getTasks(filter);
			setUpdatedTasks(refreshed.data);
		} catch (error) {
			setError(error);
		}
		setIsEditing(null);
	}

	async function toggleTaskDone(task) {
		const updatedTask = { ...task, isDone: !task.isDone };
		try {
			await editTask(updatedTask);
			const updatingEditedTasks = updatedTasks.map((oldTask) => {
				return oldTask.id === updatedTask.id ? updatedTask : oldTask;
			});
			const response = await getTasks(filter);
			setUpdatedTasks(response.data);
			setTasksInfo(response.info);
			console.log("TOGGLE: updatedTasks = ", updatingEditedTasks);
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
				<FilterButtons
					onClick={setTasksFilter}
					filter={filter}
					info={tasksInfo}
				/>
				<Tasks
					tasks={updatedTasks}
					onDelete={deletingTask}
					onEdit={editingData}
					onToggle={toggleTaskDone}
				/>
			</section>
		</>
	);
}

export default App;
