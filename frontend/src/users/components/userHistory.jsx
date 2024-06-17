import React, { useState, useEffect } from "react";
import SideBar from "./userSidebar";
import { Table } from "@radix-ui/themes";
import { useParams } from "react-router";
import axios, { CanceledError } from "axios";

const History = () => {
  const { id } = useParams();
  const [error, setError] = useState();
  // const [car, setCar] = useState("");
  // const [carPlate, setCarPlate] = useState("");
  // const [date, setDate] = useState("");
  // const [status, setStatus] = useState();
  // const [remark, setRemark] = useState("");
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
          // const userService = response.data.appService[0];
          // setCar(userService.booking.carModel);
          // setCarPlate(userService.booking.carPlate);
          // setDate(userService.booking.date);
          // setStatus(userService.booking.status);
          // setRemark(userService.booking.remark);

          const sortedServices = response.data.appService.sort(
            (a, b) => new Date(a.booking.date) - new Date(b.booking.date)
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
        <div className="bg-white rounded-2xl h-full p-4">
          {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-blue-100">
                  <TableCell>
                    <span className="font-bold italic">CarModel</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold italic">CarPlate</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold italic">Date</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold italic">Status</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold italic">Remarks</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>{service.booking.carModel}</TableCell>
                    <TableCell>{service.booking.carPlate}</TableCell>
                    <TableCell>{service.booking.date}</TableCell>
                    <TableCell>{service.booking.status}</TableCell>
                    <TableCell>{service.booking.remark}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
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
