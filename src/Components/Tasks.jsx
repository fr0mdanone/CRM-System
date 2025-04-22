export default function Tasks({ tasks, onDelete, onEdit }) {
	function handleEditButton(task) {
		onEdit(task);
	}
	function handleDeleteButton(id) {
		onDelete(id);
	}

	return (
		<>
			<ol>
				{tasks.map((task) => (
					<li key={task.id}>
						<input type="checkbox" />
						<p>{task.title}</p>
						<button onClick={() => handleEditButton(task)}>edit</button>
						<button onClick={() => handleDeleteButton(task.id)}>delete</button>
					</li>
				))}
			</ol>
		</>
	);
}
