import { useState, useEffect } from "react";

export default function Tasks() {
	//сюда надо будет добавить пропс filter, который мы берем из FilterButtons.jsx, потому что запрос будет
	const [updatedTasks, setUpdatedTasks] = useState([]);

	return (
		<ol>
			<TodoItem />
		</ol>
	);
}
