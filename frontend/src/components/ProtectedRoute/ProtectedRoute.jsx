import { Navigate } from "react-router-dom";

// Check if user is authenticated (using localStorage for now)
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
