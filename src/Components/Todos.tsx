import TodoItem from "./TodoItem";

import { Todo } from "../api/todos.types";

interface TodosProps {
	onError: (errorMessage: string) => void;
	onUpdateTodos: () => void;
	todos: Array<Todo>;
}

const Todos: React.FC<TodosProps> = ({
	todos,
	onError,
	onUpdateTodos,
}: TodosProps) => {
	return (
		<ul>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onError={onError}
					onUpdateTodos={onUpdateTodos}
				/>
			))}
		</ul>
	);
};

export default Todos;
