import React, { useState, useEffect } from "react";
import SideBar from "./userSidebar";
import { Table } from "@radix-ui/themes";
import { useParams } from "react-router";
import axios, { CanceledError } from "axios";
import PopupCard from "./popupCard";

const History = () => {
  const { id } = useParams();
  const [error, setError] = useState();
  const [services, setServices] = useState([]);
  const buttonStyle =
    "bg-blue-400 px-2 font-pt-sans-bold italic text-md shadow-lg rounded-md";
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsPopupOpen(!isPopupOpen);
  };

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
        if (response.data.appService && response.data.appService.length > 0) {
          const sortedServices = response.data.appService.sort(
            (a, b) => new Date(b.booking.date) - new Date(a.booking.date)
          );
          setServices(sortedServices);
          // console.log(response.data.appService);
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

  const selectedService = services.find(
    (service) => service.booking._id === selectedBookingId
  );

  return (
    <div className="flex flex-row bg-blue-900 h-[100vh] font-pt-sans">
      <SideBar />
      <div className="p-3 flex-1">
        {/* <div className="bg-white rounded-2xl h-full p-4"> */}
        <div className="rounded-2xl h-full p-4 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Car Model</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Car Plate</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Feedback</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Remarks</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {services.map((service, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{service.booking.carModel}</Table.Cell>
                  <Table.Cell>{service.booking.carPlate}</Table.Cell>
                  <Table.Cell>{service.booking.date}</Table.Cell>
                  <Table.Cell>{service.booking.status}</Table.Cell>
                  <Table.Cell>
                    {service.booking.status == "completed" ? (
                      <button
                        className={`${buttonStyle} hover:bg-green-400`}
                        onClick={() => togglePopup(service.booking._id)}
                      >
                        Generate
                      </button>
                    ) : (
                      <button
                        className={`${buttonStyle} hover:bg-red-400`}
                        disabled
                      >
                        Generate
                      </button>
                    )}
                  </Table.Cell>
                  <Table.Cell>{service.booking.remark}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <PopupCard isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
            {selectedService && (
              <div className="p-4">
                <h3 className="text-2xl font-pt-sans-bold italic">
                  Basic Car Report
                </h3>
                <div>
                  <div className="mt-10">
                    <span className="font-bold mr-3">Feedback: </span>
                    {selectedService.service.remark}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mt-6 mb-3">
                    Car Parts Used:
                  </h4>
                  {!selectedService.inventory ? (
                    <div></div>
                  ) : (
                    <Table.Root variant="surface">
                      <Table.Header className="bg-blue-400">
                        <Table.Row>
                          <Table.ColumnHeaderCell>
                            Car Part
                          </Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>
                            Quantity
                          </Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {selectedService.inventory?.inventory.map(
                          (item, inventoryIndex) => (
                            <Table.Row key={inventoryIndex}>
                              <Table.Cell>{item.carPart}</Table.Cell>
                              <Table.Cell>{item.quantity}</Table.Cell>
                              <Table.Cell>{item.price}</Table.Cell>
                            </Table.Row>
                          )
                        )}
                      </Table.Body>
                    </Table.Root>
                  )}
                </div>
              </div>
            )}
          </PopupCard>
        </div>
      </div>
    </div>
  );
};

export default History;
