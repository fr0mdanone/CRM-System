import styles from "./ErrorModal.module.scss";

export default function ErrorModal({ errorObject, onErrorConfirm }) {
	return (
		<>
			<div onClick={() => onErrorConfirm()} className="backdrop">
				<div
					onClick={(event) => event.stopPropagation()}
					className={`${styles.container} modal-window`}
				>
					<h2>An error occured!</h2>
					<p>{errorObject.message}</p>
					<button
						onClick={() => onErrorConfirm()}
						className={`${styles.button}`}
					>
						Ok
					</button>
				</div>
			</div>
		</>
	);
}
