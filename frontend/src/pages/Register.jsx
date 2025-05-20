import React from "react";
import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

const Register = () => {
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

        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Create your account
        </h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <label
              htmlFor="profileImage"
              className="cursor-pointer block w-full h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=60"
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-gray-700"
              />
              <div className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full border border-white shadow hover:bg-gray-700 transition">
                <FaCamera className="text-white text-sm" />
              </div>
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
