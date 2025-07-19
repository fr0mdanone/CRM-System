import AddUserTask from "./Components/AddUserTask";
import Tasks from "./Components/Tasks";

import "./App.scss";

function App() {
	return (
		<>
			<AddUserTask />
			{
				/* <section>
				<FilterButtons />*/
				<Tasks />
				/* </section> */
			}
		</>
	);
}

export default App;
