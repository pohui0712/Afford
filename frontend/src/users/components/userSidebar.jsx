import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbLayoutDashboard, TbLogout2 } from "react-icons/tb";
import { Link, Navigate, useLocation } from "react-router-dom";
import logo from "../assests/mustangLogo.png";
import { useAuth } from "../components/authProvider";

const SidebarItem = ({ icon: Icon, to, label }) => {
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
    >
      <Icon className="mr-2" />
      <div>{label}</div>
    </Link>
  );
};

const SideBar = () => {
  const { logout, isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-4 w-1/6 text-white">
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
        <div className="flex items-center absolute bottom-8 hover:text-green-400">
          <TbLogout2 />
          <Link to="/" className="ml-2">
            <button onClick={logout}>Sign Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
