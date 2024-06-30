import { Callout, Code, Table } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";

const UserAppointment = ({ userId }) => {
  const [appointmentList, setAppointmentList] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URI}/appointmentService/user/${userId}`,
        {
          signal: controller.signal,
        }
      )
      .then((response) => {
        setAppointmentList(response.data.appService);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [userId]);

  if (!appointmentList) {
    return (
      <Callout.Root color="blue" className="mb-5">
        <Callout.Text>No appointment history</Callout.Text>
      </Callout.Root>
    );
  }
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Car Plate</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Car Model</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Appointment Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Service</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appointmentList.map((list) => (
            <Table.Row key={list._id}>
              <Table.Cell>{list.booking.carPlate}</Table.Cell>
              <Table.Cell>{list.booking.carModel}</Table.Cell>
              <Table.Cell>{list.booking.date}</Table.Cell>
              <Table.Cell>
                {list.service.serviceName.map((service, index) => (
                  <span key={index}>
                    <Code color="sky">{service}</Code>
                    {index < list.service.serviceName.length - 1 && ",\u00A0"}
                  </span>
                ))}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default UserAppointment;
