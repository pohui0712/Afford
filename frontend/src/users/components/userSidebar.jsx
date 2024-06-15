import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbLayoutDashboard, TbLogout2 } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";
import logo from "../assests/mustangLogo.png";
import { useAuth } from "../components/authProvider";

const SidebarItem = ({ icon: Icon, to, label }) => (
  <Link to={to} className="flex items-center text-left hover:text-green-400">
    <Icon />
    <div className="ml-2">{label}</div>
  </Link>
);

const SideBar = () => {
  const { logout, isAuthenticated, user } = useAuth();
  // const userId = "6666d46268c32f9104f1f3b7";

  // if (!isAuthenticated) {
  //   return <Navigate to="/" />;
  // }
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
