import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { del, get } from "../../services/endpoints";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (blogId) => {
    navigate(`/dashboard/edit-blog/${blogId}`);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await get("/dashboard/blogs");
        const data = response.data;
        setBlogs(data);
      } catch (error) {
        toast.error(error.message || "Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await del(`/blog/delete/${selectedBlogId}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== selectedBlogId));
      setShowModal(false);
      setSelectedBlogId(null);
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Error deleting blog. Please try again.");
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedBlogId(id);
    setShowModal(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 bg-gray-900 min-h-screen">
        <h1 className="text-center text-white mb-8 text-3xl">All Blogs</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#ffffff" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-800 shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-white">
                    {blog.title}
                  </h5>
                  <p className="text-gray-400 text-sm mt-2">
                    {blog.description}
                  </p>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-700 rounded-b-lg">
                  <button
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yellow-700 text-sm cursor-pointer"
                    onClick={() => handleEdit(blog._id)}
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 text-sm cursor-pointer"
                    onClick={() => confirmDelete(blog._id)}
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="relative z-10 bg-gray-900 text-white rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="mb-6">Do you really want to delete this Blog?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer flex items-center gap-2"
                  disabled={deleting}
                >
                  {deleting && <ClipLoader size={16} color="#fff" />}
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBlogs;
