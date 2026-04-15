import AddTodo from "../components/AddTodo";
import TodosList from "../components/TodosList";
import FilterButtons from "../components/FilterButtons";
import { Flex } from "antd";

import { useEffect } from "react";
import { fetchTodosThunk } from "../store/todos/todos-actions";
import { useAppDispatch, useAppSelector } from "../store";

const TodoPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const isLocked = useAppSelector((state) => state.ui.isLocked);
	const filter = useAppSelector((state) => state.todos.currentFilter);

	useEffect(() => {
		dispatch(fetchTodosThunk());
	}, [dispatch, filter]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!isLocked) {
				dispatch(fetchTodosThunk());
			}
		}, 5000);
		return () => clearInterval(interval);
	}, [dispatch, filter, isLocked]);

	return (
		<Flex vertical align="center">
			<Flex vertical>
				<AddTodo />
				<Flex vertical gap="small">
					<FilterButtons />
					<TodosList />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default TodoPage;
