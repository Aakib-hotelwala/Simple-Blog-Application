import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { get, put } from "../../services/endpoints";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await get(`/public/blog/${id}`);
        const blog = response.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setPreview(blog.image);
      } catch (error) {
        toast.error("Failed to load blog for editing.");
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await put(`/blog/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog updated successfully!");
      navigate("/dashboard/all-blogs");
    } catch (error) {
      toast.error("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-700 py-4 px-6">
          <h2 className="text-center text-gray-100 text-2xl font-semibold">
            Edit Blog
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
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPreview(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full text-sm text-gray-200 bg-gray-700 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-gray-200 file:cursor-pointer"
              />
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
                required
                className="w-full bg-gray-700 text-gray-100 border border-gray-600 px-3 py-2 rounded-md"
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
                required
                className="w-full bg-gray-700 text-gray-100 border border-gray-600 px-3 py-2 rounded-md"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-2 px-4 rounded-md cursor-pointer ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Updating..." : "Update Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
