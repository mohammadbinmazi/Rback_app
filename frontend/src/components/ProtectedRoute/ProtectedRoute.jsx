import { Navigate } from "react-router-dom";

// Check if user is authenticated (using localStorage for now)
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // If not authenticated, redirect to login
  }

  return element; // If authenticated, render the element (Dashboard)
};

export default ProtectedRoute;
