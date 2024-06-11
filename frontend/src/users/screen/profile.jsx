import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbLayoutDashboard, TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import mustang from "../assests/mustang.png";
import logo from "../assests/mustangLogo.png";
import { useAuth } from "../components/authProvider";

const SidebarItem = ({ icon: Icon, to, label }) => (
  <Link to={to} className="flex items-center hover:text-green-400">
    <Icon />
    <div className="ml-2">{label}</div>
  </Link>
);

const Profile = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-row bg-blue-900 h-screen font-pt-sans">
      <div className="p-4 w-1/6 text-white">
        <div className="text-2xl font-semibold text-bold italic p-6 mr-10 flex justify-center items-center">
          <img src={logo} className="w-[70px] h-[70px]" alt="logo" />
          AFFORD
        </div>
        <div className="space-y-10 mt-8 p-7 text-lg">
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
            label="Booking History"
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
            <img src={mustang} alt="mustang" className="h-[350px]" />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 p-6 gap-4 flex-grow">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
              <ul className="list-disc list-inside">
                <li>Make: Tesla</li>
                <li>Model: Model 3</li>
                <li>Year: 2019</li>
                <li>VIN: 5YJ3E1EA5KF123456</li>
                <li>License Plate: ABC1234</li>
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
              <h3 className="text-lg font-semibold mb-2">Service History</h3>
              <ul className="list-disc list-inside">
                <li>12/10/2020: Oil Change - $100</li>
                <li>15/10/2020: Car Wash - $20</li>
                <li>20/10/2020: Tire Replacement - $400</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
