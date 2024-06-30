import { Callout, Link, Table } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import SkeletonTable from "./SkeletonTable";

const AppointmentComplete = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/appointmentService/completed`, {
        signal: controller.signal,
      })
      .then((response) => {
        setAppointments(response.data.appService);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false); // Set loading to false in case of error
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <SkeletonTable />;
  }

  if (appointments.length === 0) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>No completed lists found</Callout.Text>
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
            <Table.ColumnHeaderCell>Client Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Appointment Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Car Plate</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Car Model</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appointments.map((appointment) => (
            <Table.Row key={appointment._id}>
              <Table.Cell>
                <Link
                  href={`/admin/completedMaintenance/details/${appointment._id}`}
                  underline="always"
                >
                  {appointment.booking.user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <AppointmentStatusBadge status={appointment.booking.status} />
              </Table.Cell>
              <Table.Cell>
                {appointment.booking.date} at {appointment.booking.time}
              </Table.Cell>
              <Table.Cell>{appointment.booking.carPlate}</Table.Cell>
              <Table.Cell>{appointment.booking.carModel}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default AppointmentComplete;
