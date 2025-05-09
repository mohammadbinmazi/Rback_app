// services/userServices.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const fetchUsers = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.users; // Assuming the response contains a 'users' field
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error for the calling component to handle
  }
};

export default {
  fetchUsers,
};
