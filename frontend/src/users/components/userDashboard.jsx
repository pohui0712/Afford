import React, { useState, useEffect } from "react";
import mustang from "../assests/mustang.png";
import explorer from "../assests/explorer.png";
import machE from "../assests/machE.png";
import territory from "../assests/territory.png";
import SideBar from "./userSidebar";
import { useParams } from "react-router";
import axios, { CanceledError } from "axios";

const Dashboard = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedCarImage, setSelectedCarImage] = useState(null);
  const [error, setError] = useState("");

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
        if (response.data.appService && response.data.appService.length > 0) {
          setAppointments(response.data.appService);
          setSelectedCar(response.data.appService[0]);
          setSelectedCarImage(
            getCarImage(response.data.appService[0].booking.carModel)
          );
          setServices(response.data.appService[0].service.serviceName);
        } else {
          setError("No appointments found");
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

  const handleSelectChange = (event) => {
    const selectedCarModel = event.target.value;

    const car = appointments.find(
      (app) => app.booking.carModel === selectedCarModel
    );
    if (car) {
      setSelectedCar(car);
      setSelectedCarImage(getCarImage(car.booking.carModel));
      setServices(car.service.serviceName);
    } else {
      console.log("Car not found");
    }
  };

  const getCarImage = (carModel) => {
    switch (carModel) {
      case "Mustang":
        return mustang;
      case "Explorer":
        return explorer;
      case "Territory":
        return territory;
      case "Mustang_Mach_E":
        return machE;
      default:
        return mustang;
    }
  };

  const getServiceReminders = (currentMileage) => {
    const reminders = [];
    const interval = 10000;
    const maxReminders = 3; // Only get the first three reminders
    let nextServiceMileage = Math.ceil(currentMileage / interval) * interval;

    while (reminders.length < maxReminders) {
      reminders.push(nextServiceMileage - currentMileage);
      nextServiceMileage += interval;
    }

    return reminders;
  };

  return (
    <div className="flex flex-row bg-blue-900 h-screen font-pt-sans">
      <SideBar />
      <div className="p-3 flex-1">
        <div className="rounded-2xl h-full flex flex-col w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
          <div className="flex justify-center">
            <img src={selectedCarImage} className="h-[300px] md:h-[400px]" />
          </div>

          {appointments.length > 1 && (
            <div className="flex justify-center">
              <div className="mr-2">Select Car:</div>
              <select
                id="car-select"
                value={selectedCar?.booking.carModel}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select a car
                </option>
                {appointments.map((appointment) => (
                  <option
                    key={appointment.booking._id}
                    value={appointment.booking.carModel}
                  >
                    {appointment.booking.carModel}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 flex-grow">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
              {selectedCar ? (
                <ul className="list-disc list-inside spacing-y-3">
                  <li className="mt-3">
                    <span>Car Model:</span>
                    <span className="font-semibold ml-2">
                      {selectedCar.booking.carModel}
                    </span>
                  </li>
                  <li className="mt-3">
                    <span>Car Plate:</span>
                    <span className="font-semibold ml-2">
                      {selectedCar.booking.carPlate}
                    </span>
                  </li>
                  <li className="mt-3">
                    <span>Mileage:</span>
                    <span className="font-semibold ml-2">
                      {selectedCar.booking.mileage} KM
                    </span>
                  </li>
                </ul>
              ) : (
                <p>No car information</p>
              )}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Upcoming Schedule</h3>
              {services.length > 0 ? (
                <ul className="list-disc list-inside">
                  {services.map((service, index) => (
                    <li className="mt-3" key={index}>
                      {service}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No services scheduled</p>
              )}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Service Reminder</h3>
              {selectedCar ? (
                <ul className="list-disc list-inside">
                  {getServiceReminders(selectedCar.booking.mileage).map(
                    (reminder, index) => (
                      <li className="mt-3" key={index}>
                        MileageToService: {reminder} KM
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>No mileage information</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
