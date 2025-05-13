import styles from "./Button.module.scss";

export default function Button({
	children,
	type = "button",
	isActive,
	...props
}) {
	return (
		<button
			type={type}
			{...props}
			className={`${styles.button} ${isActive ? styles.active : ""}`}
		>
			{children}
		</button>
	);
}
