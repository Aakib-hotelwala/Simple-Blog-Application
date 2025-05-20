import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { get, del } from "../../services/endpoints";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/dashboard/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await del(`/dashboard/deleteUser/${selectedUserId}`);
      setUsers((prev) => prev.filter((user) => user._id !== selectedUserId));
      toast.success("User deleted successfully!");
      setShowModal(false);
      setSelectedUserId(null);
    } catch (error) {
      toast.error("Error deleting user. Please try again.");
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Users</h1>

      {/* Spinner while fetching users */}
      {loadingUsers ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader color="#ffffff" size={40} />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-gray-800 text-white text-left text-sm">
            <thead className="bg-gray-700 text-gray-300 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => confirmDelete(user._id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded text-sm cursor-pointer"
                    >
                      <FaTrashAlt />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="relative z-10 bg-gray-900 text-white rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">Do you really want to delete this user?</p>
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
  );
};

export default User;
