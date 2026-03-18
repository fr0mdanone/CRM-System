import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TodoPage from "./pages/TodoPage";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <TodoPage />,
			},
			{
				path: "/profile",
				element: <ProfilePage />,
			},
		],
	},
]);

const App: React.FC = () => {
	return <RouterProvider router={router} />;
};

export default App;
