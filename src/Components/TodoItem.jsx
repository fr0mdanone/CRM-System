import { useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { editTask, deleteTask } from "../API/FetchingFunctions";

export default function TodoItem({ task, onAnyChanges, onError }) {
	const [isEditing, setIsEditing] = useState(false);
	const [userInput, setUserInput] = useState("");

	function handleUserInput(event) {
		setUserInput(event.target.value);
	}

	async function handleToggle(task) {
		const updatedTask = { ...task, isDone: !task.isDone };
		try {
			await editTask(updatedTask);
		} catch (error) {
			onError(error);
		} finally {
			onAnyChanges();
		}
	}

	async function handleDeleteTask(id) {
		try {
			await deleteTask(id);
		} catch (error) {
			onError(error);
		} finally {
			onAnyChanges();
		}
	}

	async function handleUserSubmit(event, task) {
		event.preventDefault();
		task.title = userInput;

		try {
			await editTask(task);
		} catch (error) {
			onError(error);
		} finally {
			setIsEditing(false);
			setUserInput("");
			onAnyChanges();
		}
	}

	console.log("isEditing is ", isEditing);

	return (
		<li>
			{!isEditing && (
				<div>
					<div>
						<input
							type="checkbox"
							checked={task.isDone}
							onChange={() => handleToggle(task)}
						/>
						<p>{task.title}</p>
					</div>
					<div>
						<button>
							<DeleteIcon onClick={() => handleDeleteTask(task.id)} />
						</button>
						<button>
							<EditIcon onClick={() => setIsEditing(true)} />
						</button>
					</div>
				</div>
			)}
			{isEditing && (
				<form onSubmit={(event) => handleUserSubmit(event, task)}>
					<input type="text" value={userInput} onChange={handleUserInput} />
					<button type="submit">Save</button>
					<button type="button" onClick={() => setIsEditing(false)}>
						Cancel
					</button>
				</form>
			)}
		</li>
	);
}
