// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { user, token } = response.data;

    return { user, token };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("Login request failed");
  }
};

export const signupUser = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, formData);
    return res.data;
  } catch (err) {
    throw err.response?.data?.msg || "Signup failed";
  }
};
