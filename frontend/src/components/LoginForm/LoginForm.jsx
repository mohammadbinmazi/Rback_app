import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthServices"; // Import login function from authService

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from authService
      const { user, token } = await login(email, password); // API call

      // Store the token in localStorage or sessionStorage
      localStorage.setItem("token", token);

      // Store user details in localStorage if needed
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message); // Display the error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error if any */}
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
