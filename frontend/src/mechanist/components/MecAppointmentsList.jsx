import { Callout, Link, Table, Progress, Button } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";

const MecAppointmentsList = () => {
  const [appointments, SetAppointments] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/appointmentService/mechanist`, {
        signal: controller.signal,
      })
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
                  <Button color="red" size="1">
                    Complete
                  </Button>
                ) : (
                  <Progress
                    value={appointment.service.progress}
                    size="2"
                    mt="2"
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

export default MecAppointmentsList;
