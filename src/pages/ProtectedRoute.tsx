import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const ProtectedRoute: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
