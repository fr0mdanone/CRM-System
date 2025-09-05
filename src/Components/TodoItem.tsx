import styles from "./TodoItem.module.scss";

import { validateTodoTitle } from "../utils/validators/todos";
import { ChangeEvent, FormEvent, useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import SaveIcon from "../assets/SaveIcon";
import { editTodo, deleteTodo } from "../api/todos";
import { Todo } from "../api/todos.types";
import CancelIcon from "../assets/CancelIcon";

interface TodoItemProps {
	todo: Todo;
	onUpdateTodos: () => void;
	onError: (error: unknown) => void;
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

	function handleUserInput(event: ChangeEvent<HTMLInputElement>) {
		setTodoTitle(event.currentTarget.value);
		setIsValid(true);
	}

	async function handleToggle(todo: Todo) {
		const updatedTodo: Todo = { ...todo, isDone: !todo.isDone };
		try {
			setIsFetching(true);
			await editTodo(updatedTodo);
		} catch (error) {
			onError(error);
		} finally {
			onUpdateTodos();
			setIsFetching(false);
		}
	}

	async function handleDeleteTodo(id: number) {
		try {
			setIsFetching(true);
			await deleteTodo(id);
		} catch (error) {
			onError(error);
		} finally {
			onUpdateTodos();
			setIsFetching(false);
		}
	}

	async function handleEditTodo(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (validateTodoTitle(todoTitle)) {
			todo.title = todoTitle.trim();
			try {
				setIsFetching(true);
				await editTodo(todo);
			} catch (error) {
				onError(error);
			} finally {
				setIsEditing(false);
				setTodoTitle(todo.title);
				onUpdateTodos();
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
							onChange={handleUserInput}
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
