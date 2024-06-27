import React, { useState, useEffect } from "react";
import SideBar from "./userSidebar";
import { Table } from "@radix-ui/themes";
import { useParams } from "react-router";
import axios, { CanceledError } from "axios";

const History = () => {
  const { id } = useParams();
  const [error, setError] = useState();
  const [services, setServices] = useState([]);

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
        {/* <div className="bg-white rounded-2xl h-full p-4"> */}
        <div className="rounded-2xl h-full p-4 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Car Model</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Car Plate</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
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
                  <Table.Cell>{service.booking.remark}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
};

export default History;
