// import { useState, useEffect } from "react";
// import axios from "axios";
// const RegisterForm = ({ onUserRegistered, userIdToEdit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "cashier",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [allowedRoles, setAllowedRoles] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user.role) {
//       setUserRole(null);
//       return;
//     }

//     setUserRole(user.role);

//     switch (user.role) {
//       case "superadmin":
//         setAllowedRoles(["admin", "manager", "cashier", "staff"]);
//         break;
//       case "admin":
//         setAllowedRoles(["manager", "cashier", "staff"]);
//         break;
//       case "manager":
//         setAllowedRoles(["cashier", "staff"]);
//         break;
//       default:
//         setAllowedRoles([]);
//     }
//   }, []);

//   // Fetch user data when in edit mode
//   useEffect(() => {
//     if (userIdToEdit) {
//       setIsEditMode(true); // Enable edit mode
//       fetchUserData(userIdToEdit); // Fetch the user data to edit
//     }
//   }, [userIdToEdit]);

//   // Fetch user data from API
//   const fetchUserData = async (userId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/users/${userId}`
//       );
//       const { name, email, role } = response.data;
//       setFormData({ name, email, password: "", confirmPassword: "", role }); // Pre-fill the form
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//       setError("Error fetching user data.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user.id || !allowedRoles.length) {
//       setError("You don't have permission to register a new user.");
//       return;
//     }

//     const { name, email, password, confirmPassword, role } = formData;

//     if (!name || !email || !password || !confirmPassword) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const requestData = {
//         name,
//         email,
//         password,
//         role,
//         parent_id: user.id,
//       };

//       if (isEditMode) {
//         // Use the editUser function for editing
//         const response = await editUser(userIdToEdit, requestData, user.token);
//         if (response) {
//           setFormData({
//             name: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//             role: allowedRoles[0],
//           });
//           if (onUserRegistered) {
//             onUserRegistered(response.user);
//           }
//         }
//       } else {
//         const response = await axios.post(
//           "http://localhost:5000/api/auth/register",
//           requestData,
//           {
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         const data = response.data;
//         if (response.status === 201) {
//           if (onUserRegistered) {
//             onUserRegistered(data.user);
//           }
//           setFormData({
//             name: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//             role: allowedRoles[0],
//           });
//         }
//       }
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!allowedRoles.length) {
//     return (
//       <div className="text-center text-gray-600 mt-10 text-lg font-semibold">
//         ⛔ You do not have permission to register users.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-xl p-8 border border-gray-100">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         👤 {isEditMode ? "Edit User" : "Register New User"}
//       </h2>

//       {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           value={formData.password}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//         />

//         <select
//           name="role"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           value={formData.role}
//           onChange={handleChange}
//         >
//           {allowedRoles.map((roleOption) => (
//             <option key={roleOption} value={roleOption}>
//               {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
//         >
//           {loading
//             ? isEditMode
//               ? "Editing..."
//               : "Registering..."
//             : isEditMode
//             ? "Save Changes"
//             : "Register User"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;
// RegisterForm.js
import { useState, useEffect } from "react";
import axios from "axios";
import UserServices from "../../services/UserServices"; // Ensure this import is correct

const RegisterForm = ({ onUserRegistered, userIdToEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "cashier",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [allowedRoles, setAllowedRoles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // Get user roles from localStorage on initial render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.role) {
      setUserRole(null);
      return;
    }

    setUserRole(user.role);

    switch (user.role) {
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

  // Fetch user data when in edit mode
  useEffect(() => {
    if (userIdToEdit) {
      setIsEditMode(true); // Enable edit mode
      fetchUserData(userIdToEdit); // Fetch the user data to edit
    }
  }, [userIdToEdit]);

  // Fetch user data from API
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      console.log("Fetched user data:", response.data); // Debug log
      const { name, email, role } = response.data;
      setFormData({ name, email, password: "", confirmPassword: "", role }); // Pre-fill the form
    } catch (err) {
      console.error("Error fetching user data:", err); // More detailed error log
      setError("Error fetching user data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id || !allowedRoles.length) {
      setError("You don't have permission to register a new user.");
      return;
    }

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const requestData = {
        name,
        email,
        password,
        role,
        parent_id: user.id,
      };

      if (isEditMode) {
        // Use the editUser function for editing
        const response = await UserServices.editUser(
          userIdToEdit,
          requestData,
          user.token
        ); // Fixed this call
        if (response) {
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: allowedRoles[0],
          });
          if (onUserRegistered) {
            onUserRegistered(response.user);
          }
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          requestData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = response.data;
        if (response.status === 201) {
          if (onUserRegistered) {
            onUserRegistered(data.user);
          }
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: allowedRoles[0],
          });
        }
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!allowedRoles.length) {
    return (
      <div className="text-center text-gray-600 mt-10 text-lg font-semibold">
        ⛔ You do not have permission to register users.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        👤 {isEditMode ? "Edit User" : "Register New User"}
      </h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.role}
          onChange={handleChange}
        >
          {allowedRoles.map((roleOption) => (
            <option key={roleOption} value={roleOption}>
              {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          {loading
            ? isEditMode
              ? "Editing..."
              : "Registering..."
            : isEditMode
            ? "Save Changes"
            : "Register User"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
