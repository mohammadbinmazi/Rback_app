// import { useState, useEffect } from "react";
// import axios from "axios";

// const RegisterForm = ({ onUserRegistered }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "cashier",
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [allowedRoles, setAllowedRoles] = useState([]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user.role) return;

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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");

//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = localStorage.getItem("token");

//     if (!user || !user.id || !allowedRoles.length) {
//       setError("You don't have permission to register a new user.");
//       return;
//     }

//     const { name, email, password, confirmPassword, role } = formData;

//     if (!name || !email || !password || !confirmPassword) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const requestData = {
//       name,
//       email,
//       password,
//       role,
//       parent_id: user.id,
//     };

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         requestData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSuccessMessage("User registered successfully!");
//       if (onUserRegistered) onUserRegistered(res.data.user);

//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: allowedRoles[0] || "cashier",
//       });
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Something went wrong.");
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
//         👤 Register New User
//       </h2>

//       {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//       {successMessage && (
//         <p className="text-green-600 text-sm mb-4">{successMessage}</p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
//           {loading ? "Registering..." : "Register User"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;
import { useState, useEffect } from "react";
import axios from "axios";

const RegisterForm = ({ onUserRegistered }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "cashier",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [allowedRoles, setAllowedRoles] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.role) return;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !user.id || !allowedRoles.length) {
      setError("You don't have permission to register a new user.");
      return;
    }

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const requestData = {
      name,
      email,
      password,
      role,
      parent_id: user.id,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("✅ User registered successfully!");
      if (onUserRegistered) onUserRegistered(res.data.user);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: allowedRoles[0] || "cashier",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!allowedRoles.length) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-semibold">
        ⛔ You do not have permission to register users.
      </div>
    );
  }

  return (
    <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-lg w-full max-w-3xl mx-auto mt-6 border border-slate-700">
      <h2 className="text-2xl font-semibold text-center mb-6">
        👤 Register New Team Member
      </h2>

      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
      )}
      {successMessage && (
        <p className="text-green-400 text-sm mb-4 text-center">
          {successMessage}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="col-span-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
          className="col-span-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          {loading ? "Registering..." : "Register User"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
