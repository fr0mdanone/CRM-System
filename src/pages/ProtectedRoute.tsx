import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import { Spin } from "antd";
import { Roles } from "../types/admin";

interface Props {
  allowedRoles?: Roles[];
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const { isAuth, isProfileLoading, profile } = useAppSelector(
    (state) => state.auth,
  );

  if (isProfileLoading) {
    return <Spin />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const hasRequiredRole = profile?.roles.some((userRole) =>
      allowedRoles.includes(userRole),
    );
    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
