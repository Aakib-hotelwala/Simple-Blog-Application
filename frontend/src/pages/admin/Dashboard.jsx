import React, { useEffect, useState } from "react";
import { get } from "../../services/endpoints";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/dashboard");
        const data = response.data;
        setUsers(data.users);
        setBlogs(data.blogs);
        setComments(data.comments);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-white mb-4 text-2xl font-bold">Dashboard</h1>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
            <div className="bg-blue-600 text-white rounded shadow p-4">
              <h5 className="text-lg font-semibold mb-2">Total Users</h5>
              <p className="text-2xl">{users.length}</p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
            <div className="bg-yellow-600 text-white rounded shadow p-4">
              <h5 className="text-lg font-semibold mb-2">Total Blogs</h5>
              <p className="text-2xl">{blogs.length}</p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
            <div className="bg-red-600 text-white rounded shadow p-4">
              <h5 className="text-lg font-semibold mb-2">Total Comments</h5>
              <p className="text-2xl">{comments.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
