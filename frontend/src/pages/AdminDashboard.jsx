import { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/users?page=${pageNumber}`);
      setUsers(res.data.data.users);
      setPages(res.data.data.pagination.pages);
    } catch {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    if (!window.confirm(`Are you sure you want to ${newStatus} this user?`))
      return;

    try {
      await api.patch(`/users/${id}/status`, {
        status: newStatus,
      });
      fetchUsers(page);
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading users...</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  onClick={() =>
                    updateStatus(user._id, user.status)
                  }
                >
                  {user.status === "active"
                    ? "Deactivate"
                    : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "16px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
