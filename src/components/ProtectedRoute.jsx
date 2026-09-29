import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning d-inline-block">
          <h4>Access Restricted</h4>
          <p className="mb-0">
            This section requires <strong>{requiredRole}</strong> authorization.
            Your current role is <strong>{user?.role}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
