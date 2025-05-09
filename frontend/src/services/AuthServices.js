// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Your API base URL

// Login service: Send POST request to API for user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    // The API returns user data and a token
    const { user, token } = response.data;

    // Return the response (you can store the user and token if necessary)
    return { user, token };
  } catch (error) {
    // Handle error (you can customize this)
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("Login request failed");
  }
};

export const signupUser = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, formData);
    return res.data; // contains user and token
  } catch (err) {
    throw err.response?.data?.msg || "Signup failed";
  }
};
