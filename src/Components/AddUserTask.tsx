import styles from "./AddUserTask.module.scss";

import { addTask } from "../API/FetchingFunctions";
import { FormEvent, useState, ChangeEvent } from "react";

interface AddUserTaskProps {
	onError: (error: unknown) => void;
	onAddTask: () => void;
}

export default function AddUserTask({ onError, onAddTask }: AddUserTaskProps) {
	const [userInput, setUserInput] = useState("");
	const [isFetching, setIsFetching] = useState(false);

	function handleUserInput(event: ChangeEvent<HTMLInputElement>): void {
		setUserInput(event.currentTarget.value);
	}

	async function addUserTask(event: FormEvent<HTMLFormElement>): Promise<void> {
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
				disabled={isFetching}
			/>
			<button className={styles.button} type="submit" disabled={isFetching}>
				Добавить задачу
			</button>
		</form>
	);
}
