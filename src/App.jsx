import AddUserTask from "./Components/AddUserTask";

import "./App.scss";

function App() {
	return (
		<>
			{/* {isEditing && <EditModal />}
			{error && <ErrorModal />} */}
			<AddUserTask />
			{/* <section>
				<FilterButtons />
				<Tasks />
			</section> */}
		</>
	);
}

export default App;
