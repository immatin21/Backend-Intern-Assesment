import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", {
        fullName,
        email,
        password,
      });
      navigate("/login");
      toast.success("Account Created Successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message || "Signup failed. Try again.";

      toast.error(message);
    }

    // After successful signup redirect to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-112.5 h-112.5 bg-purple-500/20 rounded-full blur-[130px]" />
      </div>

      <div className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-xl p-7 shadow-xl">
        <h2 className="text-2xl font-semibold text-white text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b0f19] border border-white/10 text-white rounded-md
               px-3 py-2 pr-10 text-sm
               focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2
               text-white/60 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-md text-sm font-medium text-white
                     bg-linear-to-r from-purple-500 to-indigo-600
                     hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
