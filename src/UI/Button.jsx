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
			className={isActive ? "button active" : "button"}
		>
			{children}
		</button>
	);
}
