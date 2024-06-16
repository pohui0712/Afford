import React, { useState, useEffect } from "react";
import mustang from "../assests/mustang.png";
import SideBar from "./userSidebar";
import { useParams } from "react-router";
import axios, { CanceledError } from "axios";

const Dashboard = () => {
  const { id } = useParams();
  const [car, setCar] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [mileage, setMileage] = useState("");
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5500/appointmentService/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        console.log(response.data.appService);
        if (response.data.appService && response.data.appService.length > 0) {
          const userService = response.data.appService[0];
          setCar(userService.booking.carModel);
          setCarPlate(userService.booking.carPlate);
          setMileage(userService.booking.mileage);
          // setServices(
          //   response.data.appService.map((app) => app.service.serviceName)
          // );
          setServices(userService.service.serviceName);
        } else {
          setError("Service not found");
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

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
              <ul className="list-disc list-inside spacing-y-3">
                <li className="mt-3">
                  <span>Car Model:</span>
                  <span className="font-semibold ml-2">{car}</span>
                </li>
                <li className="mt-3">
                  <span>Car Plate:</span>
                  <span className="font-semibold ml-2">{carPlate}</span>
                </li>
                <li className="mt-3">
                  <span>Mileage:</span>
                  <span className="font-semibold ml-2">{mileage} KM</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Upcoming Schedule</h3>
              <ul className="list-disc list-inside">
                {services.map((service, index) => (
                  <li className="mt-3" key={index}>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Service Reminder</h3>
              <ul className="list-disc list-inside">
                <li className="mt-3">MileageToService: 10000 KM</li>
                <li className="mt-3">MileageToService: 20000 KM</li>
                <li className="mt-3">MileageToService: 30000 KM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
