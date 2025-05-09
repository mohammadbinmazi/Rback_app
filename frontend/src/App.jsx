import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<LoginPage />} />{" "}
        {/* Default landing page is login */}
        <Route path="/signup" element={<SignupPage />} /> {/* Signup page */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page */}
        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
