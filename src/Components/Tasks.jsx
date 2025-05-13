import styles from "./Tasks.module.scss";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";

export default function Tasks({ tasks, onDelete, onEdit, onToggle }) {
	function handleEditButton(task) {
		onEdit(task);
	}
	function handleDeleteButton(id) {
		onDelete(id);
	}

	return (
		<>
			<ol>
				{tasks.map((task) => (
					<li
						className={`${styles.flexContainer} ${styles.tasksItem}`}
						key={task.id}
					>
						<div className={`${styles.taskCheckbox}`}>
							<input
								type="checkbox"
								checked={task.isDone}
								onChange={() => onToggle(task)}
							/>
							<p>{task.title}</p>
						</div>
						<div className={`${styles.buttons}`}>
							<button
								onClick={() => handleDeleteButton(task.id)}
								className={`${styles.button} ${styles.delete}`}
							>
								<DeleteIcon />
							</button>
							<button
								onClick={() => handleEditButton(task)}
								className={`${styles.button} ${styles.edit}`}
							>
								<EditIcon />
							</button>
						</div>
					</li>
				))}
			</ol>
		</>
	);
}
