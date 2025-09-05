import styles from "./FilterButtons.module.scss";

import { Filter, TodoInfo } from "../api/todos.types";

interface FilterButtonsProps {
	onSetFilter: (filter: Filter) => void;
	todoInfo: TodoInfo;
	filter: Filter;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
	onSetFilter,
	todoInfo,
	filter,
}: FilterButtonsProps) => {
	function isFilter(value: string): value is Filter {
		return value === "all" || value === "inWork" || value === "completed";
	}

	function onUpdatingFilter(filter: string) {
		if (!isFilter(filter)) return;
		onSetFilter(filter);
	}
	return (
		<ul className={styles.flexContainer}>
			<li>
				<button
					id="all"
					onClick={() => onUpdatingFilter("all")}
					className={`${styles.button} ${
						filter === "all" ? styles.active : ""
					}`}
				>
					{`Все (${todoInfo.all ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					onClick={() => onUpdatingFilter("inWork")}
					className={`${styles.button} ${
						filter === "inWork" ? styles.active : ""
					}`}
				>
					{`В работе (${todoInfo.inWork ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					onClick={() => onUpdatingFilter("completed")}
					className={`${styles.button} ${
						filter === "completed" ? styles.active : ""
					}`}
				>
					{`Завершено (${todoInfo.completed ?? "Загружается..."})`}
				</button>
			</li>
		</ul>
	);
};

export default FilterButtons;
