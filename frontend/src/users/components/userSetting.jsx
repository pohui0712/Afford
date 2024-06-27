import React, { useState, useEffect } from "react";
import SideBar from "./userSidebar";
import axios, { CanceledError } from "axios";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const Settings = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const { id } = useParams();
  const [error, setError] = useState();
  const [user, setUser] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [initialUser, setInitialUser] = useState({});

  const textGray = "block text-sm font-medium text-gray-700";
  const inputStyling =
    "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5500/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        const userData = response.data.user;
        setUser(userData);
        setInitialUser(userData);
        setName(userData.name);
        setContact(userData.contact);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userData = {};
    if (name !== initialUser.name) userData.name = name;
    if (password) userData.password = password;
    if (contact !== initialUser.contact) userData.contact = contact;

    if (Object.keys(userData).length === 0) {
      toast.error("No changes made!");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5500/users/profile/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Update successfully");
      setError("");
      // update the userdata
      setInitialUser({ ...initialUser, ...userData });
    } catch (error) {
      setSubmitting(false);
      toast.error("Update unsuccessfully!");
      setError("An unexpected error occured.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-row bg-blue-900 h-screen font-pt-sans">
      <SideBar />
      <Toaster />
      <div className="p-3 flex-1">
        {/* <div className="flex justify-center items-center bg-white rounded-2xl h-full"> */}
        <div className="flex justify-center items-center rounded-2xl h-full p-4 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
          <div className="bg-blue-100 rounded-2xl p-8 w-full max-w-md">
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className={textGray}>Username</label>
                <input
                  type="text"
                  value={name}
                  className={inputStyling}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className={textGray}>Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className={`${inputStyling} text-black`}
                />
              </div>
              <div>
                <label className={textGray}>Password</label>
                <input
                  type="password"
                  value={password}
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
                  value={contact}
                  className={inputStyling}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-blue-600 text-white p-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
