import { Callout, Link, Table } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import CompleteButton from "./CompleteButton";
import ProgressState from "./ProgressState";

const MecAppointmentsList = () => {
  const [appointments, SetAppointments] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URI}/appointmentService/mechanist`,
        {
          signal: controller.signal,
        }
      )
      .then((response) => {
        SetAppointments(response.data.appService);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [appointments]);
  if (!appointments) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>There are no any appointments</Callout.Text>
      </Callout.Root>
    );
  }
  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Car Plate</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Car Model</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Appointment Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Mileage</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Progress</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appointments.map((appointment) => (
            <Table.Row key={appointment._id}>
              <Table.Cell>
                <Link
                  underline="always"
                  href={`/mechanist/userAppointment/${appointment._id}`}
                  color="blue"
                >
                  {appointment.booking.carPlate}
                </Link>
              </Table.Cell>

              <Table.Cell>{appointment.booking.carModel}</Table.Cell>
              <Table.Cell>{appointment.booking.date}</Table.Cell>
              <Table.Cell>{appointment.booking.mileage}</Table.Cell>
              <Table.Cell>
                {appointment.service.progress === 100 ? (
                  <CompleteButton
                    id={appointment.booking._id}
                    serviceID={appointment.service._id}
                  />
                ) : (
                  <ProgressState progress={appointment.service.progress} />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default MecAppointmentsList;
