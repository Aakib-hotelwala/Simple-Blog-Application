import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/endpoints";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  const handleViewBlog = (id) => {
    navigate(`/blog/${id}`);
  };

  const getBlogs = async () => {
    try {
      const response = await get("/blog/get");
      const data = response.data;
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <Box className="max-w-7xl mx-auto px-4">
        <Box className="mb-10 text-center">
          <h2 className="font-bold text-4xl text-white">Recent Posts</h2>
        </Box>

        <Box className="flex flex-wrap -mx-4">
          {blogs.map((blog) => (
            <Box key={blog._id} className="w-full md:w-1/3 px-4 mb-8">
              <Box className="border-2 border-blue-500 bg-[#2b2b2b] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full object-cover h-64"
                />
                <Box className="p-4 bg-gray-800 text-white">
                  <h5 className="text-xl font-semibold">{blog.title}</h5>
                  <p className="mt-2 text-gray-300">{blog.description}</p>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 w-full mt-4 rounded cursor-pointer"
                    onClick={() => handleViewBlog(`${blog._id}`)}
                  >
                    Read In Detail
                  </button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default RecentBlogs;
