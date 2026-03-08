import TodoItem from "./TodoItem";

import { Todo } from "../types/todos";
import { Flex } from "antd";

interface Props {
	onUpdateTodos: () => void;
	todos: Array<Todo>;
	setIsTyping: (value: boolean) => void;
}

const TodosList: React.FC<Props> = ({ todos, onUpdateTodos, setIsTyping }) => {
	return (
		<Flex vertical gap="small">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onUpdateTodos={onUpdateTodos}
					setIsTyping={setIsTyping}
				/>
			))}
		</Flex>
	);
};

export default TodosList;
