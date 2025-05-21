// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserServices from "../../services/UserServices";
// import RegisterForm from "../../components/RegisterForm/RegisterForm";
// import FinancialDashboard from "../../components/FinancialDashboard/FinancialDashboard";
// import StaffDashboard from "../../components/staffDashboard/staffDashboard";
// import EditUserForm from "../../components/EditUserForm/EditUserForm";

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
//       } else if (user.role === "admin" || user.role === "manager") {
//         setUsers(fetchedUsers);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch users.");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const toggleForm = () => {
//     setEditingUser(null); // Close edit form if open
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

//   if (!loggedInUser) {
//     return (
//       <div className="p-6 text-center text-gray-600">Loading dashboard...</div>
//     );
//   }

//   // Conditional dashboards
//   if (loggedInUser.role === "cashier") return <FinancialDashboard />;
//   if (loggedInUser.role === "staff") return <StaffDashboard />;

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

//       {showForm && !editingUser && (
//         <div className="mb-8">
//           <RegisterForm onUserRegistered={handleUserRegistered} />
//         </div>
//       )}

//       {editingUser && (
//         <div className="mb-8">
//           <EditUserForm
//             user={editingUser}
//             onUpdate={handleUserUpdated}
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
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import FinancialDashboard from "../../components/FinancialDashboard/FinancialDashboard";
import StaffDashboard from "../../components/staffDashboard/staffDashboard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      navigate("/login");
      return;
    }
    setLoggedInUser(user);

    UserServices.fetchUsers(token)
      .then((fetchedUsers) => {
        if (user.role === "superadmin") {
          setUsers(fetchedUsers.filter((u) => u.role === "admin"));
        } else if (user.role === "admin" || user.role === "manager") {
          setUsers(fetchedUsers);
        }
      })
      .catch(() => setError("Could not fetch users."));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const openRegister = () => {
    setEditingUser(null);
    setShowRegister(true);
  };
  const closeRegister = () => setShowRegister(false);
  const closeEdit = () => setEditingUser(null);

  const addUser = (newUser) => {
    if (loggedInUser.role === "superadmin" && newUser.role !== "admin") return;
    setUsers((prev) => [newUser, ...prev]);
    closeRegister();
  };

  const updateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    );
    closeEdit();
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this user?")) return;
    try {
      await UserServices.deleteUser(id, token);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Delete failed.");
    }
  };
  const downloadReport = (userId) => {
    const allTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    const user = users.find((u) => u.id === userId);

    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("management report", 14, 20);

    // User details
    doc.setFontSize(12);
    doc.text(`Name: ${user.name}`, 14, 35);
    doc.text(`Email: ${user.email}`, 14, 42);
    doc.text(`Role: ${user.role}`, 14, 49);

    const batch =
      user.batch || `BATCH-${Math.floor(10000 + Math.random() * 90000)}`;
    doc.text(`Batch: ${batch}`, 14, 56);

    // Time generator helper
    const generateRandomTime = (startHour, endHour) => {
      const hour =
        Math.floor(Math.random() * (endHour - startHour)) + startHour;
      const minute = Math.floor(Math.random() * 60);
      return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    };

    // Add transactions with In/Out Time
    if (allTransactions.length > 0) {
      autoTable(doc, {
        startY: 70,
        head: [["Transaction ID", "Name", "Amount", "In Time", "Out Time"]],
        body: allTransactions.map((t) => {
          const inTime = generateRandomTime(8, 11); // 8 AM - 10:59 AM
          const outTime = generateRandomTime(17, 21); // 5 PM - 8:59 PM
          return [t.id, t.name || "-", t.amount || "0", inTime, outTime];
        }),
      });
    } else {
      doc.setTextColor(150);
      doc.text("No transactions available.", 14, 70);
    }

    // Hotel Bio Section
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text("Hotel Details", 14, doc.lastAutoTable.finalY + 10);

    doc.setFontSize(11);
    doc.text(
      "welcome to our hotel chaush palace , this is finest Palace of aurangabad in very good cost",
      14,
      doc.lastAutoTable.finalY + 18
    );
    doc.text(
      "gourmet dining, spa retreats, and stunning skyline views. Whether you're here for business ",
      14,
      doc.lastAutoTable.finalY + 24
    );
    doc.text(
      "or leisure, experience unmatched comfort in the heart of the city.",
      14,
      doc.lastAutoTable.finalY + 30
    );

    doc.setFontSize(10);
    doc.text(
      "📍 Location: Nehru nagat kat kat gate Aurangabad",
      14,
      doc.lastAutoTable.finalY + 40
    );
    doc.text(
      "📞 Contact: +91-9561895574 | ✉️ Email: binmazimohammed90@gmail.com",
      14,
      doc.lastAutoTable.finalY + 46
    );
    doc.text(
      "🌐 Website: www.chaushPalace.com",
      14,
      doc.lastAutoTable.finalY + 52
    );

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      "© 2025 Mohammad Bin Mazi. All rights reserved.",
      14,
      pageHeight - 4
    );

    doc.save(`user_report_${userId}.pdf`);
  };

  if (!loggedInUser)
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 font-bold text-xl bg-black">
        Loading dashboard...
      </div>
    );

  if (loggedInUser.role === "cashier") return <FinancialDashboard />;
  if (loggedInUser.role === "staff") return <StaffDashboard />;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 font-sans">
      <header className="w-full max-w-4xl flex justify-between items-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-wider  select-none">
          DASHBOARD
        </h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-neonRed rounded-lg text-white font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {error && (
        <div className="mb-6 bg-red-700 px-6 py-3 rounded-md max-w-4xl w-full text-center font-semibold">
          {error}
        </div>
      )}

      <main className="max-w-4xl w-full">
        {users.length ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-gray-900 rounded-xl p-6 shadow-neon hover:shadow-neonHover cursor-default transition relative"
              >
                <h3 className="text-2xl font-bold ">{user.name}</h3>
                <p className="text-gray-400 mt-1">{user.email}</p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-neonPurple text-sm font-semibold capitalize">
                  {user.role}
                </span>

                <div className="absolute top-4 right-4 flex space-x-3">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="bg-neonYellow text-black px-3 py-1 rounded-md font-semibold hover:bg-yellow-400 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-neonRed px-3 py-1 rounded-md font-semibold hover:bg-red-600 transition text-black"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => downloadReport(user.id)}
                    className="bg-neonGreen px-3 py-1 rounded-md font-semibold hover:bg-green-600 transition text-black"
                  >
                    Reports
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-xl font-semibold">
            No users found.
          </p>
        )}
      </main>

      {/* Floating Register Button */}
      <button
        onClick={openRegister}
        className="fixed bottom-10 right-10 bg-neonGreen text-black font-bold rounded-full w-16 h-16 shadow-neon hover:shadow-neonHover flex items-center justify-center text-3xl"
        aria-label="Register new user"
        title="Register new user"
      >
        +
      </button>

      {/* Modal overlay */}
      {(showRegister || editingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 rounded-xl max-w-lg w-full p-8 relative shadow-neon shadow-neonHover">
            <button
              onClick={() => {
                if (showRegister) closeRegister();
                else closeEdit();
              }}
              className="absolute top-4 right-4 text-neonRed text-3xl font-bold hover:text-red-600"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-3xl font-extrabold mb-6 text-neonBlue">
              {showRegister ? "Register New User" : "Edit User"}
            </h2>

            {showRegister && (
              <RegisterForm
                onUserRegistered={addUser}
                onCancel={closeRegister}
              />
            )}
            {editingUser && (
              <EditUserForm
                user={editingUser}
                onUpdate={updateUser}
                onCancel={closeEdit}
              />
            )}
          </div>
        </div>
      )}

      <style>{`
        .text-neonBlue { color: #00e0ff; }
        .text-neonCyan { color: #00ffd9; }
        .bg-neonPurple { background-color: #7f00ff; }
        .bg-neonRed { background-color: #ff0044; }
        .bg-neonGreen { background-color: #00ff6a; }
        .bg-neonYellow { background-color: #ffff00; }
        .shadow-neon {
          box-shadow: 0 0 10px #00e0ff, 0 0 20px #00e0ff;
        }
        .shadow-neonHover {
          box-shadow: 0 0 20px #00ffd9, 0 0 40px #00ffd9;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
