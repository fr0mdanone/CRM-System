export default function FilterButtons({ onSetFilters, todoInfo, filter }) {
	return (
		<ul className={styles.flexContainer}>
			<li>
				<button
					id="all"
					onClick={(event) => onSetFilters(event.target.id)}
					className={filter === "all" ? "active" : ""}
				>
					{`Все (${todoInfo.all ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					id="inWork"
					onClick={(event) => onSetFilters(event.target.id)}
					className={filter === "inWork" ? "active" : ""}
				>
					{`В работе (${todoInfo.inWork ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					id="completed"
					onClick={(event) => onSetFilters(event.target.id)}
					className={filter === "completed" ? "active" : ""}
				>
					{`Завершено (${todoInfo.completed ?? "Загружается..."})`}
				</button>
			</li>
		</ul>
	);
}
