import styles from "./FilterButtons.module.scss";

import { TodoFilter, TodoInfo } from "../api/todos.types";

interface FilterButtonsProps {
	onSetFilter: (filter: TodoFilter) => void;
	todoInfo: TodoInfo;
	filter: TodoFilter;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
	onSetFilter,
	todoInfo,
	filter,
}: FilterButtonsProps) => {
	function isFilter(value: string): value is TodoFilter {
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
					{`Все (${todoInfo.all})`}
				</button>
			</li>
			<li>
				<button
					onClick={() => onUpdatingFilter("inWork")}
					className={`${styles.button} ${
						filter === "inWork" ? styles.active : ""
					}`}
				>
					{`В работе (${todoInfo.inWork})`}
				</button>
			</li>
			<li>
				<button
					onClick={() => onUpdatingFilter("completed")}
					className={`${styles.button} ${
						filter === "completed" ? styles.active : ""
					}`}
				>
					{`Завершено (${todoInfo.completed})`}
				</button>
			</li>
		</ul>
	);
};

export default FilterButtons;
