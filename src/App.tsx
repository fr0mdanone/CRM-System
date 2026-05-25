import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TodoPage from "./pages/TodoPage";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./pages/RootLayout";
import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "./store";
import { useEffect } from "react";
import { clearNotification } from "./store/ui/ui-slice";
import AuthLayout from "./pages/AuthLayout/AuthLayout";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { silentRefreshThunk } from "./store/user/user-actions";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
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
            index: true,
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
  const hasRefreshToken = !!localStorage.getItem("refreshToken");

  const notificationData = useAppSelector((state) => state.ui.notification);

  useEffect(() => {
    if (hasRefreshToken) {
      dispatch(silentRefreshThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (notificationData) {
      const { status, description, title } = notificationData;

      api[status]({
        title,
        description,
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
