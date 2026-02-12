import { Button, Flex, Form, Input } from "antd";

import { AddTodoData } from "../types/todos";
import { addTodo } from "../api/todos";
import { useState } from "react";
import { TODO_TITLE_MAX, TODO_TITLE_MIN } from "../constants/todos.constants";

interface AddUserTodoProps {
	onError: (errorMessage: string) => void;
	onAddTodo: () => void;
	setIsTyping: (value: boolean) => void;
}

type AddTodoFormValues = {
	todoTitle: string;
};

const AddUserTodo: React.FC<AddUserTodoProps> = ({
	onError,
	onAddTodo,
	setIsTyping,
}: AddUserTodoProps) => {
	const [form] = Form.useForm<AddTodoFormValues>();
	const [isFetching, setIsFetching] = useState<boolean>(false);

	async function handleAddTodo(values: AddTodoFormValues): Promise<void> {
		try {
			setIsFetching(true);
			onError("");

			const title = values.todoTitle.trim();
			const userData: AddTodoData = {
				title,
				isDone: false,
			};

			await addTodo(userData);
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
			<Form form={form} onFinish={handleAddTodo} disabled={isFetching}>
				<Flex
					align="center"
					justify="space-between"
					gap="large"
					style={{ width: "500px" }}
				>
					<Form.Item
						name="todoTitle"
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
							onFocus={() => setIsTyping(true)}
							onBlur={() => setIsTyping(false)}
							placeholder="Task to be done..."
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
