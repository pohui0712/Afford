import React, { useState, useEffect } from "react";
import SideBar from "./userSidebar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router";
import axios, { CanceledError } from "axios";
import mustang from "../assests/mustang.png";

const Appointment = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URI}/appointmentService/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        }
      )
      .then((response) => {
        // console.log("API response:", response.data.appService[0].booking);
        const validAppointment = response.data.appService.filter(
          (app) =>
            app.booking.status !== "completed" &&
            app.booking.status !== "pending"
        );

        if (validAppointment && validAppointment.length > 0) {
          setAppointments(validAppointment);
          const defaultAppointment = validAppointment[0];
          setSelectedAppointment(defaultAppointment);
          setProgress(defaultAppointment.service.progress);
        } else {
          setError("Appointment not found");
          setAppointments([]);
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

  const handleSelectChange = (event) => {
    const selectedDateTime = event.target.value;
    const [selectedDate, selectedTime] = selectedDateTime.split(" - ");

    const appointment = appointments.find((app) => {
      return (
        app.booking.date === selectedDate && app.booking.time === selectedTime
      );
    });

    if (appointment) {
      setSelectedAppointment(appointment);
      setProgress(appointment.service.progress);
    } else {
      console.log("Appointment not found");
    }
  };

  return (
    <div className="flex flex-row bg-blue-900 h-[100vh] font-pt-sans relative">
      <SideBar />
      <div className="md:p-3 flex-1">
        <div className="rounded-2xl h-full flex flex-col justify-center items-center w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative md:w-auto">
          <div className="text-2xl font-bold mb-8">
            {selectedAppointment
              ? progress === 100
                ? "All set! Get your car now"
                : "Services in Progress"
              : "You have no any appointment yet. Book now!"}
          </div>
          <div className="mb-4">
            <div className="mr-2">Select Appointment:</div>
            <select
              id="appointment-select"
              key=""
              value={
                `${selectedAppointment?.booking.date} - ${selectedAppointment?.booking.time}` ||
                ""
              }
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select an appointment
              </option>
              {appointments.map((appointment) => (
                <option
                  key={appointment.booking.id}
                  value={`${appointment.booking.date} - ${appointment.booking.time}`}
                >
                  {appointment.booking.date} - {appointment.booking.time}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex justify-center items-center">
            <img src={mustang} className="h-[35vh] max-sm:h-[28vh] absolute" />
            <div className="w-[70vh] max-sm:w-[48vh]">
              <CircularProgressbar value={progress} maxValue={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
