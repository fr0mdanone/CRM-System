import styles from "./ErrorModal.module.scss";

interface ErrorModalProps {
	errorMessage: string;
	onErrorConfirm: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
	errorMessage,
	onErrorConfirm,
}: ErrorModalProps) => {
	return (
		<>
			<div onClick={() => onErrorConfirm()} className={styles.backdrop}>
				<div
					onClick={(event) => event.stopPropagation()}
					className={`${styles.container} ${styles.modal}`}
				>
					<h2 className={styles.errorTitle}>An error occured!</h2>
					<p className={styles.errorMessage}>{errorMessage}</p>
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
};

export default ErrorModal;
