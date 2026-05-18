import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const ProtectedRoute: React.FC = () => {
  const auth = useAppSelector((state) => state.user.isAuth);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
