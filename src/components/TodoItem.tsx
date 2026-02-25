import { useState } from "react";
import { updateTodo, deleteTodo } from "../api/todos";
import { Todo } from "../types/todos";
import { Flex, Form, Input, Button, Checkbox, Typography } from "antd";
import {
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { TODO_TITLE_MAX, TODO_TITLE_MIN } from "../constants/todos.constants";

interface TodoItemProps {
	todo: Todo;
	onUpdateTodos: () => void;
	onError: (errorMessage: string) => void;
	setIsTyping: (value: boolean) => void;
}

type EditTodoFormValues = {
	todoTitle: string;
};

const TodoItem: React.FC<TodoItemProps> = ({
	todo,
	onUpdateTodos,
	onError,
	setIsTyping,
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [form] = Form.useForm();
	const [isFetching, setIsFetching] = useState<boolean>(false);

	const handleToggle = async (todo: Todo) => {
		const updatedTodo: Todo = { ...todo, isDone: !todo.isDone };
		try {
			setIsFetching(true);
			await updateTodo(updatedTodo);
			onUpdateTodos();
		} catch (error: unknown) {
			if (error instanceof Error) {
				onError(error.message);
			}
		} finally {
			setIsFetching(false);
		}
	};

	async function handleDeleteTodo(id: number) {
		try {
			setIsFetching(true);
			await deleteTodo(id);
			onUpdateTodos();
		} catch (error: unknown) {
			if (error instanceof Error) {
				onError(error.message);
			}
		} finally {
			setIsFetching(false);
		}
	}

	async function handleEditTodo(values: EditTodoFormValues) {
		onError("");
		setIsTyping(false);
		const updatedTask = { ...todo, title: values.todoTitle.trim() };
		try {
			setIsFetching(true);
			await updateTodo(updatedTask);
			onUpdateTodos();
			setIsEditing(false);
		} catch (error: unknown) {
			if (error instanceof Error) {
				onError(error.message);
			}
		} finally {
			setIsFetching(false);
		}
	}

	const onEditClick = (todo: Todo): void => {
		setIsTyping(true);
		setIsEditing(true);
		form.setFieldsValue({ todoTitle: todo.title });
	};

	const onCancelClick = () => {
		setIsEditing(false);
		form.resetFields();
	};

	return (
		<>
			{!isEditing && (
				<Flex
					justify="space-between"
					style={{
						backgroundColor: "#fff",
						padding: "10px",
						maxWidth: "500px",
					}}
				>
					<Flex gap="small" align="center">
						<Checkbox
							type="checkbox"
							checked={todo.isDone}
							onChange={() => handleToggle(todo)}
							disabled={isFetching}
						/>
						<Typography.Text
							delete={todo.isDone}
							type={todo.isDone ? "secondary" : undefined}
						>
							{todo.title}
						</Typography.Text>
					</Flex>
					<Flex justify="space-around" gap="small" style={{ minWidth: "25%" }}>
						<Button
							type="primary"
							onClick={() => onEditClick(todo)}
							disabled={isFetching}
						>
							<EditOutlined />
						</Button>
						<Button
							type="primary"
							danger
							onClick={() => handleDeleteTodo(todo.id)}
							disabled={isFetching}
						>
							<DeleteOutlined />
						</Button>
					</Flex>
				</Flex>
			)}
			{isEditing && (
				<Form onFinish={handleEditTodo} disabled={isFetching} form={form}>
					<Flex justify="space-between">
						<Form.Item
							name="todoTitle"
							initialValue={todo.title}
							rules={[
								{
									required: true,
									whitespace: true,
									message: "Введите текст задачи",
								},
								{
									transform: (value) =>
										typeof value === "string" ? value.trim() : value,
									min: TODO_TITLE_MIN,
									message: "Текст задачи должен состоять минимум из 2 символов",
								},
								{
									transform: (value) =>
										typeof value === "string" ? value.trim() : value,
									max: TODO_TITLE_MAX,
									message: "Текст задачи не должен превышать 64 символа",
								},
							]}
						>
							<Input
								onFocus={() => setIsTyping(true)}
								onBlur={() => setIsTyping(false)}
							/>
						</Form.Item>
						<Flex gap="small">
							<Form.Item>
								<Button type="primary" disabled={isFetching} htmlType="submit">
									<SaveOutlined />
								</Button>
							</Form.Item>
							<Form.Item>
								<Button type="default" onClick={onCancelClick} htmlType="reset">
									<CloseOutlined />
								</Button>
							</Form.Item>
						</Flex>
					</Flex>
				</Form>
			)}
		</>
	);
};

export default TodoItem;
