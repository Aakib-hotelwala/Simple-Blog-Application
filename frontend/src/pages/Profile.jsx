import React, { useState } from "react";
import { FaCamera, FaLock, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user?.profilePicture || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-gray-900 p-8 rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Update Profile
      </h1>

      <form className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <label
              htmlFor="profileImage"
              className="cursor-pointer block w-full h-full"
            >
              {/* Profile Image */}
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-gray-700"
              />
              {/* Camera Icon */}
              <div className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full border border-white shadow hover:bg-gray-700 transition">
                <FaCamera className="text-white text-sm" />
              </div>
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Name Input */}
        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-md">
          <FaUser className="text-gray-300" />
          <input
            type="text"
            placeholder="Update Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder-gray-400"
          />
        </div>

        {/* Old Password */}
        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-md">
          <FaLock className="text-gray-300" />
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder-gray-400"
          />
        </div>

        {/* New Password */}
        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-md">
          <FaLock className="text-gray-300" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md text-white font-medium cursor-pointer"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
