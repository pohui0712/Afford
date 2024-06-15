import React, { useState, useEffect } from "react";
import SideBar from "./userSidebar";
import axios, { CanceledError } from "axios";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const Settings = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const { id } = useParams();
  const [error, setError] = useState();
  const [user, setUser] = useState([]);

  const textGray = "block text-sm font-medium text-gray-700";
  const inputStyling =
    "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    console.log("User ID from Params:", id);

    axios
      .get(`http://localhost:5500/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      password,
      contact,
    };
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5500/users/profile/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(name);
      setPassword(password);
      setContact(contact);
      toast.success("Update successfully");
      setError("");
    } catch (error) {
      toast.error("Update unsuccessfully!");
      setError("An unexpected error occured.");
    }
  };

  return (
    <div className="flex flex-row bg-blue-900 h-screen font-pt-sans">
      <SideBar />
      <div className="p-3 flex-1">
        <div className="flex justify-center items-center bg-white rounded-2xl h-full">
          <div className="bg-blue-100 rounded-2xl p-8 w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-4">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">Upload Photo</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <label className="text-blue-600 cursor-pointer">
                Change Photo
              </label>
            </div>

            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className={textGray}>Username</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className={inputStyling}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className={textGray}>Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  disabled
                  className={`${inputStyling} text-black`}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className={textGray}>Password</label>
                <input
                  type="password"
                  defaultValue={user.password}
                  className={inputStyling}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className={textGray}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  className={inputStyling}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <label className={textGray}>Contact</label>
                <input
                  type="text"
                  defaultValue={user.contact}
                  className={inputStyling}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-blue-600 text-white p-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
