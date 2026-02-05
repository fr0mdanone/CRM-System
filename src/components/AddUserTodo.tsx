import { Button, Flex, Form, Input } from "antd";

import { AddTodoData } from "../types/todos";
import { addTodo } from "../api/todos";
import { useState, ChangeEvent } from "react";
import { TODO_TITLE_MAX, TODO_TITLE_MIN } from "../constants/todos.constants";

interface AddUserTodoProps {
	onError: (errorMessage: string) => void;
	onAddTodo: () => void;
	setIsTyping: (value: boolean) => void;
}

const AddUserTodo: React.FC<AddUserTodoProps> = ({
	onError,
	onAddTodo,
	setIsTyping,
}: AddUserTodoProps) => {
	const [todoTitle, setTodoTitle] = useState<string>("");
	const [isFetching, setIsFetching] = useState<boolean>(false);

	function handleNewTodoTitle(event: ChangeEvent<HTMLInputElement>): void {
		setIsTyping(true);
		const newTodoTitle = event.currentTarget.value;
		setTodoTitle(newTodoTitle);
	}

	async function handleAddTodo(): Promise<void> {
		try {
			setIsFetching(true);
			const userData: AddTodoData = {
				title: todoTitle.trim(),
				isDone: false,
			};
			await addTodo(userData);
			setTodoTitle("");
			onAddTodo();
		} catch (error: unknown) {
			if (error instanceof Error) {
				onError(error.message);
			}
		} finally {
			setIsFetching(false);
		}
	}

	return (
		<>
			<Form onFinish={handleAddTodo} disabled={isFetching}>
				<Flex
					align="center"
					justify="space-between"
					gap="large"
					style={{ width: "500px" }}
				>
					<Form.Item
						name="todo-title"
						rules={[
							{ required: true, message: "Введите текст задачи" },
							{
								min: TODO_TITLE_MIN,
								message: "Текст задачи должен состоять минимум из 2 символов",
							},
							{
								max: TODO_TITLE_MAX,
								message: "Текст задачи не должен превышать 64 символа",
							},
						]}
						style={{ width: "70%" }}
					>
						<Input
							onBlur={() => setIsTyping(false)}
							placeholder="Task to be done..."
							onChange={handleNewTodoTitle}
							value={todoTitle}
							variant="underlined"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							disabled={isFetching}
						>
							Добавить задачу
						</Button>
					</Form.Item>
				</Flex>
			</Form>
		</>
	);
};

export default AddUserTodo;
