import {
	TODO_TITLE_MAX,
	TODO_TITLE_MIN,
} from "../../constants/todos.constants";

export const validateTodoTitle = (todoTitle: string): boolean => {
	const todoLength = todoTitle.trim().length;
	return todoLength >= TODO_TITLE_MIN && todoLength <= TODO_TITLE_MAX;
};

// export const validateAndHandleTodo = (
// 	taskTitle: string,
// 	event: FormEvent<HTMLFormElement>,
// 	fetchFunc: () => Promise<void>,
// 	setState: Dispatch<SetStateAction<boolean>>
// ): void => {
// 	event.preventDefault();
// 	if (validateTodoTitle(taskTitle)) {
// 		fetchFunc();
// 	} else {
// 		setState(false);
// 	}
// };
