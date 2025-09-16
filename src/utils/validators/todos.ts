import {
	TODO_TITLE_MAX,
	TODO_TITLE_MIN,
} from "../../constants/todos.constants";

export const validateTodoTitle = (todoTitle: string): boolean => {
	const todoLength = todoTitle.trim().length;
	return todoLength >= TODO_TITLE_MIN && todoLength <= TODO_TITLE_MAX;
};
