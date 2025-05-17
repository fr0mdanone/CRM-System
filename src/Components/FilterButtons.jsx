import styles from "./FilterButtons.module.scss";

import Button from "../UI/Button";

export default function FilterButtons({ onClick, filter, info }) {
	return (
		<ul className={`${styles.flexContainer}`}>
			<li>
				<Button
					id="all"
					onClick={(event) => onClick(event.target.id)}
					isActive={filter === "all"}
				>
					{`Все (${info.all ?? "Загружается..."})`}
				</Button>
			</li>
			<li>
				<Button
					id="completed"
					onClick={(event) => onClick(event.target.id)}
					isActive={filter === "completed"}
				>
					{`Выполнено (${info.completed ?? "Загружается..."})`}
				</Button>
			</li>
			<li>
				<Button
					id="inWork"
					onClick={(event) => onClick(event.target.id)}
					isActive={filter === "inWork"}
				>
					{`В работе (${info.inWork ?? "Загружается..."})`}
				</Button>
			</li>
		</ul>
	);
}
