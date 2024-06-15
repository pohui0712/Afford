import { Card, Flex, Heading, Link, Table, Text } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import AppointmentStatusBadge from "./AppointmentStatusBadge";

const LatestBooking = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/appointmentService`, {
        signal: controller.signal,
      })
      .then((response) => {
        setData(response.data.appService);
        // console.log(response.data.appService);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return (
    <Card>
      <Heading size="4" mb="3">
        Latest Appointments
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Client Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Car Model</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((d) => (
            <Table.Row key={d.booking._id}>
              <Table.Cell>
                {/* <Flex direction="row" align="start" gap="2">
                  <Link href={`/admin/booking/${d.booking._id}`}>
                    {d.booking.user.name}
                  </Link>
                  <AppointmentStatusBadge status={d.booking.status} />
                  <Text>{d.booking.carModel}</Text>
                </Flex> */}
                <Link href={`/admin/booking/${d._id}`} underline="always">
                  {d.booking.user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <AppointmentStatusBadge status={d.booking.status} />
              </Table.Cell>
              <Table.Cell>{d.booking.carModel}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestBooking;
