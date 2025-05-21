// components/EditUserForm.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { editUser, fetchUserById } from "../../services/UserServices";

const EditUserForm = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "cashier",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowedRoles, setAllowedRoles] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || !currentUser.role) return;

    switch (currentUser.role) {
      case "superadmin":
        setAllowedRoles(["admin", "manager", "cashier", "staff"]);
        break;
      case "admin":
        setAllowedRoles(["manager", "cashier", "staff"]);
        break;
      case "manager":
        setAllowedRoles(["cashier", "staff"]);
        break;
      default:
        setAllowedRoles([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication failed. Please login again.");
      return;
    }

    try {
      setLoading(true);
      const result = await editUser(user.id, formData, token); // ⬅️ calling your service here
      setSuccess("User updated successfully!");
      if (onUpdate) onUpdate(result.updatedUser || result); // depends on your API's response structure
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
  //     <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
  //       ✏️ Edit User
  //     </h2>

  //     {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
  //     {success && <p className="text-green-600 mb-2 text-sm">{success}</p>}

  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       <input
  //         type="text"
  //         name="name"
  //         placeholder="Full Name"
  //         value={formData.name}
  //         onChange={handleChange}
  //         className="w-full px-4 py-2 border rounded-lg"
  //       />

  //       <input
  //         type="email"
  //         name="email"
  //         placeholder="Email Address"
  //         value={formData.email}
  //         onChange={handleChange}
  //         className="w-full px-4 py-2 border rounded-lg"
  //       />

  //       <select
  //         name="role"
  //         value={formData.role}
  //         onChange={handleChange}
  //         className="w-full px-4 py-2 border rounded-lg"
  //       >
  //         {allowedRoles.map((role) => (
  //           <option key={role} value={role}>
  //             {role.charAt(0).toUpperCase() + role.slice(1)}
  //           </option>
  //         ))}
  //       </select>

  //       <div className="flex justify-between">
  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  //         >
  //           {loading ? "Updating..." : "Update User"}
  //         </button>

  //         <button
  //           type="button"
  //           onClick={onCancel}
  //           className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
  //         >
  //           Cancel
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
    <div className="max-w-md mx-auto mt-12 bg-gray-800/80 border border-gray-700 shadow-xl rounded-xl p-8 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        ✏️ Edit User
      </h2>

      {error && (
        <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 text-green-300 p-3 rounded-md mb-4 text-sm font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {allowedRoles.map((role) => (
              <option key={role} value={role} className="bg-gray-800">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="text-white px-4 py-2 rounded-md border border-gray-500 hover:bg-gray-700 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
