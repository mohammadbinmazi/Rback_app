import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserServices from "../../services/UserServices";
const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const fetchedUsers = await UserServices.fetchUsers(token); //
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <h2>Users List</h2>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email} ({user.role})
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
