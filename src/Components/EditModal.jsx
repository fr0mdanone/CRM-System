import { useState } from "react";

import styles from "./EditModal.module.scss";

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
		<div className="backdrop" onClick={() => onCancelChanges()}>
			<div
				className="modal-window"
				onClick={(event) => event.stopPropagation()}
			>
				<form onSubmit={handleUserSubmit} className={`${styles.flexContainer}`}>
					<input
						type="text"
						onChange={handleUserInput}
						value={userInput}
						minLength={2}
						maxLength={64}
						required
						className={`${styles.input}`}
					/>
					<div className={`${styles.buttons}`}>
						<button
							type="button"
							className={`${styles.cancel} ${styles.button}`}
							onClick={() => onCancelChanges()}
						>
							Отмена
						</button>
						<button type="submit" className={`${styles.save} ${styles.button}`}>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
