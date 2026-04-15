import TodoItem from "./TodoItem";

import { Flex } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const TodosList: React.FC = () => {
	const reduxTodos = useSelector((state: RootState) => state.todos.data);
	return (
		<Flex vertical gap="small">
			{reduxTodos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</Flex>
	);
};

export default TodosList;
