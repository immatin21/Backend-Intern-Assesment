import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, login } = useAuth();

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.put("/users/me", { fullName, email });
      login(res.data.data, localStorage.getItem("token"));
      toast.success("Password updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put("/users/change-password", {
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password updated");
    } catch {
      toast.error("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] px-4 py-10 flex justify-center">
      <div className="absolute inset-0 flex justify-center items-start">
        <div className="w-125 h-125 bg-indigo-500/15 rounded-full blur-[140px] mt-20" />
      </div>

      <div className="relative w-full max-w-2xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">My Profile</h2>
          <p className="text-sm text-gray-400">Manage your account details</p>
        </div>

        <form
          onSubmit={updateProfile}
          className="bg-[#111827] border border-white/10 rounded-xl p-6 shadow-xl space-y-4"
        >
          <h3 className="text-lg font-medium text-white">
            Profile Information
          </h3>

          <div className="space-y-3">
            <input
              className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-md text-white
                       bg-linear-to-r from-indigo-500 to-purple-600
                       hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        <form
          onSubmit={changePassword}
          className="bg-[#111827] border border-white/10 rounded-xl p-6 shadow-xl space-y-4"
        >
          <h3 className="text-lg font-medium text-white">Change Password</h3>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-md text-white
                       bg-linear-to-r from-red-500 to-pink-600
                       hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
