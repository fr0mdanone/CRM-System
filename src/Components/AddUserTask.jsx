import { useState } from "react";

export default function AddUserTask({ onAddTask }) {
	const [userInput, setUserInput] = useState("");

	function handleUserInput(event) {
		setUserInput(event.target.value);
	}

	function handleUserSubmit(event) {
		event.preventDefault();
		onAddTask(userInput);

		setUserInput("");
	}

	return (
		<form onSubmit={handleUserSubmit}>
			<input
				type="text"
				placeholder="Task to be done..."
				onChange={handleUserInput}
				value={userInput}
				required
				minLength={2}
				maxLength={64}
			/>
			<button type="submit">Add</button>
		</form>
	);
}
