import { ChangeEvent, FormEvent, useState } from "react";
import { editTodo, deleteTodo } from "../api/todos";
import { Todo } from "../types/todos";
import { Flex, Form, Input, Button, Checkbox, Typography } from "antd";
import type { CheckboxChangeEvent } from "antd";
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

const TodoItem: React.FC<TodoItemProps> = ({
	todo,
	onUpdateTodos,
	onError,
	setIsTyping,
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [todoTitle, setTodoTitle] = useState<string>(todo.title);
	const [isFetching, setIsFetching] = useState<boolean>(false);

	function handleTodoTitleChange(event: ChangeEvent<HTMLInputElement>) {
		setIsTyping(true);
		const changedTitle = event.currentTarget.value;
		setTodoTitle(changedTitle);
	}

	const handleToggle = async (todo: Todo, e: CheckboxChangeEvent) => {
		const updatedTodo: Todo = { ...todo, isDone: e.target.checked };
		try {
			setIsFetching(true);
			await editTodo(updatedTodo);
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

	async function handleEditTodo() {
		setIsTyping(false);
		const editedTask = { ...todo, title: todoTitle.trim() };
		try {
			setIsFetching(true);
			await editTodo(editedTask);
			onUpdateTodos();
			setIsEditing(false);
		} catch (error: unknown) {
			if (error instanceof Error) {
				onError(error.message);
			}
		} finally {
			setTodoTitle(editedTask.title);
			setIsFetching(false);
		}
	}

	function handleCancel() {
		setIsTyping(false);
		setIsEditing(false);
		setTodoTitle(todo.title);
	}

	const onEditClick = (todo: Todo) => {
		setIsTyping(true);
		setIsEditing(true);
		form.setFieldsValue({ "todo-title": todo.title });
	};

	const [form] = Form.useForm();

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
							defaultChecked={todo.isDone}
							onChange={(e) => handleToggle(todo, e)}
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
						>
							<Input
								value={todoTitle}
								onChange={handleTodoTitleChange}
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
								<Button type="default" onClick={handleCancel} htmlType="reset">
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
