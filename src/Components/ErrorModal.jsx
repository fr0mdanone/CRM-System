export default function ErrorModal({ error, onErrorConfirm }) {
	return (
		<div className="backdrop" onClick={() => onErrorConfirm()}>
			<div
				className="modal-window"
				onClick={(event) => event.stopPropagation()}
			>
				<h2>An error occured!</h2>
				<p>{error.message}</p>
				<button onClick={() => onErrorConfirm()}>Ok</button>
			</div>
		</div>
	);
}
