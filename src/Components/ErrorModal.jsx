export default function ErrorModal({ errorObject, onErrorConfirm }) {
	return (
		<>
			<div onClick={() => onErrorConfirm()}>
				<div onClick={(event) => event.stopPropagation()}>
					<h2>An error occured!</h2>
					<p>{errorObject.message}</p>
					<button onClick={() => onErrorConfirm()}>Ok</button>
				</div>
			</div>
		</>
	);
}
