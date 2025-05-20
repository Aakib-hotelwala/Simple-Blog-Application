import React from "react";
import {
  FaTachometerAlt,
  FaPenNib,
  FaUsers,
  FaRegNewspaper,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen w-[250px] shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
          Admin Panel
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 text-base p-2 rounded-md hover:bg-gray-800 hover:text-gray-200 transition-all duration-200"
            >
              <FaTachometerAlt className="text-lg" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/add-blog"
              className="flex items-center gap-3 text-base p-2 rounded-md hover:bg-gray-800 hover:text-gray-200 transition-all duration-200"
            >
              <FaPenNib className="text-lg" />
              <span>Create Blog</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/users"
              className="flex items-center gap-3 text-base p-2 rounded-md hover:bg-gray-800 hover:text-gray-200 transition-all duration-200"
            >
              <FaUsers className="text-lg" />
              <span>All Users</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/all-blogs"
              className="flex items-center gap-3 text-base p-2 rounded-md hover:bg-gray-800 hover:text-gray-200 transition-all duration-200"
            >
              <FaRegNewspaper className="text-lg" />
              <span>All Blogs</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
