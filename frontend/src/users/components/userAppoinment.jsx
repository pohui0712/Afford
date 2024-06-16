import React, { useState, useEffect } from "react";
import SideBar from "./userSidebar";
import { CircularProgressbar } from "react-circular-progressbar";
import { useParams } from "react-router";
import axios, { CanceledError } from "axios";
import mustang from "../assests/mustang.png";
import "react-circular-progressbar/dist/styles.css";

const Appointment = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5500/service/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        console.log(response.data.user.progress);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

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
