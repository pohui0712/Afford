import { Button, Callout, Link, Table } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import EmailButton from "./EmailButton";

const AdminBooking = () => {
  const [appointments, SetAppointments] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URI}/appointmentService/exCompleted`,
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
  }, []);

  if (!appointments) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>There are no any appointments</Callout.Text>
      </Callout.Root>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

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
            <Table.ColumnHeaderCell>Client Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Appointment Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Car Model</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>CreatedAt</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Send Email</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appointments.map((appointment) => (
            <Table.Row key={appointment._id}>
              <Table.Cell>
                <Link
                  href={`/admin/booking/${appointment._id}`}
                  underline="always"
                >
                  {appointment.booking.user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <AppointmentStatusBadge status={appointment.booking.status} />
              </Table.Cell>
              {/* <Table.Cell>{appointment.booking.status}</Table.Cell> */}
              <Table.Cell>
                {appointment.booking.date} at {appointment.booking.time}
              </Table.Cell>
              <Table.Cell>{appointment.booking.carModel}</Table.Cell>
              <Table.Cell>
                {formatDate(appointment.booking.createdTime)}
              </Table.Cell>
              <Table.Cell>
                {appointment.booking.status === "pending" ||
                appointment.booking.status === "in_progress" ? (
                  <Button size="1" disabled>
                    Disable...
                  </Button>
                ) : appointment.booking.status === "completed" ? (
                  <AppointmentStatusBadge status={appointment.booking.status} />
                ) : (
                  <EmailButton
                    status={appointment.booking.status}
                    data={appointment.booking}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default AdminBooking;
