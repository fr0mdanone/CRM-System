import TodoItem from "./TodoItem";

export default function Tasks({ tasks, onError, onUpdateTodos }) {
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
