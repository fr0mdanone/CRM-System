import styles from "./AddUserTodo.module.scss";

import { FormEvent } from "react";
import { validateTodoTitle } from "../utils/validators/todos";
import { AddTodoData } from "../api/todos.types";
import { addTodo } from "../api/todos";
import { useState, ChangeEvent } from "react";

interface AddUserTodoProps {
	onError: (error: unknown) => void;
	onAddTodo: () => void;
}

const AddUserTodo: React.FC<AddUserTodoProps> = ({
	onError,
	onAddTodo,
}: AddUserTodoProps) => {
	const [todoTitle, setTodoTitle] = useState<string>("");
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [isValid, setIsValid] = useState<boolean>(true);

	function handleUserInput(event: ChangeEvent<HTMLInputElement>): void {
		const userInput = event.currentTarget.value;
		setTodoTitle(userInput);
		setIsValid(validateTodoTitle(userInput));
	}

	async function handleAddTodo(
		event: FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		if (validateTodoTitle(todoTitle)) {
			try {
				setIsFetching(true);
				const userData: AddTodoData = {
					title: todoTitle.trim(),
					isDone: false,
				};
				await addTodo(userData);
				setTodoTitle("");
				onAddTodo();
			} catch (error) {
				onError(error);
			} finally {
				setIsFetching(false);
			}
		} else {
			setIsValid(false);
		}
	}

	return (
		<>
			<form onSubmit={handleAddTodo} className={styles.form}>
				<input
					className={`${styles.input} ${!isValid ? styles.warning : ""}`}
					type="text"
					onChange={handleUserInput}
					value={todoTitle}
					required
					placeholder="Task to be done..."
					disabled={isFetching}
				/>
				<button className={styles.button} type="submit" disabled={isFetching}>
					Добавить задачу
				</button>
			</form>
			{!isValid && (
				<p className={`${styles.warning} ${styles.isNotValidParagraph}`}>
					Текст задачи должен быть от 2 до 64 символов
				</p>
			)}
		</>
	);
};

export default AddUserTodo;
