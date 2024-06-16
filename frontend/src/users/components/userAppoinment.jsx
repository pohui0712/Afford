import React from "react";
import SideBar from "./userSidebar";
import { CircularProgressbar } from "react-circular-progressbar";
import mustang from "../assests/mustang.png";
import "react-circular-progressbar/dist/styles.css";

const Appointment = () => {
  return (
    <div className="flex flex-row bg-blue-900 h-[100vh] font-pt-sans relative">
      <SideBar />
      <div className="p-3 flex-1">
        <div className="bg-white rounded-2xl h-full flex flex-col justify-center items-center">
          <div className="text-2xl font-bold mb-8">Services In Progress</div>
          <div className="relative flex justify-center items-center">
            <img src={mustang} className="h-[35vh] absolute" />
            <div className="w-[70vh]">
              <CircularProgressbar value={60} maxValue={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
