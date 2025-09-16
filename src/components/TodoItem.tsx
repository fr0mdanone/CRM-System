import styles from "./TodoItem.module.scss";

import { validateTodoTitle } from "../utils/validators/todos";
import { ChangeEvent, FormEvent, useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import SaveIcon from "../assets/SaveIcon";
import { editTodo, deleteTodo } from "../api/todos";
import { Todo } from "../types/todos";
import CancelIcon from "../assets/CancelIcon";

interface TodoItemProps {
	todo: Todo;
	onUpdateTodos: () => void;
	onError: (errorMessage: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
	todo,
	onUpdateTodos,
	onError,
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [todoTitle, setTodoTitle] = useState<string>(todo.title);
	const [isValid, setIsValid] = useState<boolean>(true);
	const [isFetching, setIsFetching] = useState<boolean>(false);

	function handleTodoTitleChange(event: ChangeEvent<HTMLInputElement>) {
		const changedTitle = event.currentTarget.value;
		setTodoTitle(changedTitle);
		setIsValid(validateTodoTitle(changedTitle));
	}

	async function handleToggle(todo: Todo) {
		const updatedTodo: Todo = { ...todo, isDone: !todo.isDone };
		try {
			setIsFetching(true);
			await editTodo(updatedTodo);
			onUpdateTodos();
		} catch (error: unknown) {
			if (error instanceof Error) {
				onError(error.message);
			}
		} finally {
			setIsFetching(false);
		}
	}

	async function handleDeleteTodo(id: number) {
		try {
			setIsFetching(true);
			await deleteTodo(id);
			onUpdateTodos();
		} catch (error: unknown) {
			if (error instanceof Error) {
				onError(error.message);
			}
		} finally {
			setIsFetching(false);
		}
	}

	async function handleEditTodo(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (validateTodoTitle(todoTitle)) {
			const editedTask = { ...todo, title: todoTitle.trim() };
			try {
				setIsFetching(true);
				await editTodo(editedTask);
				onUpdateTodos();
				setIsEditing(false);
			} catch (error: unknown) {
				if (error instanceof Error) {
					onError(error.message);
				}
			} finally {
				setTodoTitle(editedTask.title);
				setIsFetching(false);
			}
		} else {
			setIsValid(false);
		}
	}

	function handleCancel() {
		setIsEditing(false);
		setTodoTitle(todo.title);
	}

	return (
		<>
			{!isEditing && (
				<li className={styles.listItem}>
					<div className={styles.todo}>
						<input
							type="checkbox"
							checked={todo.isDone}
							onChange={() => handleToggle(todo)}
							className={styles.checkbox}
							disabled={isFetching}
						/>
						<p
							className={`${styles.title} ${
								todo.isDone === true ? styles.isDone : ""
							}`}
						>
							{todo.title}
						</p>
					</div>
					<div className={styles.buttonsContainer}>
						<button
							className={`${styles.delete} ${styles.button}`}
							onClick={() => handleDeleteTodo(todo.id)}
							disabled={isFetching}
						>
							<DeleteIcon />
						</button>
						<button
							className={`${styles.edit} ${styles.button}`}
							onClick={() => setIsEditing(true)}
							disabled={isFetching}
						>
							<EditIcon />
						</button>
					</div>
				</li>
			)}
			{isEditing && (
				<div className={styles.container}>
					<form onSubmit={handleEditTodo} className={styles.form}>
						<input
							type="text"
							required
							// defaultValue={todo.title}
							value={todoTitle}
							onChange={handleTodoTitleChange}
							className={`${styles.input} ${!isValid ? styles.warning : ""}`}
							disabled={isFetching}
						/>
						<div className={styles.buttonsContainer}>
							<button
								type="button"
								onClick={handleCancel}
								className={`${styles.button} ${styles.cancel}`}
								disabled={isFetching}
							>
								<CancelIcon />
							</button>
							<button
								type="submit"
								className={`${styles.button} ${styles.save}`}
								disabled={isFetching}
							>
								<SaveIcon />
							</button>
						</div>
					</form>
					{!isValid && (
						<p className={styles.warning}>
							Текст задачи должен быть от 2 до 64 символов
						</p>
					)}
				</div>
			)}
		</>
	);
};

export default TodoItem;
