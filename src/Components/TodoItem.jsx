import { useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { editTask, deleteTask } from "../API/FetchingFunctions";

export default function TodoItem({ task }) {
	const [isEditing, setIsEditing] = useState;
	const [userInput, setUserInput] = useState("");

	function handleUserInput(event) {
		setUserInput(event.target.value);
	}

	async function onToggle() {
		const updatedTask = { ...task, isDone: !task.isDone };
		try {
			await editTask(updatedTask);
		} catch (error) {
			// передать объект ошибки в Tasks и оттуда передать в App.jsx
		}
	}

	async function onDeleteTask(id) {
		try {
			await deleteTask(id);
		} catch (error) {
			//передать объект ошибки в Tasks и оттуда передать в App.jsx
		}
	}

	async function handleUserSubmit(event, task) {
		event.preventDefault();

		const userTask = {
			title: userInput,
			isDone: task.isDone,
		};

		try {
			await editTask(userTask);
		} catch (error) {
			//передать объект ошибки в Tasks и оттуда передать в App.jsx
		} finally {
			setIsEditing(false);
		}

		setUserInput("");
	}

	return (
		<li>
			{!isEditing && (
				<div>
					<input type="checkbox" checked={task.isDone} onChange={onToggle} />
					<p>{task.title}</p>
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
			<div>
				<button>
					<DeleteIcon onClick={() => onDeleteTask(task.id)} />
				</button>
				<button>
					<EditIcon onClick={setIsEditing(true)} />
				</button>
			</div>
		</li>
	);
}
