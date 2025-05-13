import styles from "./FilterButtons.module.scss";

import Button from "../UI/Button";

export default function FilterButtons({ onClick, filter }) {
	return (
		<ul className={`${styles.flexContainer}`}>
			<li>
				<Button
					id="all"
					onClick={(event) => onClick(event.target.id)}
					isActive={filter === "all"}
				>
					Все
				</Button>
			</li>
			<li>
				<Button
					id="completed"
					onClick={(event) => onClick(event.target.id)}
					isActive={filter === "completed"}
				>
					Выполнено
				</Button>
			</li>
			<li>
				<Button
					id="inWork"
					onClick={(event) => onClick(event.target.id)}
					isActive={filter === "inWork"}
				>
					В работе
				</Button>
			</li>
		</ul>
	);
}
