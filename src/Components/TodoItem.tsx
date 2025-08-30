import styles from "./TodoItem.module.scss";

import { ChangeEvent, FormEvent, useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { editTask, deleteTask } from "../API/FetchingFunctions";
import { Todo } from "../types/types";

interface TodoItemProps {
	task: Todo;
	onAnyChanges: () => void;
	onError: (error: unknown) => void;
}

export default function TodoItem({
	task,
	onAnyChanges,
	onError,
}: TodoItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [userInput, setUserInput] = useState(task.title);

	function handleUserInput(event: ChangeEvent<HTMLInputElement>) {
		setUserInput(event.currentTarget.value);
	}

	async function handleToggle(task: Todo) {
		const updatedTask = { ...task, isDone: !task.isDone };
		try {
			await editTask(updatedTask);
		} catch (error) {
			onError(error);
		} finally {
			onAnyChanges();
		}
	}

	async function handleDeleteTask(id: number) {
		try {
			await deleteTask(id);
		} catch (error) {
			onError(error);
		} finally {
			onAnyChanges();
		}
	}

	async function handleUserSubmit(
		event: FormEvent<HTMLFormElement>,
		task: Todo
	) {
		event.preventDefault();
		task.title = userInput;

		try {
			await editTask(task);
		} catch (error) {
			onError(error);
		} finally {
			setIsEditing(false);
			setUserInput(task.title);
			onAnyChanges();
		}
	}

	console.log("isEditing is ", isEditing);

	return (
		<>
			{!isEditing && (
				<li className={styles.listItem}>
					<div className={styles.task}>
						<input
							type="checkbox"
							checked={task.isDone}
							onChange={() => handleToggle(task)}
							className={styles.checkbox}
						/>
						<p
							className={`${styles.title} ${
								task.isDone === true ? styles.isDone : ""
							}`}
						>
							{task.title}
						</p>
					</div>
					<div className={styles.buttonsContainer}>
						<button className={`${styles.delete} ${styles.button}`}>
							<DeleteIcon onClick={() => handleDeleteTask(task.id)} />
						</button>
						<button className={`${styles.edit} ${styles.button}`}>
							<EditIcon onClick={() => setIsEditing(true)} />
						</button>
					</div>
				</li>
			)}
			{isEditing && (
				<form
					onSubmit={(event) => handleUserSubmit(event, task)}
					className={styles.listItem}
				>
					<input
						type="text"
						required
						minLength={2}
						maxLength={64}
						defaultValue={task.title}
						value={userInput}
						onChange={handleUserInput}
						className={styles.input}
					/>
					<div className={styles.buttonsContainer}>
						<button type="submit" className={`${styles.button} ${styles.save}`}>
							Save
						</button>
						<button
							type="button"
							onClick={() => {
								setIsEditing(false);
								setUserInput(task.title);
							}}
							className={`${styles.button} ${styles.cancel}`}
						>
							Cancel
						</button>
					</div>
				</form>
			)}
		</>
	);
}
