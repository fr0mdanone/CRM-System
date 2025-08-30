import TodoItem from "./TodoItem";

import { Todo } from "../types/types";

interface TodosProps {
	onError: (error: unknown) => void;
	onUpdateTodos: () => void;
	tasks: Array<Todo>;
}

export default function Todos({ tasks, onError, onUpdateTodos }: TodosProps) {
	return (
		<ol>
			{tasks.map((task) => (
				<TodoItem
					key={task.id}
					task={task}
					onError={onError}
					onAnyChanges={onUpdateTodos}
				/>
			))}
		</ol>
	);
}
