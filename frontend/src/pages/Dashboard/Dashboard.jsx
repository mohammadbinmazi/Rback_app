// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserServices from "../../services/UserServices";
// import RegisterForm from "../../components/RegisterForm/RegisterForm";

// const DashboardPage = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);
//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!token || !user) {
//       navigate("/login");
//       return;
//     }

//     setLoggedInUser(user);

//     try {
//       const fetchedUsers = await UserServices.fetchUsers(token);
//       if (user.role === "superadmin") {
//         const onlyAdmins = fetchedUsers.filter((u) => u.role === "admin");
//         setUsers(onlyAdmins);
//       } else {
//         setUsers(fetchedUsers);
//       }
//     } catch (error) {
//       setError("Failed to fetch users.");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [navigate]);

//   const toggleForm = () => {
//     setEditingUser(null); // ensure edit form is not showing
//     setShowForm((prev) => !prev);
//   };

//   const handleUserRegistered = (newUser) => {
//     if (loggedInUser?.role === "superadmin" && newUser.role !== "admin") return;
//     setUsers((prev) => [newUser, ...prev]);
//     setShowForm(false);
//   };

//   const handleUserUpdated = (updatedUser) => {
//     setUsers((prev) =>
//       prev.map((user) =>
//         user.id === updatedUser.id ? { ...user, ...updatedUser } : user
//       )
//     );
//     setEditingUser(null);
//   };

//   const handleDeleteUser = async (id) => {
//     const token = localStorage.getItem("token");

//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await UserServices.deleteUser(id, token);
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//     } catch (err) {
//       alert("Error deleting user");
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="p-8 max-w-5xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-700">Users</h2>
//         <button
//           onClick={toggleForm}
//           className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//         >
//           {showForm ? "Close" : "Register New User"}
//           <span className="text-lg">{showForm ? "✖️" : "➕"}</span>
//         </button>
//       </div>

//       {showForm && (
//         <div className="mb-8">
//           <RegisterForm onUserRegistered={handleUserRegistered} />
//         </div>
//       )}

//       {editingUser && (
//         <div className="mb-8">
//           <RegisterForm
//             user={editingUser}
//             userIdToEdit={handleUserUpdated}
//             onCancel={() => setEditingUser(null)}
//           />
//         </div>
//       )}

//       <div className="grid gap-4">
//         {users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user.id}
//               className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {user.name}
//                 </h3>
//                 <p className="text-sm text-gray-500">{user.email}</p>
//                 <span className="text-sm text-indigo-600 font-medium capitalize">
//                   {user.role}
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setEditingUser(user)}
//                   className="px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteUser(user.id)}
//                   className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No users found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserServices from "../../services/UserServices";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import FinancialDashboard from "../../components/FinancialDashboard/FinancialDashboard";
import StaffDashboard from "../../components/staffDashboard/staffDashboard";

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");
      return;
    }

    setLoggedInUser(user);

    try {
      const fetchedUsers = await UserServices.fetchUsers(token);
      if (user.role === "superadmin") {
        const onlyAdmins = fetchedUsers.filter((u) => u.role === "admin");
        setUsers(onlyAdmins);
      } else if (user.role === "admin" || user.role === "manager") {
        setUsers(fetchedUsers);
      }
    } catch (error) {
      setError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  const toggleForm = () => {
    setEditingUser(null);
    setShowForm((prev) => !prev);
  };

  const handleUserRegistered = (newUser) => {
    if (loggedInUser?.role === "superadmin" && newUser.role !== "admin") return;
    setUsers((prev) => [newUser, ...prev]);
    setShowForm(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    setEditingUser(null);
  };

  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await UserServices.deleteUser(id, token);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      alert("Error deleting user");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!loggedInUser) return null;

  // Render based on role
  if (loggedInUser.role === "cashier") return <FinancialDashboard />;
  if (loggedInUser.role === "staff") return <StaffDashboard />;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Users</h2>
        <button
          onClick={toggleForm}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {showForm ? "Close" : "Register New User"}
          <span className="text-lg">{showForm ? "✖️" : "➕"}</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <RegisterForm onUserRegistered={handleUserRegistered} />
        </div>
      )}

      {editingUser && (
        <div className="mb-8">
          <RegisterForm
            user={editingUser}
            userIdToEdit={handleUserUpdated}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      )}

      <div className="grid gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="text-sm text-indigo-600 font-medium capitalize">
                  {user.role}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingUser(user)}
                  className="px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
