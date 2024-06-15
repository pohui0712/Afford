import React from "react";
import mustang from "../assests/mustang.png";
import SideBar from "./userSidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-row bg-blue-900 h-[100vh] font-pt-sans">
      <SideBar />
      <div className="p-3 flex-1">
        <div className="bg-white rounded-2xl h-full flex flex-col">
          <div className="flex justify-center">
            <img src={mustang} alt="mustang" className="h-[400px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 flex-grow">
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

export default Dashboard;
