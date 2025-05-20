import React, { useEffect, useState } from "react";
import { get, post } from "../services/endpoints"; // Assuming you have a `post` function too
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Blog = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [blog, setBlog] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await get(`/public/blog/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await post("/comment/comment", {
        blogId: id,
        userId: user?._id,
        comment,
      });

      setComment(""); // Clear input
      fetchBlog(); // Refresh comments
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto text-white mt-12 mb-12 px-4">
      <div className="w-full">
        <h1 className="font-bold text-white mb-6 text-4xl md:text-5xl">
          {blog.title}
        </h1>
        <img
          src={blog.image}
          alt=""
          className="rounded-lg mb-6 w-full object-cover max-h-[500px]"
        />

        <p className="mb-5">{blog.description}</p>
        <hr />

        <h3 className="mt-12 mb-6 text-2xl font-semibold text-white">
          Leave a Comment
        </h3>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-white font-medium mb-2"
            >
              Comment
            </label>
            <textarea
              id="comment"
              rows="4"
              placeholder="Write your comment here"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          >
            Submit Comment
          </button>
        </form>
        <hr />

        <h3 className="mt-12 mb-6 text-2xl font-semibold text-white">
          Comments
        </h3>

        {blog.comments?.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-700 p-4 rounded-lg mb-4 flex items-start"
          >
            <img
              src={
                comment.userId?.profilePicture ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt="User"
              className="rounded-full w-12 h-12 object-cover mr-4"
            />
            <div>
              <h5 className="text-lg font-semibold text-white mb-1">
                {comment.userId?.fullName}
              </h5>
              <p className="text-white mb-0">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
