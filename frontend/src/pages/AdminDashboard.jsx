import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

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
      toast.success("User status updated");
    } catch {
      toast.error("Failed to update user status");
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
    <div className="min-h-screen bg-[#0b0f19] px-6 py-10">
      <div className="absolute inset-0 flex justify-center">
        <div className="w-150 h-150 bg-indigo-500/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Admin Dashboard</h2>
          <p className="text-sm text-gray-400">
            Manage users and account status
          </p>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-xl shadow-xl overflow-hidden">
          {loading && (
            <p className="text-gray-400 text-sm p-4">Loading users...</p>
          )}

          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3 text-gray-300">{user.email}</td>
                  <td className="px-4 py-3 text-gray-300">{user.fullName}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-md text-xs bg-indigo-500/20 text-indigo-300">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        user.status === "active"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => updateStatus(user._id, user.status)}
                      className={`px-3 py-1 rounded-md text-xs font-medium
                      ${
                        user.status === "active"
                          ? "bg-red-600/80 hover:bg-red-600 text-white"
                          : "bg-green-600/80 hover:bg-green-600 text-white"
                      }`}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 text-sm rounded-md bg-white/5 text-gray-300
                       hover:bg-white/10 disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-sm text-gray-400">
              Page {page} of {pages}
            </span>

            <button
              disabled={page === pages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 text-sm rounded-md bg-white/5 text-gray-300
                       hover:bg-white/10 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
