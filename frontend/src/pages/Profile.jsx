import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/useAuth";

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
      const res = await api.put("/users/me", {
        fullName,
        email,
      });

      // update local user
      login(res.data.data, localStorage.getItem("token"));
      alert("Profile updated");
    } catch {
      alert("Profile update failed");
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
      alert("Password updated");
    } catch {
      alert("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>

      {/* Update User Profile */}
      <form onSubmit={updateProfile}>
        <h3>Profile Information</h3>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button disabled={loading}>Save</button>
      </form>

      <hr />

      {/* Change Password */}
      <form onSubmit={changePassword}>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button disabled={loading}>Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
