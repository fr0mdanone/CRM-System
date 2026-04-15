import { AppDispatch, RootState } from "..";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../../api/todos";
import { Todo } from "../../types/todos";
import { setNotification } from "../ui/ui-slice";
import {
	setIsAdding,
	setIsDeleting,
	setIsFetching,
	setTodos,
	todoAdded,
	todoDeleted,
	todoUpdated,
} from "./todos-slice";

const errorHandler = (error: unknown, dispatch: AppDispatch) => {
	if (error instanceof Error) {
		dispatch(
			setNotification({
				status: "error",
				message: error.message,
			}),
		);
	}
};

export const fetchTodosThunk = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const filter = getState().todos.currentFilter;
		try {
			dispatch(setIsFetching(true));
			const todosData = await getTodos(filter);
			dispatch(setTodos(todosData));
		} catch (error) {
			errorHandler(error, dispatch);
		} finally {
			dispatch(setIsFetching(false));
		}
	};
};

export const addTodoThunk = (title: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(setIsAdding(true));
			const newTodo = {
				title,
				isDone: false,
			};
			const response = await addTodo(newTodo);
			dispatch(todoAdded(response));
		} catch (error) {
			errorHandler(error, dispatch);
		} finally {
			dispatch(setIsAdding(false));
		}
	};
};

export const updateTodoThunk = (todo: Todo) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await updateTodo(todo);
			dispatch(todoUpdated(response));
		} catch (error) {
			errorHandler(error, dispatch);
		}
	};
};

export const deleteTodoThunk = (id: number) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(setIsDeleting(true));
			await deleteTodo(id);
			dispatch(todoDeleted(id));
		} catch (error) {
			errorHandler(error, dispatch);
		} finally {
			dispatch(setIsDeleting(false));
		}
	};
};
