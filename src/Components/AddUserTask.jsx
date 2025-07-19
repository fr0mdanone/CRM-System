import { addTask } from "../API/FetchingFunctions";
import { useState } from "react";

export default function AddUserTask() {
	const [userInput, setUserInput] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);

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
			setError(error);
		} finally {
			setIsFetching(false);
		}
	}

	return (
		<>
			{error && (
				<div>
					<p>{error.message}</p>
					<button type="button" onClick={() => setError(null)}>
						Ok
					</button>
				</div>
			)}
			{!error && (
				<form onSubmit={addUserTask}>
					<input
						type="text"
						onChange={handleUserInput}
						value={userInput}
						required
						minLength={2}
						maxLength={64}
						placeholder="Task to be done..."
					/>
					<button type="submit" disabled={isFetching}>
						Add
					</button>
				</form>
			)}
		</>
	);
}
