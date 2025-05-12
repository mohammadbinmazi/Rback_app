import { useState, useEffect } from "react";
import UserServices from "../../services/UserServices";

const RegisterForm = ({ user, onUserRegistered, onUserUpdated, onCancel }) => {
  const isEditMode = Boolean(user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "", // optional: ask for password change
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (isEditMode) {
        const updatedUser = await UserServices.editUser(
          user.id,
          formData,
          token
        );
        onUserUpdated(updatedUser);
      } else {
        const newUser = await UserServices.registerUser(formData, token);
        onUserRegistered(newUser);
      }
    } catch (err) {
      alert("Failed to submit form.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit User" : "Register New User"}
      </h3>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full border px-3 py-2 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border px-3 py-2 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="w-full border px-3 py-2 rounded"
          value={formData.password}
          onChange={handleChange}
          required={!isEditMode} // optional in edit mode
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Role</label>
        <select
          name="role"
          className="w-full border px-3 py-2 rounded"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="cashier">Cashier</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {isEditMode ? "Update User" : "Register"}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
