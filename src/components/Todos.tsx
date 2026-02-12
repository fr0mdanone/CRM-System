import TodoItem from "./TodoItem";

import { Todo } from "../types/todos";
import { Flex } from "antd";

interface TodosProps {
	onError: (errorMessage: string) => void;
	onUpdateTodos: () => void;
	todos: Array<Todo>;
	setIsTyping: (value: boolean) => void;
}

const Todos: React.FC<TodosProps> = ({
	todos,
	onError,
	onUpdateTodos,
	setIsTyping,
}: TodosProps) => {
	return (
		<Flex vertical gap="small">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onError={onError}
					onUpdateTodos={onUpdateTodos}
					setIsTyping={setIsTyping}
				/>
			))}
		</Flex>
	);
};

export default Todos;
