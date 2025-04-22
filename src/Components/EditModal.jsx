import { useState } from "react";

export default function EditModal({
	incomingTask,
	onCancelChanges,
	onSaveChanges,
}) {
	const [userInput, setUserInput] = useState(incomingTask.title);

	function handleUserInput(event) {
		setUserInput(event.target.value);
	}

	function handleUserSubmit(event) {
		event.preventDefault();
		incomingTask.title = userInput;
		onSaveChanges(incomingTask);
		setUserInput("");
	}

	return (
		<form onSubmit={handleUserSubmit}>
			<input type="text" onChange={handleUserInput} value={userInput} />
			<button type="button" onClick={() => onCancelChanges()}>
				Отмена
			</button>
			<button type="submit">Сохранить</button>
		</form>
	);
}
