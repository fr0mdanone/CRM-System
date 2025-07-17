import { useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";

export default function TodoItem({ task }) {
	const [isEditing, setIsEditing] = useState;

	async function onToggle() {}

	function onDeleteTask() {}

	function onEditTask() {}

	async function handleUserSubmit() {}
	return (
		<li>
			{!isEditing && (
				<div>
					<input type="checkbox" checked={task.isDone} onChange={onToggle} />
					<p>{task.title}</p>
				</div>
			)}
			{isEditing && (
				<form onSubmit={handleUserSubmit}>
					<input type="text" />
					<button type="submit">Save</button>
					<button type="button" onClick={() => setIsEditing(null)}>
						Cancel
					</button>
				</form>
			)}
			<div>
				<button>
					<DeleteIcon onClick={onDeleteTask} />
				</button>
				<button>
					<EditIcon onClick={onEditTask} />
				</button>
			</div>
		</li>
	);
}
