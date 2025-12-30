import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    toast.success("Logged Out!")
    logout();
  };

  return (
    <nav className="relative z-50 bg-[#0b0f19] border-b border-white/10 px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1
          className="text-lg font-semibold text-white cursor-pointer"
          onClick={() =>
            user?.role === "admin" ? navigate("/admin") : navigate("/profile")
          }
        >
          UserManager
        </h1>

        <div className="flex items-center gap-4">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              user?.role === "admin"
                ? "bg-indigo-500/20 text-indigo-300"
                : "bg-green-500/20 text-green-300"
            }`}
          >
            {user?.role}
          </span>

          <span className="text-sm text-gray-300">{user?.fullName}</span>

          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
