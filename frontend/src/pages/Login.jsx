import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/endpoints";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await post("/auth/login", { email, password }); // res is already response.data

      console.log("Login Response:", res);

      if (res.success) {
        navigate("/");
        dispatch(login(res.data));
        toast.success(res.message || "Login successful!", { duration: 1500 });
      } else {
        toast.error(res.message || "Login failed.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed.";
      toast.error(errorMessage);
      console.error("Error logging in:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 text-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <img src="/vite.svg" alt="logo" className="h-8 w-8 mr-2" />
          <Link
            to="/"
            className="text-xl font-semibold text-white hover:text-blue-400"
          >
            Blogify
          </Link>
        </div>
        <h2 className="text-xl font-bold text-white mb-4">
          Sign in to your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="xyz@email.com"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Don’t have an account yet?
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
