import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/forbidden" data-testid="navigate-to-forbidden" />;
  }
  return <div data-testid="protected-route-children">{children}</div>;
};

export default ProtectedRoute;
