import { Button, Flex, Form, Input } from "antd";

import { TODO_TITLE_MAX, TODO_TITLE_MIN } from "../constants/todos.constants";
import { useAppDispatch, useAppSelector } from "../store";
import { addTodoThunk } from "../store/todos/todos-actions";
import { setIsLocked } from "../store/ui/ui-slice";

type AddTodoFormValues = {
	title: string;
};

const AddTodo: React.FC = () => {
	const dispatch = useAppDispatch();
	const isAdding = useAppSelector((state) => state.todos.isAdding);

	const [form] = Form.useForm<AddTodoFormValues>();

	const focusHanlder = () => {
		dispatch(setIsLocked(true));
	};

	const blurHandler = () => {
		dispatch(setIsLocked(false));
	};

	const handleAddTodo = (values: AddTodoFormValues) => {
		const title = values.title.trim();
		dispatch(addTodoThunk(title));
		form.resetFields();
	};

	return (
		<>
			<Form form={form} onFinish={handleAddTodo} disabled={isAdding}>
				<Flex
					align="center"
					justify="space-between"
					gap="large"
					style={{ width: "500px" }}
				>
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
						style={{ width: "70%" }}
					>
						<Input
							onFocus={focusHanlder}
							onBlur={blurHandler}
							placeholder="Task to be done..."
							variant="underlined"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							disabled={isAdding}
						>
							Добавить задачу
						</Button>
					</Form.Item>
				</Flex>
			</Form>
		</>
	);
};

export default AddTodo;
