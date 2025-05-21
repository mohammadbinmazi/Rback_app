// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../services/AuthServices";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { user, token } = await login(email, password);
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       console.log("Login response:", { user, token });
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100  w-140">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-10 space-y-6"
//       >
//         <h2 className="text-4xl font-bold text-center text-gray-800">Login</h2>

//         {error && (
//           <p className="text-center text-sm text-red-500 bg-red-100 p-2 rounded-md">
//             {error}
//           </p>
//         )}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="you@example.com"
//             className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="••••••••"
//             className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
//         >
//           Login
//         </button>
//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>© 2025 Binmazi. All rights reserved.</p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthServices"; // keep the service login

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the service login function exactly like first code
      const { user, token } = await login(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Login response:", { user, token });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-gray-900">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
