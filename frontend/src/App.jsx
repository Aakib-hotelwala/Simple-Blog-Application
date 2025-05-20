import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AddBlog from "./pages/admin/AddBlog.jsx";
import User from "./pages/admin/User.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AllBlogs from "./pages/admin/AllBlogs.jsx";
import EditBlog from "./pages/admin/EditBlog.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="blog/:id" element={<Blog />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>

          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="users" element={<User />} />
            <Route path="all-blogs" element={<AllBlogs />} />
            <Route path="edit-blog/:id" element={<EditBlog />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
