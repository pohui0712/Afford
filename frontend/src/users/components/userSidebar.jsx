import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbLayoutDashboard, TbLogout2 } from "react-icons/tb";
import { Link, Navigate, useLocation } from "react-router-dom";
import logo from "../assests/mustangLogo.png";
import { useAuth } from "../components/authProvider";

const SidebarItem = ({ icon: Icon, to, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center text-left py-2 px-4 rounded-lg ${
        isActive
          ? "bg-blue-700 text-white"
          : "hover:bg-blue-600 hover:text-white"
      }`}
      onClick={onClick}
    >
      <Icon className="mr-2" />
      <div>{label}</div>
    </Link>
  );
};

const SideBar = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative">
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full p-4 bg-blue-800 text-white z-50">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-xl font-semibold italic"
          >
            <img src={logo} className="w-[40px] h-[40px]" alt="logo" />
            AFFORD
          </Link>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className={`mt-4 space-y-5 ${isMenuOpen ? "block" : "hidden"}`}>
          <SidebarItem
            icon={TbLayoutDashboard}
            label="Dashboard"
            to={`/user/dashboard/${user.id}`}
          />
          <SidebarItem
            icon={RiCalendarScheduleFill}
            label="Appointment"
            to={`/user/appointment/${user.id}`}
          />
          <SidebarItem
            icon={MdOutlineHistory}
            label="Book History"
            to={`/user/history/${user.id}`}
          />
          <SidebarItem
            icon={IoSettingsOutline}
            label="Settings"
            to={`/user/settings/${user.id}`}
          />
          <SidebarItem
            icon={TbLogout2}
            label="Sign Out"
            to="/"
            onClick={logout}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="max-md:hidden p-4 text-white mr-5">
        <Link
          to="/"
          className="text-2xl font-semibold text-bold italic mr-6 flex justify-center items-center"
        >
          <img src={logo} className="w-[70px] h-[70px]" alt="logo" />
          AFFORD
        </Link>
        <div className="space-y-10 mt-10 ml-5">
          <SidebarItem
            icon={TbLayoutDashboard}
            label="Dashboard"
            to={`/user/dashboard/${user.id}`}
          />
          <SidebarItem
            icon={RiCalendarScheduleFill}
            label="Appointment"
            to={`/user/appointment/${user.id}`}
          />
          <SidebarItem
            icon={MdOutlineHistory}
            label="Book History"
            to={`/user/history/${user.id}`}
          />
          <SidebarItem
            icon={IoSettingsOutline}
            label="Settings"
            to={`/user/settings/${user.id}`}
          />
          <div className="flex items-center absolute bottom-8 hover:text-green-400 ml-5">
            <TbLogout2 />
            <Link to="/" className="ml-2">
              <button onClick={logout}>Sign Out</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
