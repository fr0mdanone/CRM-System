import { useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { editTask, deleteTask } from "../API/FetchingFunctions";

export default function TodoItem({ task, onSubmittingEditTask }) {
	//изменить название onSubmittingEditTask, потому что функция будет экзекутироваться в 3х http-запросах
	const [isEditing, setIsEditing] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [error, setError] = useState(null);

	function handleUserInput(event) {
		setUserInput(event.target.value);
	}

	async function onToggle(task) {
		const updatedTask = { ...task, isDone: !task.isDone };
		try {
			await editTask(updatedTask);
		} catch (error) {
			setError(error);
		}
	}

	async function onDeleteTask(id) {
		try {
			await deleteTask(id);
		} catch (error) {
			setError(error);
		}
	}

	async function handleUserSubmit(event, task) {
		event.preventDefault();
		console.log(task);

		try {
			await editTask(task);
		} catch (error) {
			setError(error);
		} finally {
			setIsEditing(false);
		}

		setUserInput("");
		onSubmittingEditTask();
	}

	console.log("isEditing is ", isEditing);

	return (
		<li>
			{!isEditing && !error && (
				<div>
					<div>
						<input
							type="checkbox"
							checked={task.isDone}
							onChange={() => onToggle(task)}
						/>
						<p>{task.title}</p>
					</div>
					<div>
						<button>
							<DeleteIcon onClick={() => onDeleteTask(task.id)} />
						</button>
						<button>
							<EditIcon onClick={() => setIsEditing(true)} />
						</button>
					</div>
				</div>
			)}
			{isEditing && !error && (
				<form onSubmit={(event) => handleUserSubmit(event, task)}>
					<input type="text" value={userInput} onChange={handleUserInput} />
					<button type="submit">Save</button>
					<button type="button" onClick={() => setIsEditing(false)}>
						Cancel
					</button>
				</form>
			)}
			{error && (
				<div>
					<p>{error.message}</p>
					<button type="button" onClick={() => setError(null)}>
						Ok
					</button>
				</div>
			)}
		</li>
	);
}
