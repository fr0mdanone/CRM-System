import { addTask } from "../API/FetchingFunctions";
import { useState } from "react";

export default function AddUserTask({ onResult }) {
	const [isFetching, setIsFetching] = useState(false);

	async function addUserTask(taskTitle) {
		setIsFetching(true);
		try {
			const userData = {
				title: taskTitle,
				isDone: false,
			};
			await addTask(userData);
			onResult(null);
		} catch (error) {
			onResult(error);
		} finally {
			setIsFetching(false);
		}
	}

	return (
		<form onSubmit={addUserTask}>
			<input type="text" />
			<button type="submit" disabled={isFetching}>
				Add
			</button>
		</form>
	);
}
