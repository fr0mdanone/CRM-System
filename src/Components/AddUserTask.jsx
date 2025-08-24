import styles from "./AddUserTask.module.scss";

import { addTask } from "../API/FetchingFunctions";
import { useState } from "react";

export default function AddUserTask({ onError, onAddTask }) {
	const [userInput, setUserInput] = useState("");
	const [isFetching, setIsFetching] = useState(false);

	function handleUserInput(event) {
		setUserInput(event.target.value);
	}

	async function addUserTask(event) {
		event.preventDefault();
		setIsFetching(true);
		try {
			const taskTitle = userInput;
			const userData = {
				title: taskTitle,
				isDone: false,
			};
			await addTask(userData);
		} catch (error) {
			onError(error);
		} finally {
			setIsFetching(false);
			setUserInput("");
			onAddTask();
		}
	}

	return (
		<form onSubmit={addUserTask} className={styles.form}>
			<input
				className={styles.input}
				type="text"
				onChange={handleUserInput}
				value={userInput}
				required
				minLength={2}
				maxLength={64}
				placeholder="Task to be done..."
			/>
			<button className={styles.button} type="submit" disabled={isFetching}>
				Добавить задачу
			</button>
		</form>
	);
}
