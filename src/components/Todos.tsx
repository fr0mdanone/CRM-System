import TodoItem from "./TodoItem";

import { Todo } from "../types/todos";
import { Divider, Flex } from "antd";

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
		<Flex vertical gap="small">
			{todos.map((todo) => (
				<>
					<TodoItem
						key={todo.id}
						todo={todo}
						onError={onError}
						onUpdateTodos={onUpdateTodos}
					/>
				</>
			))}
		</Flex>
	);
};

export default Todos;
