import { useState } from "react";
import { Todo } from "../types/todos";
import { Flex, Form, Input, Button, Checkbox, Typography } from "antd";
import {
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { TODO_TITLE_MAX, TODO_TITLE_MIN } from "../constants/todos.constants";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteTodoThunk, updateTodoThunk } from "../store/todos/todos-actions";
import { setIsLocked } from "../store/ui/ui-slice";
import { setIsUpdating } from "../store/todos/todos-slice";

interface Props {
	todo: Todo;
}

type EditTodoFormValues = {
	title: string;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
	const dispatch = useAppDispatch();
	const isUpdating = useAppSelector((state) => state.todos.isUpdating);
	const isDeleting = useAppSelector((state) => state.todos.isDeleting);

	const [isToggling, setIsToggling] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [form] = Form.useForm();

	const checkboxToggleHandler = async () => {
		const updatedTodo = { ...todo, isDone: !todo.isDone };
		setIsToggling(true);
		await dispatch(updateTodoThunk(updatedTodo));
		setIsToggling(false);
	};

	const deleteTodoHandler = () => {
		dispatch(deleteTodoThunk(todo.id));
	};

	const updateTodoHandler = async (values: EditTodoFormValues) => {
		dispatch(setIsUpdating(true));
		const updatedTask = { ...todo, ...values };
		await dispatch(updateTodoThunk(updatedTask));
		dispatch(setIsUpdating(false));
		dispatch(setIsLocked(false));
		setIsEditing(false);
	};

	const onEdit = (): void => {
		setIsEditing(true);
		dispatch(setIsLocked(true));
	};

	const onCancel = () => {
		setIsEditing(false);
		form.resetFields();
		dispatch(setIsLocked(false));
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
							onChange={checkboxToggleHandler}
							disabled={isToggling}
						/>
						<Typography.Text
							delete={todo.isDone}
							type={todo.isDone ? "secondary" : undefined}
						>
							{todo.title}
						</Typography.Text>
					</Flex>
					<Flex justify="space-around" gap="small" style={{ minWidth: "25%" }}>
						<Button type="primary" onClick={onEdit}>
							<EditOutlined />
						</Button>
						<Button
							type="primary"
							danger
							onClick={deleteTodoHandler}
							disabled={isDeleting}
						>
							<DeleteOutlined />
						</Button>
					</Flex>
				</Flex>
			)}
			{isEditing && (
				<Form
					onFinish={updateTodoHandler}
					disabled={isUpdating}
					form={form}
					initialValues={{ title: todo.title }}
				>
					<Flex justify="space-between">
						<Form.Item
							name="title"
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
							<Input />
						</Form.Item>
						<Flex gap="small">
							<Form.Item>
								<Button type="primary" disabled={isUpdating} htmlType="submit">
									<SaveOutlined />
								</Button>
							</Form.Item>
							<Form.Item>
								<Button type="default" onClick={onCancel} htmlType="reset">
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
