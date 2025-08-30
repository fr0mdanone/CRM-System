import styles from "./FilterButtons.module.scss";

import { MouseEvent } from "react";
import { Filter, TodoInfo } from "../types/types";

interface FilterButtonsProps {
	onSetFilters: (filter: Filter) => void;
	todoInfo: TodoInfo | undefined;
	filter: Filter;
}

export default function FilterButtons({
	onSetFilters,
	todoInfo,
	filter,
}: FilterButtonsProps) {
	function isFilter(value: string): value is Filter {
		return value === "all" || value === "inWork" || value === "completed";
	}

	function onFilterButtonsClick(event: MouseEvent<HTMLButtonElement>) {
		if (!isFilter(event.currentTarget.id)) return;
		onSetFilters(event.currentTarget.id);
	}
	return (
		<ul className={styles.flexContainer}>
			<li>
				<button
					id="all"
					onClick={onFilterButtonsClick}
					className={`${styles.button} ${
						filter === "all" ? styles.active : ""
					}`}
				>
					{`Все (${todoInfo?.all ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					id="inWork"
					onClick={onFilterButtonsClick}
					className={`${styles.button} ${
						filter === "inWork" ? styles.active : ""
					}`}
				>
					{`В работе (${todoInfo?.inWork ?? "Загружается..."})`}
				</button>
			</li>
			<li>
				<button
					id="completed"
					onClick={onFilterButtonsClick}
					className={`${styles.button} ${
						filter === "completed" ? styles.active : ""
					}`}
				>
					{`Завершено (${todoInfo?.completed ?? "Загружается..."})`}
				</button>
			</li>
		</ul>
	);
}
