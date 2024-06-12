import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbLayoutDashboard, TbLogout2 } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";
import mustang from "../assests/mustang.png";
import logo from "../assests/mustangLogo.png";
import { useAuth } from "../components/authProvider";

const SidebarItem = ({ icon: Icon, to, label }) => (
  <Link to={to} className="flex items-center text-left hover:text-green-400">
    <Icon />
    <div className="ml-2">{label}</div>
  </Link>
);

const Profile = () => {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-row bg-blue-900 h-[100vh] font-pt-sans">
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
            to="/profile"
          />
          <SidebarItem
            icon={RiCalendarScheduleFill}
            label="Appointment"
            to="/user/appointment"
          />
          <SidebarItem
            icon={MdOutlineHistory}
            label="Book History"
            to="/user/history"
          />
          <SidebarItem
            icon={IoSettingsOutline}
            label="Settings"
            to="/user/settings"
          />
          <div className="flex items-center absolute bottom-8 hover:text-green-400">
            <TbLogout2 />
            <Link to="/" className="ml-2">
              <button onClick={logout}>Sign Out</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-3 flex-1">
        <div className="bg-white rounded-2xl h-full flex flex-col">
          <div className="flex justify-center">
            <img src={mustang} alt="mustang" className="h-[500px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
              <ul className="list-disc list-inside">
                <li>Car Model: Mustang</li>
                <li>Year: 2019</li>
                <li>Car Plate: SYP 630</li>
                <li>Current Mileage: 10000km</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                Maintenance Schedule
              </h3>
              <ul className="list-disc list-inside">
                <li>Oil Change: 01/01/2021</li>
                <li>Tire Rotation: 03/06/2021</li>
                <li>Brake Inspection: 05/12/2021</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Service Reminder</h3>
              <ul className="list-disc list-inside">
                <li>MileageToService: 10000km</li>
                <li>MileageToService: 20000km</li>
                <li>MileageToService: 30000km</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
