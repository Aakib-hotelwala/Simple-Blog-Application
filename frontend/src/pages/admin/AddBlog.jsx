import React, { useState } from "react";
import toast from "react-hot-toast";
import { post } from "../../services/endpoints";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await post("/blog/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.message || "Blog submitted successfully!");
      console.log(response);

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to submit blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-700 py-4 px-6">
          <h2 className="text-center text-gray-100 text-2xl font-semibold">
            Add New Blog
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Upload Image
              </label>
              <div className="flex items-center justify-between bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-200">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  required
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setPreview(null);
                    }
                  }}
                  className="w-full text-sm text-gray-200 bg-gray-700 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-gray-200 file:cursor-pointer"
                />
              </div>

              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-1">Image Preview:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-64 object-contain rounded border border-gray-600"
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="blogTitle"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="blogTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Blog Title"
                required
                className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="blogDescription"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Description
              </label>
              <textarea
                id="blogDescription"
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your Blog Description Here..."
                required
                className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-2 px-4 rounded-md transition duration-200 cursor-pointer ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Blog"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
