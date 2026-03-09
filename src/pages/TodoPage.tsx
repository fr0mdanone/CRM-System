import AddTodo from "../components/AddTodo";
import TodosList from "../components/TodosList";
import FilterButtons from "../components/FilterButtons";
import { Modal, Flex, Typography } from "antd";

import { useState, useEffect, useContext } from "react";
import { getTodos } from "../api/todos";
import { Todo, TodoInfo, TodoFilter, MetaResponse } from "../types/todos";
import NotficationContextProvider, {
	TodoNotificationContext,
} from "../store/todos/notification-context";

const TodoPage: React.FC = () => {
	const { openTodoNotification } = useContext(TodoNotificationContext);
	const [isTyping, setIsTyping] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [filter, setFilter] = useState<TodoFilter>("all");
	const [todoInfo, setTodoInfo] = useState<TodoInfo>({
		all: 0,
		completed: 0,
		inWork: 0,
	});

	function isEqual(obj1: Todo[], obj2: Todo[]): boolean {
		return JSON.stringify(obj1) === JSON.stringify(obj2);
	}

	async function fetchingTodos(): Promise<void> {
		try {
			const response: MetaResponse<Todo, TodoInfo> = await getTodos(filter);
			if (response.info) {
				if (isEqual(todos, response.data)) return;
				setTodos(response.data);
				setTodoInfo(response.info);
			}
		} catch (error) {
			if (error instanceof Error) {
				openTodoNotification("error", error.message);
			}
		}
	}

	useEffect(() => {
		fetchingTodos();
	}, [todos]);

	useEffect(() => {
		fetchingTodos();
	}, [filter]);

	useEffect(() => {
		if (isTyping) return;
		const interval = setInterval(() => {
			fetchingTodos();
		}, 5000);

		return () => clearInterval(interval);
	}, [filter, isTyping, todos]);

	return (
		<NotficationContextProvider>
			<Flex vertical align="center">
				<Flex vertical>
					<AddTodo onAddTodo={fetchingTodos} setIsTyping={setIsTyping} />
					<Flex vertical gap="small">
						<FilterButtons
							todoInfo={todoInfo}
							filter={filter}
							onSetFilter={setFilter}
						/>
						<TodosList
							todos={todos}
							onUpdateTodos={fetchingTodos}
							setIsTyping={setIsTyping}
						/>
					</Flex>
				</Flex>
			</Flex>
		</NotficationContextProvider>
	);
};

export default TodoPage;
