import styles from "./ErrorModal.module.scss";

export default function ErrorModal({ error, onErrorConfirm }) {
	return (
		<div className="backdrop" onClick={() => onErrorConfirm()}>
			<div
				className={`${styles.container} modal-window`}
				onClick={(event) => event.stopPropagation()}
			>
				<h2>An error occured!</h2>
				<p>{error.message}</p>
				<button className={`${styles.button}`} onClick={() => onErrorConfirm()}>
					Ok
				</button>
			</div>
		</div>
	);
}
