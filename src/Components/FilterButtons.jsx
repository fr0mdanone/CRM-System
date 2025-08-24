import styles from "./FilterButtons.module.scss";

export default function FilterButtons({ onSetFilters, todoInfo, filter }) {
	return (
		<ul className={styles.flexContainer}>
			<li>
				<button
					id="all"
					onClick={(event) => onSetFilters(event.target.id)}
					className={`${styles.button} ${
						filter === "all" ? `${styles.active}` : ""
					}`}
				>
					{`Все (${todoInfo.all ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					id="inWork"
					onClick={(event) => onSetFilters(event.target.id)}
					className={`${styles.button} ${
						filter === "inWork" ? `${styles.active}` : ""
					}`}
				>
					{`В работе (${todoInfo.inWork ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					id="completed"
					onClick={(event) => onSetFilters(event.target.id)}
					className={`${styles.button} ${
						filter === "completed" ? `${styles.active}` : ""
					}`}
				>
					{`Завершено (${todoInfo.completed ?? "Загружается..."})`}
				</button>
			</li>
		</ul>
	);
}
