import AddUserTodo from "../components/AddUserTodo";
import Todos from "../components/Todos";
import FilterButtons from "../components/FilterButtons";
import { Modal, Flex, Typography } from "antd";

import { useState, useEffect } from "react";
import { getTodos } from "../api/todos";
import { Todo, TodoInfo, TodoFilter, MetaResponse } from "../types/todos";

const TodoPage: React.FC = () => {
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
				setError(error.message);
			}
		}
	}

	function onOk() {
		setError("");
	}

	useEffect(() => {
		fetchingTodos();
	}, [filter, todos]);

	useEffect(() => {
		if (isTyping) return;
		const interval = setInterval(() => {
			fetchingTodos();
		}, 5000);

		return () => clearInterval(interval);
	}, [filter, isTyping, todos]);

	return (
		<>
			{error && (
				<Modal
					closable={{ "aria-label": "Custom Close Button" }}
					title="An error occured!"
					open={Boolean(error)}
					onOk={onOk}
					onCancel={onOk}
				>
					<Typography.Paragraph>{error}</Typography.Paragraph>
				</Modal>
			)}
			<Flex vertical align="center">
				<Flex vertical>
					<AddUserTodo
						onError={setError}
						onAddTodo={fetchingTodos}
						setIsTyping={setIsTyping}
					/>
					<Flex vertical gap="small">
						<FilterButtons
							todoInfo={todoInfo}
							filter={filter}
							onSetFilter={setFilter}
						/>
						<Todos
							todos={todos}
							onUpdateTodos={fetchingTodos}
							onError={setError}
							setIsTyping={setIsTyping}
						/>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default TodoPage;
