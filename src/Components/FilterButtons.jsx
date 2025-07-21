export default function FilterButtons({ onSetFilters, todoInfo, filter }) {
	return (
		<ul>
			<li>
				<button
					id="all"
					onClick={(event) => onSetFilters(event.target.id)}
					isActive={filter === "all"}
				>
					{`Все (${todoInfo.all ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					id="inWork"
					onClick={(event) => onSetFilters(event.target.id)}
					isActive={filter === "inWork"}
				>
					{`В работе (${todoInfo.inWork ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					id="completed"
					onClick={(event) => onSetFilters(event.target.id)}
					isActive={filter === "completed"}
				>
					{`Завершено (${todoInfo.completed ?? "Загружается..."})`}
				</button>
			</li>
		</ul>
	);
}
