import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      login(res.data.data.user, res.data.data.token);

      res.data.data.user.role === "user"
        ? toast.success("User Logged in Successfully")
        : toast.success("Admin Logged in Successfully");

      res.data.data.user.role === "admin"
        ? navigate("/admin")
        : navigate("/profile");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 403
          ? "Your account is deactivated"
          : "Login failed");

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-105 h-105 bg-indigo-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-xl p-7 shadow-xl">
        <h2 className="text-2xl font-semibold text-white text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md
               px-3 py-2 pr-10 text-sm
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2
               text-white/60 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full mt-2 py-2 rounded-md text-sm font-medium text-white
                     bg-linear-to-r from-indigo-500 to-purple-600
                     hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-6">
          New here?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
