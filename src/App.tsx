import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TodoPage from "./pages/TodoPage";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./pages/RootLayout";
import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "./store";
import { useEffect } from "react";
import { clearNotification } from "./store/ui/ui-slice";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <AuthPage />,
			},
			{
				path: "/signup",
				element: <SignupPage />,
			},
		],
	},
	{
		path: "/",
		element: <ProtectedRoute />,
		children: [
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
		],
	},
]);

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const [api, contextHolder] = notification.useNotification();

	const notificationData = useAppSelector((state) => state.ui.notification);

	useEffect(() => {
		if (notificationData) {
			const { status, message, title } = notificationData;

			api[status]({
				message: title,
				description: message,
				placement: "topRight",
			});
			dispatch(clearNotification());
		}
	}, [notificationData, api, dispatch]);
	return (
		<>
			{contextHolder}
			<RouterProvider router={router} />
		</>
	);
};

export default App;
