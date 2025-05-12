import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const fetchUsers = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from API:", response.data);
    return response.data.users;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteUser = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`User with ID ${id} deleted`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting user with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export default {
  fetchUsers,
  deleteUser,
};
